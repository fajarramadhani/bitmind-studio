import type { Project } from "@/types"

export const EXCLUDED_PROJECT_SLUGS = new Set(["ardana-perkasa-group"])
export const NEEDS_CONFIRMATION_PROJECT_SLUGS = new Set([
  "prada-badminton-club",
])

export function getPublicPortfolioProjects(projects: Project[]) {
  return projects.filter((project) => isPublicPortfolioProject(project))
}

export function isPublicPortfolioProject(project: Pick<Project, "slug">) {
  return !(
    EXCLUDED_PROJECT_SLUGS.has(project.slug) ||
    NEEDS_CONFIRMATION_PROJECT_SLUGS.has(project.slug)
  )
}
