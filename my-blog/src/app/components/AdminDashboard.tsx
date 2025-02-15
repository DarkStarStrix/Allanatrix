// src/app/components/AdminDashboard.tsx
'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Editor from './Editor'
import type { Post } from '../types/post'

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([])
  const [editing, setEditing] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewPost = () => {
    const newPost: Post = {
      id: '',
      title: '',
      content: '',
      excerpt: '',
      slug: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    setEditing(newPost)
  }

  const handleEdit = (post: Post) => {
    setEditing(post)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const { error } = await supabase.from('posts').delete().eq('id', id)
        if (error) throw error
        setPosts(posts.filter((post) => post.id !== id))
      } catch (error) {
        console.error('Error deleting post:', error)
      }
    }
  }

  const handleSave = async (updatedPost: Partial<Post>) => {
    try {
      if (editing?.id) {
        // Update existing post
        const { data, error } = await supabase
          .from('posts')
          .update({
            ...updatedPost,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editing.id)
          .select()

        if (error) throw error
        setPosts(posts.map((p) => (p.id === editing.id ? { ...p, ...data[0] } : p)))
      } else {
        // Create new post
        const { data, error } = await supabase
          .from('posts')
          .insert([
            {
              ...updatedPost,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ])
          .select()

        if (error) throw error
        setPosts([data[0], ...posts])
      }
      setEditing(null)
    } catch (error) {
      console.error('Error saving post:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Posts</h1>
        <button
          onClick={handleNewPost}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          New Post
        </button>
      </div>

      {editing ? (
        <Editor
          post={editing}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border p-4 rounded-lg flex justify-between items-start"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {post.excerpt}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
