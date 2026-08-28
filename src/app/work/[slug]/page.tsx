import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import {
  getProjectBySlug,
  getPublishedProjects,
} from "@/lib/content"
import {
  getPublicPortfolioProjects,
  isPublicPortfolioProject,
} from "@/lib/project-portfolio"
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

  if (!project || !isPublicPortfolioProject(project)) return {}

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
  const projects = getPublicPortfolioProjects(await getPublishedProjects())
  const projectIndex = projects.findIndex((project) => project.slug === slug)
  const project = projectIndex >= 0 ? projects[projectIndex] : null

  if (!project) {
    notFound()
  }

  const nextProject =
    projects.length > 1 ? projects[(projectIndex + 1) % projects.length] : null

  const projectKindLabel =
    project.kind && project.kind !== "client"
      ? projectKindLabels[project.kind] ?? project.kind
      : null

  const nextProjectKindLabel =
    nextProject?.kind && nextProject.kind !== "client"
      ? projectKindLabels[nextProject.kind] ?? nextProject.kind
      : null

  const factItems = [
    {
      label: "Year",
      value: String(project.year),
    },
    projectKindLabel
      ? {
          label: "Type",
          value: projectKindLabel,
        }
      : null,
    project.client
      ? {
          label: "Client",
          value: project.client,
        }
      : null,
    project.role?.length
      ? {
          label: "Role",
          value: project.role.join(", "),
        }
      : null,
    project.services?.length
      ? {
          label: "Services",
          value: project.services.join(", "),
        }
      : null,
    project.technologies?.length
      ? {
          label: "Tech Stack",
          value: project.technologies.join(", "),
        }
      : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>

  const contextSections = [
    project.overview
      ? {
          label: "Overview",
          body: project.overview,
          emphasized: true,
        }
      : null,
    project.challenge
      ? {
          label: "The Challenge",
          body: project.challenge,
          emphasized: false,
        }
      : null,
  ].filter(Boolean) as Array<{
    label: string
    body: string
    emphasized: boolean
  }>

  const approachSections = [
    project.approach
      ? {
          label: "The Approach",
          body: project.approach,
        }
      : null,
    project.solution
      ? {
          label: "The Solution",
          body: project.solution,
        }
      : null,
  ].filter(Boolean) as Array<{
    label: string
    body: string
  }>

  const fallbackSummary =
    project.description ||
    project.shortDescription ||
    "A verified project case study will be published here once more structured case-study content is available."

  const hostname = new URL(siteConfig.url).hostname
  const nextProjectMeta = [nextProject?.category, nextProjectKindLabel]
    .filter(Boolean)
    .join(" · ")

  return (
    <>
      <Section className="pb-12 pt-12 md:pt-20 lg:pt-24">
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
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <Badge variant="accent">{project.category}</Badge>
                  <span aria-hidden>·</span>
                  <span>{project.year}</span>
                  {projectKindLabel ? (
                    <>
                      <span aria-hidden>·</span>
                      <Badge variant="outline">{projectKindLabel}</Badge>
                    </>
                  ) : null}
                </div>

                <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                  {project.title}
                </h1>
              </div>

              {project.description || project.shortDescription ? (
                <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                  {project.description || project.shortDescription}
                </p>
              ) : null}
            </div>
          </FadeIn>
        </Container>
      </Section>

      <Section className="pb-16 pt-8 md:pb-24 md:pt-12">
        <Container>
          <FadeIn y={32}>
            {project.coverImage ? (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-muted">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1024px"
                />
              </div>
            ) : (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
                <div className="flex h-10 items-center gap-2 border-b border-border bg-muted/60 px-4">
                  <span className="h-3 w-3 rounded-full bg-border" />
                  <span className="h-3 w-3 rounded-full bg-border" />
                  <span className="h-3 w-3 rounded-full bg-border" />
                  <div className="mx-4 max-w-sm flex-1 truncate rounded-md bg-border/60 px-3 py-1 text-center text-xs text-muted-foreground">
                    {hostname}/work/{project.slug}
                  </div>
                </div>
                <div className="flex h-[calc(100%-40px)] w-full flex-col items-center justify-center bg-background/50 p-8 text-center">
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

      {factItems.length > 0 ? (
        <Section className="border-y border-border bg-surface py-8">
          <Container>
            <FadeIn>
              <div className="flex flex-wrap gap-x-10 gap-y-6">
                {factItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col gap-1.5 border-l border-border pl-4"
                  >
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {item.label}
                    </span>
                    <span className="text-base text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </Container>
        </Section>
      ) : null}

      {contextSections.length > 0 ? (
        <Section className="border-t border-border bg-surface py-16 md:py-24">
          <Container>
            <div className="flex max-w-4xl flex-col gap-16 md:gap-24">
              {contextSections.map((section) => (
                <FadeIn key={section.label}>
                  <div className="grid gap-6 md:grid-cols-[1fr_2fr] lg:gap-12">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      {section.label}
                    </h3>
                    <p
                      className={
                        section.emphasized
                          ? "text-lg leading-relaxed text-foreground md:text-xl"
                          : "text-base leading-relaxed text-muted-foreground md:text-lg"
                      }
                    >
                      {section.body}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {approachSections.length > 0 ? (
        <Section className="bg-surface-dark py-24 text-white">
          <Container>
            <div className="mx-auto flex max-w-4xl flex-col gap-16">
              {approachSections.map((section) => (
                <FadeIn key={section.label}>
                  <div className="grid gap-6 md:grid-cols-[1fr_2fr] lg:gap-12">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5aa9ff]">
                      {section.label}
                    </span>
                    <p className="text-lg leading-relaxed text-white/80">
                      {section.body}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {contextSections.length === 0 && approachSections.length === 0 ? (
        <Section className="border-t border-border bg-surface py-16 md:py-24">
          <Container>
            <FadeIn>
              <div className="grid max-w-4xl gap-6 md:grid-cols-[1fr_2fr] lg:gap-12">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Overview
                </h3>
                <p className="text-lg leading-relaxed text-foreground md:text-xl">
                  {fallbackSummary}
                </p>
              </div>
            </FadeIn>
          </Container>
        </Section>
      ) : null}

      {project.gallery && project.gallery.length > 0 ? (
        <Section className="py-20 md:py-32">
          <Container>
            <FadeIn className="mb-12 md:mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Visual Output
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                Selected project media.
              </h2>
            </FadeIn>
            <ProjectGallery items={project.gallery} />
          </Container>
        </Section>
      ) : null}

      {project.outcome || project.liveUrl ? (
        <Section className="border-t border-border bg-surface py-16 md:py-24">
          <Container>
            <div className="flex max-w-4xl flex-col gap-10">
              {project.outcome ? (
                <FadeIn>
                  <div className="grid gap-6 md:grid-cols-[1fr_2fr] lg:gap-12">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      Outcome
                    </h3>
                    <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                      {project.outcome}
                    </p>
                  </div>
                </FadeIn>
              ) : null}

              {project.liveUrl ? (
                <FadeIn delay={0.1}>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-accent px-7 py-3 text-base font-medium text-accent-foreground transition-all hover:bg-accent/90 hover:shadow-sm active:bg-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background min-[390px]:w-auto"
                  >
                    View Live Experience ↗
                  </a>
                </FadeIn>
              ) : null}
            </div>
          </Container>
        </Section>
      ) : null}

      {nextProject ? (
        <Section className="group relative overflow-hidden bg-surface-dark py-24 text-white md:py-32">
          <Link
            href={`/work/${nextProject.slug}`}
            className="absolute inset-0 z-10 block"
            aria-label={`Go to next project: ${nextProject.title}`}
          />
          <Container>
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5aa9ff]/80 transition-colors group-hover:text-[#5aa9ff]">
                Next Project
              </span>
              <h2 className="text-4xl font-semibold leading-none tracking-tight text-white transition-colors group-hover:text-[#7ab8ff] md:text-6xl lg:text-7xl">
                {nextProject.title}
              </h2>
              {nextProjectMeta ? (
                <p className="text-base text-white/60">{nextProjectMeta}</p>
              ) : null}
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                View Next Project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  )
}
