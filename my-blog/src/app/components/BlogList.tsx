// src/app/components/BlogList.tsx
import Link from 'next/link'
import type { Post } from '../types/post'

interface BlogListProps {
  posts: Post[]
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <article key={post.id} className="border-b pb-8">
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-2xl font-bold mb-4 hover:text-blue-600 dark:hover:text-blue-400">
              {post.title}
            </h2>
          </Link>
          <p className="text-gray-600 dark:text-gray-400">{post.excerpt}</p>
          <div className="mt-4 text-sm text-gray-500">
            {new Date(post.created_at).toLocaleDateString()}
          </div>
        </article>
      ))}
    </div>
  )
}
