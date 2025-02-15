// src/app/auth/callback/route.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { CookieOptions } from '@supabase/ssr'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
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
              // Ensure these properties are included
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

    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(new URL('/admin', request.url))
}
