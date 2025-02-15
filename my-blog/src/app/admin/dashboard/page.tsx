// src/app/admin/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

interface DashboardData {
  posts: number
  users: number
  comments: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          router.push('/login')
          return
        }

        const [
          { count: postsCount },
          { count: usersCount },
          { count: commentsCount }
        ] = await Promise.all([
          supabase.from('posts').select('*', { count: 'exact' }),
          supabase.from('users').select('*', { count: 'exact' }),
          supabase.from('comments').select('*', { count: 'exact' })
        ])

        setData({
          posts: postsCount || 0,
          users: usersCount || 0,
          comments: commentsCount || 0
        })
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [router, supabase])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-emerald-500" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gray-800 rounded-lg">
          <h2 className="text-lg font-semibold">Total Posts</h2>
          <p className="text-3xl font-bold text-emerald-500">{data?.posts}</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-3xl font-bold text-emerald-500">{data?.users}</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg">
          <h2 className="text-lg font-semibold">Total Comments</h2>
          <p className="text-3xl font-bold text-emerald-500">{data?.comments}</p>
        </div>
      </div>
    </div>
  )
}
