// src/app/blog/page.tsx
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import BlogList from '../components/BlogList'
import type { CookieOptions } from '@supabase/ssr'

export default async function BlogPage() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set: (name: string, value: string, options: CookieOptions) => {
          cookieStore.set(name, value, {
            ...options,
            path: options.path ?? '/',
          })
        },
        remove: (name: string, options: CookieOptions) => {
          cookieStore.set(name, '', {
            ...options,
            path: options.path ?? '/',
            maxAge: 0,
          })
        },
      },
    }
  )

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <BlogList posts={posts || []} />
    </div>
  )
}
