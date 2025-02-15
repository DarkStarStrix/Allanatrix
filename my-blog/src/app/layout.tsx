// src/app/layout.tsx
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import "./globals.css"
import Providers from './Providers'
import Navigation from './components/Navigation'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: "Technomancer Blog",
    template: "%s | Technomancer Blog"
  },
  description: "Technical insights and project documentation",
  keywords: ["technology", "programming", "blog", "development"],
  authors: [{ name: "Technomancer" }],
  creator: "Technomancer",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Technomancer Blog",
    description: "Technical insights and project documentation",
    siteName: "Technomancer Blog"
  },
  twitter: {
    card: "summary_large_image",
    title: "Technomancer Blog",
    description: "Technical insights and project documentation",
    creator: "@yourtwitterhandle"
  },
  robots: {
    index: true,
    follow: true
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body
        className={`
          min-h-screen
          bg-gray-900
          text-gray-100
          font-sans
          flex
          flex-col
        `}
        suppressHydrationWarning
      >
        <Providers>
          <Navigation />
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="border-t border-gray-800 mt-auto">
            <div className="container mx-auto px-4 py-6 text-sm text-gray-400">
              © {new Date().getFullYear()} Technomancer Blog. All rights reserved.
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
