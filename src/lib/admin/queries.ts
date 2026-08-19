import "server-only"

import { createClient } from "@/lib/supabase/server"
import type {
  ProductMediaRow,
  ProductRow,
  ProjectMediaRow,
  ProjectRow,
} from "@/types/database"

export async function getAdminProjects() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("updated_at", { ascending: false })
  if (error) throw new Error("Unable to load projects.")
  return (data ?? []) as ProjectRow[]
}

export async function getAdminProjectById(id: string) {
  const supabase = await createClient()
  const [{ data: project, error }, { data: media, error: mediaError }] =
    await Promise.all([
      supabase.from("projects").select("*").eq("id", id).single(),
      supabase
        .from("project_media")
        .select("*")
        .eq("project_id", id)
        .order("sort_order"),
    ])
  if (error || mediaError) throw new Error("Unable to load project.")
  return { project: project as ProjectRow, media: (media ?? []) as ProjectMediaRow[] }
}

export async function getAdminProducts() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("updated_at", { ascending: false })
  if (error) throw new Error("Unable to load products.")
  return (data ?? []) as ProductRow[]
}

export async function getAdminProductById(id: string) {
  const supabase = await createClient()
  const [{ data: product, error }, { data: media, error: mediaError }] =
    await Promise.all([
      supabase.from("products").select("*").eq("id", id).single(),
      supabase
        .from("product_media")
        .select("*")
        .eq("product_id", id)
        .order("sort_order"),
    ])
  if (error || mediaError) throw new Error("Unable to load product.")
  return { product: product as ProductRow, media: (media ?? []) as ProductMediaRow[] }
}
