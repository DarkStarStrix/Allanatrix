// src/app/Providers.tsx
'use client'

import { createBrowserClient } from '@supabase/ssr'
import { createContext, useContext, useState } from 'react'
import type { SupabaseClient } from '@supabase/supabase-js'

// Create a typed context
const SupabaseContext = createContext<SupabaseClient | null>(null)

export default function Providers({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  )

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }
  return context
}
