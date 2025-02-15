// src/app/page.tsx
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import BlogList from './components/BlogList'

export default async function Page() {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set(name, value, {
              ...options,
              path: options?.path ?? '/'
            })
          } catch (error) {
            // Handle error if needed
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set(name, '', {
              ...options,
              path: options?.path ?? '/',
              maxAge: 0
            })
          } catch (error) {
            // Handle error if needed
          }
        },
      },
    }
  )

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <BlogList posts={posts || []} />
    </main>
  )
}
