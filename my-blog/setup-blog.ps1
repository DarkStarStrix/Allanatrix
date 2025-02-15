# Create main directory structure
$dirs = @(
    "src/app/admin/dashboard",
    "src/app/api/posts",
    "src/app/blog/[slug]",  # Changed from [id] to [slug]
    "src/components",
    "src/types",
    "src/utils",
    "public/images"
)

foreach ($dir in $dirs) {
    New-Item -ItemType Directory -Path $dir -Force
}

# Create blog post page
@"
'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { BlogPost } from '@/types'

export default function BlogPost({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function fetchPost() {
      const { data } = await supabase
        .from('posts')
        .select()
        .eq('slug', params.slug)
        .single()

      setPost(data)
      setLoading(false)
    }

    fetchPost()
  }, [params.slug, supabase])

  if (loading) return <div>Loading...</div>
  if (!post) return <div>Post not found</div>

  return (
    <article className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-emerald-500">{post.title}</h1>
      <div className="mt-4 text-gray-400">{post.summary}</div>
      <div className="mt-8 prose prose-invert" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
"@ | Out-File -FilePath "src/app/blog/[slug]/page.tsx" -Encoding utf8

# Update types with slug
@"
export interface BlogPost {
  id: string
  slug: string
  title: string
  summary: string
  content: string
  created_at: string
}

export interface User {
  id: string
  email: string
}
"@ | Out-File -FilePath "src/types/index.ts" -Encoding utf8

# Rest of your script remains the same...
# (Include all the other file creation code from your original script here)

# Update homepage to use slug
@"
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { BlogPost } from '@/types'

export default function HomePage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from('posts')
        .select('id, slug, title, summary, created_at')
        .order('created_at', { ascending: false })

      setPosts(data || [])
      setLoading(false)
    }

    fetchPosts()
  }, [supabase])

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-800 p-6 rounded-lg">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-xl font-semibold text-emerald-500 hover:text-emerald-400">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-400 mt-2">{post.summary}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
"@ | Out-File -FilePath "src/app/page.tsx" -Encoding utf8

Write-Host "Project structure created successfully! Remember to update your Supabase schema to include the slug field."