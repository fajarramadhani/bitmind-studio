import Link from "next/link"
import { AdminNotice } from "@/components/admin/AdminNotice"
import { DestructiveActionForm } from "@/components/admin/DestructiveActionForm"
import { getAdminProjects } from "@/lib/admin/queries"

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects()

  return (
    <>
      <AdminNotice />
      <div className="flex items-end justify-between gap-4">
        <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Projects</p><h1 className="mt-2 text-3xl font-semibold">Manage Projects</h1></div>
        <Link href="/admin/projects/new" className="admin-button">+ New Project</Link>
      </div>
      <div className="mt-8 grid gap-4">
        {projects.length ? projects.map((project) => (
          <article key={project.id} className="rounded-xl border border-border bg-surface p-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div><div className="flex flex-wrap gap-2 text-xs text-muted-foreground"><span>{project.project_kind}</span><span>•</span><span>{project.publish_status}</span><span>•</span><span>{project.year}</span>{project.featured ? <span className="text-accent">Featured</span> : null}</div><h2 className="mt-2 text-lg font-semibold">{project.title}</h2><p className="mt-1 text-sm text-muted-foreground">{project.category}</p></div>
              <div className="flex flex-wrap items-end gap-3">
                <Link href={`/admin/projects/${project.id}/edit`} className="admin-button-secondary">Edit</Link>
                <Link href={`/admin/preview/projects/${project.id}`} target="_blank" className="admin-button-secondary">Preview</Link>
                <DestructiveActionForm action="archive-project" id={project.id} />
                <DestructiveActionForm action="delete-project" id={project.id} />
              </div>
            </div>
          </article>
        )) : <div className="rounded-xl border border-dashed border-border p-10 text-center"><h2 className="font-semibold">No projects yet.</h2><Link href="/admin/projects/new" className="mt-3 inline-flex text-sm text-accent">Create your first project.</Link></div>}
      </div>
    </>
  )
}
