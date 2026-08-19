export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

type Table<Row, Insert, Update> = {
  Row: Row
  Insert: Insert
  Update: Update
  Relationships: []
}

export type ProjectRow = {
  id: string
  slug: string
  title: string
  client: string | null
  category: string
  project_kind: "client" | "internal" | "concept"
  year: number
  short_description: string
  description: string | null
  overview: string | null
  challenge: string | null
  approach: string | null
  solution: string | null
  outcome: string | null
  services: string[]
  roles: string[]
  technologies: string[]
  thumbnail_url: string | null
  cover_image_url: string | null
  live_url: string | null
  repository_url: string | null
  next_project_slug: string | null
  featured: boolean
  publish_status: "draft" | "published" | "archived"
  sort_order: number
  published_at: string | null
  created_by: string | null
  updated_by: string | null
  created_at: string
  updated_at: string
}

export type ProductRow = {
  id: string
  slug: string
  title: string
  category: string
  short_description: string
  description: string | null
  availability_status: "coming-soon" | "available" | "unavailable"
  publish_status: "draft" | "published" | "archived"
  price: number | null
  currency: string
  thumbnail_url: string | null
  cover_image_url: string | null
  demo_url: string | null
  featured: boolean
  sort_order: number
  published_at: string | null
  created_by: string | null
  updated_by: string | null
  created_at: string
  updated_at: string
}

export type ProjectMediaRow = {
  id: string
  project_id: string
  storage_path: string
  public_url: string | null
  alt_text: string
  caption: string | null
  media_type: "image"
  layout: "full" | "half" | "mobile" | "cover"
  aspect_ratio: string | null
  object_fit: "cover" | "contain"
  sort_order: number
  created_at: string
}

export type ProductMediaRow = {
  id: string
  product_id: string
  storage_path: string
  public_url: string | null
  alt_text: string
  caption: string | null
  layout: "full" | "half" | "mobile" | "cover"
  aspect_ratio: string | null
  object_fit: "cover" | "contain"
  sort_order: number
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      profiles: Table<
        {
          id: string
          email: string | null
          display_name: string | null
          role: "admin"
          created_at: string
          updated_at: string
        },
        {
          id: string
          email?: string | null
          display_name?: string | null
          role?: "admin"
        },
        { email?: string | null; display_name?: string | null; role?: "admin" }
      >
      projects: Table<ProjectRow, Partial<ProjectRow> & Pick<ProjectRow, "slug" | "title" | "category" | "year" | "short_description">, Partial<ProjectRow>>
      project_media: Table<ProjectMediaRow, Partial<ProjectMediaRow> & Pick<ProjectMediaRow, "project_id" | "storage_path" | "public_url" | "alt_text">, Partial<ProjectMediaRow>>
      products: Table<ProductRow, Partial<ProductRow> & Pick<ProductRow, "slug" | "title" | "category" | "short_description">, Partial<ProductRow>>
      product_media: Table<ProductMediaRow, Partial<ProductMediaRow> & Pick<ProductMediaRow, "product_id" | "storage_path" | "public_url" | "alt_text">, Partial<ProductMediaRow>>
    }
    Views: Record<string, never>
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean }
    }
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
