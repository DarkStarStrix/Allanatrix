// src/app/components/Editor.tsx
'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import type { Post } from '../types/post'
import 'react-quill/dist/quill.snow.css'

// Define the ReactQuill props type
interface ReactQuillProps {
  theme: string
  value: string
  onChange: (value: string) => void
  modules: any
  className: string
}

// Properly type the dynamic import
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill')
    return function comp(props: ReactQuillProps) {
      return <RQ {...props} />
    }
  },
  { ssr: false }
)

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['link', 'blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
  ],
}

interface EditorProps {
  post: Post
  onSave: (post: Partial<Post>) => Promise<void>
  onCancel: () => void
}

export default function Editor({ post, onSave, onCancel }: EditorProps) {
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const [excerpt, setExcerpt] = useState(post.excerpt)
  const [slug, setSlug] = useState(post.slug)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const now = new Date().toISOString()
    await onSave({
      title,
      content,
      excerpt,
      slug,
      updated_at: now,
    })
  }

  const handleContentChange = (value: string) => {
    setContent(value)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium mb-1">
          Slug
        </label>
        <input
          type="text"
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium mb-1">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Content</label>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={handleContentChange}
          modules={modules}
          className="h-64 mb-12"
        />
      </div>

      <div className="flex justify-end space-x-4 pt-8">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  )
}
