// src/app/components/BlogCard.tsx
import Link from 'next/link'

interface Post {
  id: string
  title: string
  content: string
  created_at: string
}

interface BlogCardProps {
  post: Post
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.id}`}>
      <div className="rounded-lg border p-6 hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-4">
          {post.content.substring(0, 150)}...
        </p>
        <div className="text-sm text-gray-500">
          {new Date(post.created_at).toLocaleDateString()}
        </div>
      </div>
    </Link>
  )
}