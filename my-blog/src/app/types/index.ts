export interface BlogPost {
  id: string
  slug: string
  title: string
  summary: string
  content: string
  created_at: string
}

export interface User {
  id: string
  email: string
}