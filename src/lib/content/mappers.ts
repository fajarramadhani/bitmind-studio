import type {
  Product,
  Project,
  ProjectGalleryItem,
} from "@/types"
import type {
  ProductMediaRow,
  ProductRow,
  ProjectMediaRow,
  ProjectRow,
} from "@/types/database"

const optional = <T>(value: T | null): T | undefined => value ?? undefined

export function mapProject(
  row: ProjectRow,
  media: ProjectGalleryItem[] = []
): Project {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    client: optional(row.client),
    category: row.category,
    year: row.year,
    shortDescription: row.short_description,
    description: optional(row.description),
    services: row.services,
    role: row.roles,
    technologies: row.technologies,
    thumbnail: optional(row.thumbnail_url),
    coverImage: optional(row.cover_image_url),
    featured: row.featured,
    liveUrl: optional(row.live_url),
    repositoryUrl: optional(row.repository_url),
    overview: optional(row.overview),
    challenge: optional(row.challenge),
    approach: optional(row.approach),
    solution: optional(row.solution),
    outcome: optional(row.outcome),
    nextProjectSlug: optional(row.next_project_slug),
    kind: row.project_kind,
    publishStatus: row.publish_status,
    sortOrder: row.sort_order,
    publishedAt: optional(row.published_at),
    updatedAt: row.updated_at,
    gallery: media.length ? media : undefined,
  }
}

export function mapProduct(
  row: ProductRow,
  media: ProjectGalleryItem[] = []
): Product {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    shortDescription: row.short_description,
    description: optional(row.description),
    status: row.availability_status,
    price: row.price ?? undefined,
    currency: row.currency,
    featured: row.featured,
    thumbnail: optional(row.thumbnail_url),
    coverImage: optional(row.cover_image_url),
    demoUrl: optional(row.demo_url),
    publishStatus: row.publish_status,
    sortOrder: row.sort_order,
    publishedAt: optional(row.published_at),
    updatedAt: row.updated_at,
    gallery: media.length ? media : undefined,
  }
}

export function mapProjectMedia(
  row: ProjectMediaRow,
  src: string
): ProjectGalleryItem {
  return {
    id: row.id,
    src,
    alt: row.alt_text,
    caption: optional(row.caption),
    aspect: optional(row.aspect_ratio),
    fit: row.object_fit,
    layout: row.layout,
    sortOrder: row.sort_order,
  }
}

export function mapProductMedia(
  row: ProductMediaRow,
  src: string
): ProjectGalleryItem {
  return {
    id: row.id,
    src,
    alt: row.alt_text,
    caption: optional(row.caption),
    aspect: optional(row.aspect_ratio),
    fit: row.object_fit,
    layout: row.layout,
    sortOrder: row.sort_order,
  }
}
