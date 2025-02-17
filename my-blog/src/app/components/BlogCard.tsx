// src/app/components/BlogList.tsx
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

export default function BlogList({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Link
          href={`/posts/${post.id}`}
          key={post.id}
          className="group relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>
          <article className="h-full p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-cyan-500/50 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-400 transition-colors">
              {post.title}
            </h3>
            <p className="text-gray-400 mb-4 line-clamp-2">{post.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">
                {formatDistanceToNow(new Date(post.created_at), {
                  addSuffix: true,
                })}
              </span>
              <span className="text-cyan-400 group-hover:translate-x-2 transition-transform duration-300">
                Read More →
              </span>
            </div>
            {/* Cyberpunk decorative elements */}
            <div className="absolute top-0 left-0 w-1 h-8 bg-gradient-to-b from-cyan-400 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-8 h-1 bg-gradient-to-l from-purple-400 to-transparent"></div>
          </article>
        </Link>
      ))}
    </div>
  );
}
