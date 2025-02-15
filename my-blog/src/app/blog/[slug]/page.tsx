// src/app/blog/[slug]/page.tsx
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import type { CookieOptions } from '@supabase/ssr'

export default async function BlogPost({ params }: { params: { slug: string } }) {
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
            sameSite: options.sameSite ?? 'lax',
            secure: options.secure ?? process.env.NODE_ENV === 'production',
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

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="prose dark:prose-invert max-w-none">{post.content}</div>
    </article>
  )
}
