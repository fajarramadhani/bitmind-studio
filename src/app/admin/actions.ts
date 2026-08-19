"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { requireAdmin } from "@/lib/auth/admin"
import { createClient } from "@/lib/supabase/server"
import {
  validateProductForm,
  validateProjectForm,
} from "@/lib/admin/validation"

const allowedTypes = ["image/png", "image/jpeg", "image/webp", "image/avif"]
const maxFileSize = 8 * 1024 * 1024

function revalidateContent(oldSlug?: string, newSlug?: string, type?: "project" | "product") {
  revalidatePath("/")
  revalidatePath("/work")
  revalidatePath("/products")
  revalidatePath("/sitemap.xml")
  if (type === "project") {
    if (oldSlug) revalidatePath(`/work/${oldSlug}`)
    if (newSlug) revalidatePath(`/work/${newSlug}`)
  }
  if (type === "product") {
    if (oldSlug) revalidatePath(`/products/${oldSlug}`)
    if (newSlug) revalidatePath(`/products/${newSlug}`)
  }
}

export async function loginAction(form: FormData) {
  const email = String(form.get("email") ?? "").trim()
  const password = String(form.get("password") ?? "")
  if (!email || !password) redirect("/admin/login?error=invalid")

  const { createClient } = await import("@/lib/supabase/server")
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) redirect("/admin/login?error=invalid")

  const {
    data: { user },
  } = await supabase.auth.getUser()
  const { data: profile } = user
    ? await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()
    : { data: null }

  if (profile?.role !== "admin") {
    await supabase.auth.signOut()
    redirect("/admin/login?error=forbidden")
  }
  redirect("/admin")
}

export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/admin/login")
}

export async function saveProjectAction(form: FormData) {
  const admin = await requireAdmin()
  const supabase = await createClient()
  const id = String(form.get("id") ?? "")
  const oldSlug = String(form.get("old_slug") ?? "")

  let values
  try {
    values = validateProjectForm(form)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Validation failed."
    redirect(`/admin/projects/${id ? `${id}/edit` : "new"}?error=${encodeURIComponent(message)}`)
  }

  const payload = { ...values, updated_by: admin.id }
  const result = id
    ? await supabase.from("projects").update(payload).eq("id", id).select("id").single()
    : await supabase
        .from("projects")
        .insert({ ...payload, created_by: admin.id })
        .select("id")
        .single()

  if (result.error) {
    const message = result.error.code === "23505" ? "Slug is already in use." : "Unable to save project."
    redirect(`/admin/projects/${id ? `${id}/edit` : "new"}?error=${encodeURIComponent(message)}`)
  }

  revalidateContent(oldSlug, values.slug, "project")
  redirect(`/admin/projects/${result.data.id}/edit?saved=1`)
}

export async function archiveProjectAction(form: FormData) {
  await requireAdmin()
  const id = String(form.get("id") ?? "")
  const slug = String(form.get("slug") ?? "")
  const supabase = await createClient()
  const { error } = await supabase
    .from("projects")
    .update({ publish_status: "archived", published_at: null })
    .eq("id", id)
  if (error) redirect("/admin/projects?error=archive")
  revalidateContent(slug, slug, "project")
  redirect("/admin/projects?archived=1")
}

export async function deleteProjectAction(form: FormData) {
  await requireAdmin()
  if (String(form.get("confirmation") ?? "") !== "DELETE") redirect("/admin/projects?error=confirmation")
  const id = String(form.get("id") ?? "")
  const slug = String(form.get("slug") ?? "")
  const supabase = await createClient()
  const { data: media } = await supabase.from("project_media").select("storage_path").eq("project_id", id)
  const paths = (media ?? []).map((item) => item.storage_path)
  if (paths.length) await supabase.storage.from("project-media").remove(paths)
  const { error } = await supabase.from("projects").delete().eq("id", id)
  if (error) redirect("/admin/projects?error=delete")
  revalidateContent(slug, slug, "project")
  redirect("/admin/projects?deleted=1")
}

export async function saveProductAction(form: FormData) {
  const admin = await requireAdmin()
  const supabase = await createClient()
  const id = String(form.get("id") ?? "")
  const oldSlug = String(form.get("old_slug") ?? "")
  let values
  try {
    values = validateProductForm(form)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Validation failed."
    redirect(`/admin/products/${id ? `${id}/edit` : "new"}?error=${encodeURIComponent(message)}`)
  }
  const payload = { ...values, updated_by: admin.id }
  const result = id
    ? await supabase.from("products").update(payload).eq("id", id).select("id").single()
    : await supabase.from("products").insert({ ...payload, created_by: admin.id }).select("id").single()
  if (result.error) {
    const message = result.error.code === "23505" ? "Slug is already in use." : "Unable to save product."
    redirect(`/admin/products/${id ? `${id}/edit` : "new"}?error=${encodeURIComponent(message)}`)
  }
  revalidateContent(oldSlug, values.slug, "product")
  redirect(`/admin/products/${result.data.id}/edit?saved=1`)
}

export async function archiveProductAction(form: FormData) {
  await requireAdmin()
  const id = String(form.get("id") ?? "")
  const slug = String(form.get("slug") ?? "")
  const supabase = await createClient()
  const { error } = await supabase.from("products").update({ publish_status: "archived", published_at: null }).eq("id", id)
  if (error) redirect("/admin/products?error=archive")
  revalidateContent(slug, slug, "product")
  redirect("/admin/products?archived=1")
}

