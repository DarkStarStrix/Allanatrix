// src/app/components/SearchWrapper.tsx
'use client'

import { useState } from 'react'
import Search from './Search'
import BlogCard from './BlogCard'

interface Post {
  id: string
  title: string
  content: string
  created_at: string
}

export default function SearchWrapper() {
  const [searchResults, setSearchResults] = useState<Post[]>([])

  return (
    <div>
      <Search onSearchResults={setSearchResults} />
      <div className="grid gap-6 md:grid-cols-2">
        {searchResults.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
