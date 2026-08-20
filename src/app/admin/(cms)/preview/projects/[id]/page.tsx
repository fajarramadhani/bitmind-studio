import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/layout/Container"
import { Badge } from "@/components/ui/Badge"
import { getAdminProjectById } from "@/lib/admin/queries"
import { createClient } from "@/lib/supabase/server"
import { mapProject, mapProjectMedia } from "@/lib/content/mappers"
import { projectKindLabels } from "@/lib/content/labels"

export default async function ProjectPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { project: row, media } = await getAdminProjectById(id)
  const adminClient = await createClient()
  const gallery = await Promise.all(media.map(async (item) => {
    const { data } = await adminClient.storage.from("project-media").createSignedUrl(item.storage_path, 900)
    return mapProjectMedia(item, data?.signedUrl ?? "")
  }))
  const project = mapProject(row, gallery)
  const cover = gallery.find((item) => item.layout === "cover")

  return (
    <div className="-m-5 min-h-dvh bg-background p-5 sm:-m-8 sm:p-8 lg:-m-10 lg:p-10">
      <Container>
        <div className="flex items-center justify-between border-b border-border pb-5">
          <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Secure Draft Preview</p><p className="mt-1 text-sm text-muted-foreground">This page is not public and does not publish content.</p></div>
          <Link href={`/admin/projects/${id}/edit`} className="admin-button-secondary">Back to Editor</Link>
        </div>
        <article className="py-16 md:py-24">
          <div className="flex flex-wrap gap-2"><Badge variant="accent">{project.category}</Badge>{project.kind ? <Badge variant="outline">{projectKindLabels[project.kind]}</Badge> : null}<Badge variant="outline">{project.publishStatus}</Badge></div>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">{project.title}</h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">{project.description ?? project.shortDescription}</p>
          {cover?.src ? <div className="relative mt-12 aspect-video overflow-hidden rounded-2xl border border-border bg-muted"><Image src={cover.src} alt={cover.alt} fill className="object-cover" sizes="100vw" /></div> : <div className="mt-12 flex aspect-video items-center justify-center rounded-2xl border border-border bg-muted text-muted-foreground">Project cover preview</div>}
          {project.overview ? <section className="mt-20 grid gap-6 md:grid-cols-[1fr_2fr]"><h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Overview</h2><p className="text-xl leading-relaxed">{project.overview}</p></section> : null}
        </article>
      </Container>
    </div>
  )
}
