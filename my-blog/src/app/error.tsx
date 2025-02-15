// src/app/error.tsx
'use client'

export default function Error() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Unable to load blog posts. Please try again later.
      </p>
    </div>
  )
}
