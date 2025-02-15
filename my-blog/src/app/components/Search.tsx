// src/app/components/Search.tsx
'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

interface Post {
  id: string
  title: string
  content: string
  created_at: string
}

export default function Search({ onSearchResults }: { onSearchResults: (results: Post[]) => void }) {
  const [query, setQuery] = useState('')

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .ilike('title', `%${query}%`)

    if (error) {
      console.error('Error searching posts:', error)
      return
    }

    onSearchResults(data || [])
  }

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:border-gray-700"
        />
        <button
          type="submit"
          className="absolute right-2 top-2 px-4 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          Search
        </button>
      </div>
    </form>
  )
}
