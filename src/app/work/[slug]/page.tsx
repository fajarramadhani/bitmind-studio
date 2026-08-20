import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import {
  getNextProject,
  getProjectBySlug,
  getPublishedProjects,
} from "@/lib/content"
import { Badge } from "@/components/ui/Badge"
import { ProjectGallery } from "@/components/ui/ProjectGallery"
import { FadeIn } from "@/components/shared/FadeIn"
import { siteConfig } from "@/config/site"
import { projectKindLabels } from "@/lib/content/labels"

export const dynamic = "force-dynamic"

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return {}

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — BITMIND STUDIO`,
      description: project.shortDescription,
      type: "article",
      images: project.coverImage
        ? [{ url: project.coverImage, alt: project.title }]
        : undefined,
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const projects = await getPublishedProjects()
  const projectIndex = projects.findIndex((project) => project.slug === slug)
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  // Determine next project slug
  const nextProject = await getNextProject(slug)

  return (
    <>
      <Section className="pb-12 pt-12 md:pt-20">
        <Container>
          <FadeIn>
            <div className="flex flex-col gap-6">
              <div>
                <Link
                  href="/work"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  All Work
                </Link>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Badge variant="accent">{project.category}</Badge>
                  {project.kind && project.kind !== "client" ? (
                    <Badge variant="outline">{projectKindLabels[project.kind]}</Badge>
                  ) : null}
                  <span className="text-sm text-muted-foreground">
                    Project / 0{projectIndex + 1}
                  </span>
                </div>
                <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                  {project.title}
                </h1>
              </div>

              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                {project.description || project.shortDescription}
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Metadata Section */}
      <Section className="py-6 border-y border-border bg-surface">
        <Container>
          <FadeIn>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {project.client && (
                <div className="flex flex-col gap-1 border-l border-border pl-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Client
                  </span>
                  <span className="text-base text-foreground">
                    {project.client}
                  </span>
                </div>
              )}

              <div className="flex flex-col gap-1 border-l border-border pl-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Year
                </span>
                <span className="text-base text-foreground">{project.year}</span>
              </div>

              {project.services && project.services.length > 0 && (
                <div className="flex flex-col gap-1 border-l border-border pl-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Services
                  </span>
                  <div className="flex flex-wrap gap-x-2 gap-y-1">
                    {project.services.map((service) => (
                      <span key={service} className="text-sm text-foreground">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.role && project.role.length > 0 && (
                <div className="flex flex-col gap-1 border-l border-border pl-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Role
                  </span>
                  <div className="flex flex-wrap gap-x-2 gap-y-1">
                    {project.role.map((role) => (
                      <span key={role} className="text-sm text-foreground">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Cover Image Placeholder */}
      <Section className="pb-16 pt-16 md:pb-24 md:pt-24">
        <Container>
          <FadeIn y={32}>
            {project.coverImage ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-muted border border-border">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
                <div className="flex h-10 items-center gap-2 border-b border-border bg-muted/60 px-4">
                  <span className="h-3 w-3 rounded-full bg-border" />
                  <span className="h-3 w-3 rounded-full bg-border" />
                  <span className="h-3 w-3 rounded-full bg-border" />
                  <div className="mx-4 flex-1 rounded-md bg-border/60 px-3 py-1 text-center text-xs text-muted-foreground max-w-sm truncate">
                    {new URL(siteConfig.url).hostname}/work/{project.slug}
                  </div>
                </div>
                <div className="flex h-[calc(100%-40px)] w-full flex-col items-center justify-center p-8 text-center bg-background/50">
                  <span className="text-lg font-semibold text-foreground">
                    {project.title}
                  </span>
                  <span className="mt-2 text-sm text-muted-foreground">
                    Case study overview & screen preview coming soon.
                  </span>
                </div>
              </div>
            )}
          </FadeIn>
        </Container>
      </Section>

      {/* Overview, Challenge, Approach */}
      <Section className="py-16 md:py-24 border-t border-border bg-surface">
        <Container>
          <div className="flex flex-col gap-16 md:gap-24">
            {project.overview && (
              <FadeIn>
                <div className="grid gap-6 md:grid-cols-[1fr_2fr] lg:gap-12">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-accent">
                    Overview
                  </h3>
                  <p className="text-lg leading-relaxed text-foreground md:text-xl max-w-3xl">
                    {project.overview}
                  </p>
                </div>
              </FadeIn>
            )}

            {project.challenge && (
              <FadeIn>
                <div className="grid gap-6 md:grid-cols-[1fr_2fr] lg:gap-12">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-accent">
                    The Challenge
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground md:text-lg max-w-3xl">
                    {project.challenge}
                  </p>
                </div>
              </FadeIn>
            )}

            {project.approach && (
              <FadeIn>
                <div className="grid gap-6 md:grid-cols-[1fr_2fr] lg:gap-12">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-accent">
                    The Approach
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground md:text-lg max-w-3xl">
                    {project.approach}
                  </p>
                </div>
              </FadeIn>
            )}
          </div>
        </Container>
      </Section>

      {/* Solution Section (Optionally Dark) */}
      {(project.solution || project.technologies) && (
        <Section className="py-24 bg-foreground text-background">
          <Container>
            <div className="flex flex-col gap-12 max-w-4xl mx-auto">
              <FadeIn>
                <div className="flex flex-col gap-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    The Solution
                  </span>
                  <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                    Design & Technical Strategy
                  </h2>
                  {project.solution && (
                    <p className="text-lg leading-relaxed text-background/80">
                      {project.solution}
                    </p>
                  )}
                </div>
              </FadeIn>

              {project.technologies && project.technologies.length > 0 && (
                <FadeIn delay={0.1}>
                  <div className="flex flex-col gap-4 border-t border-background/10 pt-8">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-background/50">
                      Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-background/5 border border-background/10 px-3 py-1.5 text-xs text-background/90 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              )}
            </div>
          </Container>
        </Section>
      )}

      {/* Gallery Section */}
      {project.gallery && project.gallery.length > 0 && (
        <Section className="py-20 md:py-32">
          <Container>
            <ProjectGallery items={project.gallery} />
          </Container>
        </Section>
      )}

      {/* Outcome & Live URL */}
      {(project.outcome || project.liveUrl) && (
        <Section className="py-16 md:py-24 border-t border-border bg-surface">
          <Container>
            <div className="grid gap-12 md:grid-cols-[1fr_2fr] lg:gap-24 lg:items-center">
              <FadeIn>
                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-accent">
                    Outcome
                  </h3>
                  <h4 className="text-2xl font-semibold tracking-tight text-foreground">
                    Project Results
                  </h4>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="flex flex-col gap-8 max-w-3xl">
                  {project.outcome && (
                    <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                      {project.outcome}
                    </p>
                  )}
                  {project.liveUrl && (
                    <div>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer disabled:pointer-events-none disabled:opacity-50 bg-accent text-accent-foreground hover:bg-accent/90 active:bg-accent/80 hover:shadow-sm min-h-12 px-7 py-3 text-base"
                      >
                        Visit Live Website ↗
                      </a>
                    </div>
                  )}
                </div>
              </FadeIn>
            </div>
          </Container>
        </Section>
      )}

      {/* Next Project Block (Dark) */}
      {nextProject && (
        <Section className="bg-foreground text-background py-24 md:py-32 relative overflow-hidden group">
          <Link
            href={`/work/${nextProject.slug}`}
            className="absolute inset-0 z-10 block"
            aria-label={`Go to next project: ${nextProject.title}`}
          />
          <Container>
            <div className="flex flex-col gap-8 max-w-4xl mx-auto items-center text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/80 transition-colors group-hover:text-accent">
                NEXT PROJECT
              </span>
              <h2 className="text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl leading-none text-background transition-colors group-hover:text-accent">
                {nextProject.title}
              </h2>
              <p className="text-base text-background/60">
                {nextProject.category}
              </p>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-background mt-4 border border-background/20 rounded-full px-6 py-3 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                View Next Project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Container>
        </Section>
      )}
    </>
  )
}
