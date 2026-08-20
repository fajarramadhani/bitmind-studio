import { notFound } from "next/navigation"
import { AdminNotice } from "@/components/admin/AdminNotice"
import { MediaManager } from "@/components/admin/MediaManager"
import { ProjectForm } from "@/components/admin/ProjectForm"
import { getAdminProjectById } from "@/lib/admin/queries"

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let result
  try { result = await getAdminProjectById(id) } catch { notFound() }
  return <><AdminNotice/><p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Projects</p><h1 className="mb-8 mt-2 text-3xl font-semibold">Edit Project</h1><ProjectForm project={result.project}/><MediaManager entityType="project" entityId={id} media={result.media}/></>
}
