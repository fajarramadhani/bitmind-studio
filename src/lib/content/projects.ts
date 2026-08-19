import "server-only"

import { cache } from "react"
import { projects as localProjects } from "@/data/projects"
import { createClient } from "@/lib/supabase/server"
import { getContentSource } from "@/lib/content/config"
import { getStorageReference, resolveMediaUrl } from "@/lib/content/media"
import { mapProject, mapProjectMedia } from "@/lib/content/mappers"
import type { Project } from "@/types"
import type { ProjectMediaRow, ProjectRow } from "@/types/database"

function localPublishedProjects(): Project[] {
  return localProjects.map((project, index) => ({
    ...project,
    kind: project.kind ?? "client",
    publishStatus: "published",
    sortOrder: project.sortOrder ?? index,
  }))
}

async function hydrateRows(rows: ProjectRow[]) {
  if (!rows.length) return []
  const supabase = await createClient()
  const ids = rows.map((row) => row.id)
  const { data: mediaData, error } = await supabase
    .from("project_media")
    .select("*")
    .in("project_id", ids)
    .order("sort_order")

  if (error) throw new Error("Unable to load published project media.")
  const mediaRows = (mediaData ?? []) as ProjectMediaRow[]

  return Promise.all(
    rows.map(async (row) => {
      const projectMedia = mediaRows.filter((item) => item.project_id === row.id)
      const gallery = await Promise.all(
        projectMedia.map(async (item) =>
          mapProjectMedia(
            item,
            await resolveMediaUrl("project-media", item.storage_path)
          )
        )
      )
      const project = mapProject(row, gallery)

      const cover = gallery.find((item) => item.layout === "cover")
      if (!project.coverImage && cover) project.coverImage = cover.src
      if (!project.thumbnail && cover) project.thumbnail = cover.src

      for (const field of ["thumbnail", "coverImage"] as const) {
        const ref = getStorageReference(project[field] ?? null, "project-media")
        if (ref) project[field] = await resolveMediaUrl("project-media", ref)
      }

      return project
    })
  )
}

export const getPublishedProjects = cache(async (): Promise<Project[]> => {
  if (getContentSource() === "local") return localPublishedProjects()

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("publish_status", "published")
    .order("sort_order", { ascending: true })
    .order("published_at", { ascending: false })

  if (error) throw new Error("Unable to load published projects.")
  return hydrateRows((data ?? []) as ProjectRow[])
})

export const getFeaturedProjects = cache(async () =>
  (await getPublishedProjects()).filter((project) => project.featured)
)

export const getProjectBySlug = cache(async (slug: string) => {
  const projects = await getPublishedProjects()
  return projects.find((project) => project.slug === slug) ?? null
})

export const getNextProject = cache(async (slug: string) => {
  const projects = await getPublishedProjects()
  const index = projects.findIndex((project) => project.slug === slug)
  if (index === -1 || projects.length < 2) return null
  const current = projects[index]
  return (
    projects.find((project) => project.slug === current.nextProjectSlug) ??
    projects[(index + 1) % projects.length]
  )
})
