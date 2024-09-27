// Server-side (Node.js with Express and MongoDB)

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const POSTS_FILE = path.join(__dirname, 'posts.json');
const ADMIN_PASSWORD_HASH = '$2b$10$yourhashhere'; // Replace with a real bcrypt hash

// Store connected clients
let clients = [];

// Middleware to check admin authentication
const adminAuth = async (req, res, next) => {
    const { password } = req.body;
    if (!password) {
        return res.status(401).json({ error: 'Password required' });
    }
    const match = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!match) {
        return res.status(401).json({ error: 'Invalid password' });
    }
    next();
};

// Helper function to read posts
async function readPosts() {
    try {
        const data = await fs.readFile(POSTS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Helper function to write posts
async function writePosts(posts) {
    await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));
}

// Function to send updates to all connected clients
function sendUpdateToAll() {
    clients.forEach(client => client.res.write(`data: ${JSON.stringify({ action: 'update' })}\n\n`));
}

// SSE endpoint
app.get('/api/sse', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    const clientId = Date.now();
    const newClient = {
        id: clientId,
        res
    };
    clients.push(newClient);

    req.on('close', () => {
        clients = clients.filter(client => client.id !== clientId);
    });
});

// Get all posts
app.get('/api/posts', async (req, res) => {
    const posts = await readPosts();
    res.json(posts);
});

// Add a new post (admin only)
app.post('/api/posts', adminAuth, async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }
    const posts = await readPosts();
    const newPost = {
        id: Date.now().toString(),
        title,
        content,
        date: new Date().toISOString().split('T')[0]
    };
    posts.unshift(newPost);
    await writePosts(posts);
    sendUpdateToAll();
    res.status(201).json(newPost);
});

// Edit a post (admin only)
app.put('/api/posts/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }
    let posts = await readPosts();
    const postIndex = posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
        return res.status(404).json({ error: 'Post not found' });
    }
    posts[postIndex] = { ...posts[postIndex], title, content };
    await writePosts(posts);
    sendUpdateToAll();
    res.json(posts[postIndex]);
});

// Delete a post (admin only)
app.delete('/api/posts/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    let posts = await readPosts();
    posts = posts.filter(post => post.id !== id);
    await writePosts(posts);
    sendUpdateToAll();
    res.json({ message: 'Post deleted successfully' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

