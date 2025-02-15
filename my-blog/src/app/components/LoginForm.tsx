// src/app/components/LoginForm.tsx
'use client'

import { useState } from 'react'
import { signInWithEmail } from '../utils/auth'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signInWithEmail(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border rounded dark:bg-gray-800"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2 border rounded dark:bg-gray-800"
      />
      <button
        type="submit"
        className="w-full p-2 bg-emerald-500 text-white rounded"
      >
        Sign In
      </button>
    </form>
  )
}