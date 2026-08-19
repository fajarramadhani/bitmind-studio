import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn"
import { projectKindLabels } from "@/lib/content/labels"
import type { Project } from "@/types"

export function SelectedWorkSection({ projects }: { projects: Project[] }) {
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 2)
  if (!featuredProjects.length) return null

  return (
    <Section className="py-20 md:py-24 lg:py-28">
      <Container>
        <FadeIn>
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Selected Work"
              title="Digital experiences built for real businesses."
              description="A focused selection of work shaped around clarity, credibility, and practical outcomes."
            />
            <Link href="/work" className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-foreground">
              View Our Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>

        <Stagger className="mt-12 grid gap-14 md:mt-16 md:gap-16">
          {featuredProjects.map((project, index) => (
            <StaggerItem key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                className={`group grid gap-6 ${
                  index === 1
                    ? "lg:grid-cols-[minmax(0,5fr)_minmax(260px,2fr)] lg:items-end"
                    : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden rounded-2xl border border-border/60 bg-muted ${
                    index === 0 ? "aspect-[16/10]" : "aspect-[4/3]"
                  }`}
                >
                  {project.thumbnail ? (
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      sizes={index === 0 ? "(max-width: 1280px) 100vw, 1280px" : "(max-width: 1024px) 100vw, 70vw"}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    />
                  ) : (
                    <div className="flex h-full flex-col bg-surface p-4 sm:p-7">
                      <div className="flex h-8 items-center gap-1.5 border-b border-border pb-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-border" />
                        <span className="h-2.5 w-2.5 rounded-full bg-border" />
                        <span className="h-2.5 w-2.5 rounded-full bg-border" />
                        <span className="ml-3 h-4 flex-1 rounded-sm bg-muted" />
                      </div>
                      <div className="grid flex-1 gap-5 py-5 sm:grid-cols-[1.35fr_0.65fr] sm:items-center sm:py-8">
                        <div>
                          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent">
                            {project.category}
                          </span>
                          <span className="mt-3 block max-w-lg text-2xl font-semibold leading-tight tracking-tight sm:text-4xl">
                            {project.title}
                          </span>
                          <span className="mt-4 block h-2 w-3/4 rounded-full bg-border" />
                          <span className="mt-2 block h-2 w-1/2 rounded-full bg-border" />
                        </div>
                        <div className="hidden grid-cols-2 gap-2 sm:grid">
                          <span className="aspect-square rounded-lg bg-brand-primary-soft" />
                          <span className="aspect-square rounded-lg bg-muted" />
                          <span className="col-span-2 h-12 rounded-lg bg-foreground" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-border pt-3 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        <span>Responsive Website</span>
                        <span>{project.year}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className={index === 0 ? "mt-1 grid gap-4 md:grid-cols-[1fr_auto] md:items-end" : "flex flex-col gap-4 lg:pb-2"}>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      0{index + 1} · {project.category} · {project.year}
                      {project.kind && project.kind !== "client"
                        ? ` · ${projectKindLabels[project.kind]}`
                        : ""}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent md:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                      {project.shortDescription}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                    View Case Study
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
