import type { ProjectKind, PublishStatus } from "@/types"

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const projectKinds: ProjectKind[] = ["client", "internal", "concept"]
const publishStatuses: PublishStatus[] = ["draft", "published", "archived"]
const productStatuses = ["coming-soon", "available", "unavailable"] as const

const text = (form: FormData, key: string) =>
  String(form.get(key) ?? "").trim()
const nullable = (value: string) => value || null
const array = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)

function validUrl(value: string) {
  if (!value) return true
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

export function validateProjectForm(form: FormData) {
  const title = text(form, "title")
  const slug = text(form, "slug")
  const category = text(form, "category")
  const shortDescription = text(form, "short_description")
  const kind = text(form, "project_kind") as ProjectKind
  const status = text(form, "publish_status") as PublishStatus
  const year = Number(text(form, "year"))
  const sortOrder = Number(text(form, "sort_order") || 0)
  const client = text(form, "client")
  const liveUrl = text(form, "live_url")
  const repositoryUrl = text(form, "repository_url")

  if (!title || !slug || !category || !shortDescription) {
    throw new Error("Title, slug, category, and short description are required.")
  }
  if (!slugPattern.test(slug)) throw new Error("Slug must be URL-safe lowercase text.")
  if (!projectKinds.includes(kind)) throw new Error("Invalid project kind.")
  if (!publishStatuses.includes(status)) throw new Error("Invalid publish status.")
  if (kind === "client" && !client) throw new Error("Client projects require a client name.")
  if (!Number.isInteger(year) || year < 1900 || year > 2200) throw new Error("Invalid project year.")
  if (!Number.isInteger(sortOrder) || sortOrder < 0) throw new Error("Sort order must be zero or greater.")
  if (!validUrl(liveUrl) || !validUrl(repositoryUrl)) throw new Error("Project URLs must use HTTP or HTTPS.")

  return {
    title,
    slug,
    category,
    client: nullable(client),
    project_kind: kind,
    year,
    short_description: shortDescription,
    description: nullable(text(form, "description")),
    overview: nullable(text(form, "overview")),
    challenge: nullable(text(form, "challenge")),
    approach: nullable(text(form, "approach")),
    solution: nullable(text(form, "solution")),
    outcome: nullable(text(form, "outcome")),
    services: array(text(form, "services")),
    roles: array(text(form, "roles")),
    technologies: array(text(form, "technologies")),
    live_url: nullable(liveUrl),
    repository_url: nullable(repositoryUrl),
    featured: form.get("featured") === "on",
    publish_status: status,
    sort_order: sortOrder,
    published_at: status === "published" ? new Date().toISOString() : null,
  }
}

export function validateProductForm(form: FormData) {
  const title = text(form, "title")
  const slug = text(form, "slug")
  const category = text(form, "category")
  const shortDescription = text(form, "short_description")
  const availability = text(form, "availability_status")
  const status = text(form, "publish_status") as PublishStatus
  const sortOrder = Number(text(form, "sort_order") || 0)
  const rawPrice = text(form, "price")
  const price = rawPrice ? Number(rawPrice) : null
  const demoUrl = text(form, "demo_url")
  const purchaseUrl = text(form, "purchase_url")
  const currency = (text(form, "currency") || "IDR").toUpperCase()

  if (!title || !slug || !category || !shortDescription) {
    throw new Error("Title, slug, category, and short description are required.")
  }
  if (!slugPattern.test(slug)) throw new Error("Slug must be URL-safe lowercase text.")
  if (!productStatuses.includes(availability as (typeof productStatuses)[number])) throw new Error("Invalid availability status.")
  if (!publishStatuses.includes(status)) throw new Error("Invalid publish status.")
  if (price !== null && (!Number.isFinite(price) || price < 0)) throw new Error("Price must be zero or greater.")
  if (!Number.isInteger(sortOrder) || sortOrder < 0) throw new Error("Sort order must be zero or greater.")
  if (!validUrl(demoUrl) || !validUrl(purchaseUrl)) throw new Error("Product URLs must use HTTP or HTTPS.")
  if (!/^[A-Z]{3}$/.test(currency)) throw new Error("Currency must use a three-letter ISO code.")

  return {
    title,
    slug,
    category,
    short_description: shortDescription,
    description: nullable(text(form, "description")),
    availability_status: availability as "coming-soon" | "available" | "unavailable",
    publish_status: status,
    price,
    currency,
    demo_url: nullable(demoUrl),
    purchase_url: nullable(purchaseUrl),
    featured: form.get("featured") === "on",
    sort_order: sortOrder,
    published_at: status === "published" ? new Date().toISOString() : null,
  }
}