export async function deleteProductAction(form: FormData) {
  await requireAdmin()
  if (String(form.get("confirmation") ?? "") !== "DELETE") redirect("/admin/products?error=confirmation")
  const id = String(form.get("id") ?? "")
  const slug = String(form.get("slug") ?? "")
  const supabase = await createClient()
  const { data: media } = await supabase.from("product_media").select("storage_path").eq("product_id", id)
  const paths = (media ?? []).map((item) => item.storage_path)
  if (paths.length) await supabase.storage.from("product-media").remove(paths)
  const { error } = await supabase.from("products").delete().eq("id", id)
  if (error) redirect("/admin/products?error=delete")
  revalidateContent(slug, slug, "product")
  redirect("/admin/products?deleted=1")
}

export async function uploadMediaAction(form: FormData) {
  await requireAdmin()
  const entityType = String(form.get("entity_type") ?? "") as "project" | "product"
  const entityId = String(form.get("entity_id") ?? "")
  const altText = String(form.get("alt_text") ?? "").trim()
  const caption = String(form.get("caption") ?? "").trim() || null
  const layout = String(form.get("layout") ?? "full")
  const file = form.get("file")
  if (!(file instanceof File) || !file.size || !altText || !["project", "product"].includes(entityType)) redirect("/admin?error=upload-validation")
  if (!allowedTypes.includes(file.type) || file.size > maxFileSize) redirect("/admin?error=upload-type")
  const ext = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1]
  const path = `${entityId}/${crypto.randomUUID()}.${ext}`
  const bucket = entityType === "project" ? "project-media" : "product-media"
  const supabase = await createClient()
  const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file, { contentType: file.type, upsert: false })
  if (uploadError) redirect(`/admin/${entityType}s/${entityId}/edit?error=upload`)
  const validLayouts = ["full", "half", "mobile", "cover"] as const
  const normalizedLayout = validLayouts.includes(
    layout as (typeof validLayouts)[number]
  )
    ? (layout as (typeof validLayouts)[number])
    : "full"
  const mediaPayload = {
    storage_path: path,
    public_url: null,
    alt_text: altText,
    caption,
    layout: normalizedLayout,
  }
  const { error } =
    entityType === "project"
      ? await supabase
          .from("project_media")
          .insert({ ...mediaPayload, project_id: entityId })
      : await supabase
          .from("product_media")
          .insert({ ...mediaPayload, product_id: entityId })
  if (error) {
    await supabase.storage.from(bucket).remove([path])
    redirect(`/admin/${entityType}s/${entityId}/edit?error=upload-record`)
  }
  revalidatePath(`/admin/${entityType}s/${entityId}/edit`)
  redirect(`/admin/${entityType}s/${entityId}/edit?uploaded=1`)
}

export async function deleteMediaAction(form: FormData) {
  await requireAdmin()
  const entityType = String(form.get("entity_type") ?? "") as "project" | "product"
  const entityId = String(form.get("entity_id") ?? "")
  const mediaId = String(form.get("media_id") ?? "")
  const storagePath = String(form.get("storage_path") ?? "")
  if (String(form.get("confirmation") ?? "") !== "DELETE") redirect(`/admin/${entityType}s/${entityId}/edit?error=confirmation`)
  const bucket = entityType === "project" ? "project-media" : "product-media"
  const supabase = await createClient()
  const { error } =
    entityType === "project"
      ? await supabase.from("project_media").delete().eq("id", mediaId)
      : await supabase.from("product_media").delete().eq("id", mediaId)
  if (error) redirect(`/admin/${entityType}s/${entityId}/edit?error=delete-media`)
  await supabase.storage.from(bucket).remove([storagePath])
  revalidatePath(`/admin/${entityType}s/${entityId}/edit`)
  redirect(`/admin/${entityType}s/${entityId}/edit?media-deleted=1`)
}

export async function updateMediaAction(form: FormData) {
  await requireAdmin()
  const entityType = String(form.get("entity_type") ?? "") as "project" | "product"
  const entityId = String(form.get("entity_id") ?? "")
  const mediaId = String(form.get("media_id") ?? "")
  const altText = String(form.get("alt_text") ?? "").trim()
  const caption = String(form.get("caption") ?? "").trim() || null
  const layout = String(form.get("layout") ?? "full")
  const sortOrder = Number(form.get("sort_order") ?? 0)
  if (!altText || !Number.isInteger(sortOrder) || sortOrder < 0) redirect(`/admin/${entityType}s/${entityId}/edit?error=media-validation`)
  const validLayouts = ["full", "half", "mobile", "cover"] as const
  if (!validLayouts.includes(layout as (typeof validLayouts)[number])) {
    redirect(`/admin/${entityType}s/${entityId}/edit?error=media-validation`)
  }
  const normalizedLayout = layout as (typeof validLayouts)[number]
  const supabase = await createClient()
  const updatePayload = {
    alt_text: altText,
    caption,
    layout: normalizedLayout,
    sort_order: sortOrder,
  }
  const { error } =
    entityType === "project"
      ? await supabase.from("project_media").update(updatePayload).eq("id", mediaId)
      : await supabase.from("product_media").update(updatePayload).eq("id", mediaId)
  if (error) redirect(`/admin/${entityType}s/${entityId}/edit?error=media-update`)
  revalidatePath(`/admin/${entityType}s/${entityId}/edit`)
  redirect(`/admin/${entityType}s/${entityId}/edit?media-saved=1`)
}
