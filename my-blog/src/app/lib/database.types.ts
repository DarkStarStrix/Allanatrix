export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          title: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          title: string
          content: string
        }
        Update: {
          title?: string
          content?: string
        }
      }
    }
  }
}
