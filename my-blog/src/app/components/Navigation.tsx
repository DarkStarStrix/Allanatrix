'use client'

import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-emerald-500 font-bold text-xl">
          Technomancer Blog
        </Link>
        <div className="space-x-4">
          <Link href="/blog" className="text-gray-300 hover:text-emerald-500">
            Blog
          </Link>
          <Link href="/login" className="text-gray-300 hover:text-emerald-500">
            Login
          </Link>
        </div>
      </div>
    </nav>
  )
}