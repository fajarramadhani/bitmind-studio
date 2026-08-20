import Link from "next/link"
import { saveProjectAction } from "@/app/admin/actions"
import { SlugFields } from "@/components/admin/SlugFields"
import { SubmitButton } from "@/components/admin/SubmitButton"
import type { ProjectRow } from "@/types/database"

const textareaFields = [
  ["description", "Description"],
  ["overview", "Overview"],
  ["challenge", "Challenge"],
  ["approach", "Approach"],
  ["solution", "Solution"],
  ["outcome", "Outcome"],
] as const

export function ProjectForm({ project }: { project?: ProjectRow }) {
  return (
    <form action={saveProjectAction} className="grid gap-8">
      <input type="hidden" name="id" value={project?.id ?? ""} />
      <input type="hidden" name="old_slug" value={project?.slug ?? ""} />
      <SlugFields title={project?.title} slug={project?.slug} />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <label className="grid gap-2 text-sm font-medium">Project Kind<select name="project_kind" defaultValue={project?.project_kind ?? "client"} className="admin-input"><option value="client">Client Project</option><option value="internal">BITMIND Project</option><option value="concept">Concept Project</option></select></label>
        <label className="grid gap-2 text-sm font-medium">Client<input name="client" defaultValue={project?.client ?? ""} className="admin-input" /></label>
        <label className="grid gap-2 text-sm font-medium">Category<input required name="category" defaultValue={project?.category ?? ""} className="admin-input" /></label>
        <label className="grid gap-2 text-sm font-medium">Year<input required type="number" min="1900" max="2200" name="year" defaultValue={project?.year ?? new Date().getFullYear()} className="admin-input" /></label>
      </div>

      <label className="grid gap-2 text-sm font-medium">Short Description<textarea required rows={3} name="short_description" defaultValue={project?.short_description ?? ""} className="admin-input" /></label>

      <div className="grid gap-5 md:grid-cols-2">
        {textareaFields.map(([name, label]) => (
          <label key={name} className="grid gap-2 text-sm font-medium">
            {label}
            <textarea rows={5} name={name} defaultValue={project?.[name] ?? ""} className="admin-input" />
          </label>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <label className="grid gap-2 text-sm font-medium">Services<input name="services" defaultValue={project?.services.join(", ") ?? ""} className="admin-input" /><span className="text-xs font-normal text-muted-foreground">Comma separated</span></label>
        <label className="grid gap-2 text-sm font-medium">Roles<input name="roles" defaultValue={project?.roles.join(", ") ?? ""} className="admin-input" /><span className="text-xs font-normal text-muted-foreground">Comma separated</span></label>
        <label className="grid gap-2 text-sm font-medium">Technologies<input name="technologies" defaultValue={project?.technologies.join(", ") ?? ""} className="admin-input" /><span className="text-xs font-normal text-muted-foreground">Comma separated</span></label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">Live URL<input type="url" name="live_url" defaultValue={project?.live_url ?? ""} className="admin-input" /></label>
        <label className="grid gap-2 text-sm font-medium">Repository URL<input type="url" name="repository_url" defaultValue={project?.repository_url ?? ""} className="admin-input" /></label>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <label className="grid gap-2 text-sm font-medium">Publish Status<select name="publish_status" defaultValue={project?.publish_status ?? "draft"} className="admin-input"><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
        <label className="grid gap-2 text-sm font-medium">Sort Order<input min="0" type="number" name="sort_order" defaultValue={project?.sort_order ?? 0} className="admin-input" /></label>
        <label className="flex items-center gap-3 self-end rounded-lg border border-border p-3 text-sm font-medium"><input type="checkbox" name="featured" defaultChecked={project?.featured ?? false} /> Featured project</label>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-border pt-6">
        <SubmitButton pendingLabel={project ? "Saving..." : "Creating..."} statusAware>
          {project ? "Save Project" : "Create Project"}
        </SubmitButton>
        <Link href="/admin/projects" className="admin-button-secondary">Cancel</Link>
      </div>
    </form>
  )
}
