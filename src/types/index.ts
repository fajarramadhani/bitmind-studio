export type ProjectGalleryItem = {
  id?: string
  src: string
  alt: string
  caption?: string
  aspect?: string
  fit?: "cover" | "contain"
  layout?: "full" | "half" | "mobile" | "cover"
  sortOrder?: number
}

export type PublishStatus = "draft" | "published" | "archived"
export type ProjectKind = "client" | "internal" | "concept"

export type Project = {
  id?: string
  slug: string
  title: string
  client?: string
  category: string
  year: number
  shortDescription: string
  description?: string
  services: string[]
  thumbnail?: string
  coverImage?: string
  featured?: boolean
  liveUrl?: string
  overview?: string
  challenge?: string
  approach?: string
  solution?: string
  outcome?: string
  role?: string[]
  technologies?: string[]
  gallery?: ProjectGalleryItem[]
  nextProjectSlug?: string
  kind?: ProjectKind
  publishStatus?: PublishStatus
  sortOrder?: number
  publishedAt?: string
  updatedAt?: string
  repositoryUrl?: string
}

export type Service = {
  slug: string
  title: string
  shortDescription: string
  description?: string
  idealFor?: string[]
  deliverables?: string[]
  featured?: boolean
}

export type ProductStatus = "available" | "coming-soon" | "unavailable"

export type Product = {
  id?: string
  slug: string
  title: string
  category: string
  shortDescription: string
  status: ProductStatus
  price?: number
  featured?: boolean
  thumbnail?: string
  description?: string
  coverImage?: string
  demoUrl?: string
  purchaseUrl?: string
  currency?: string
  publishStatus?: PublishStatus
  sortOrder?: number
  publishedAt?: string
  updatedAt?: string
  gallery?: ProjectGalleryItem[]
}

export type NavigationItem = {
  label: string
  href: string
}
