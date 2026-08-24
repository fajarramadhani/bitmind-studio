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

        {featuredProjects.length > 0 ? (
          <Stagger className="mt-12 grid gap-16 md:mt-16 md:gap-20">
            {featuredProjects.map((project, index) => (
              <StaggerItem key={project.slug}>
                <Link
                  href={`/work/${project.slug}`}
                  className={`group grid gap-7 ${
                    index === 1
                      ? "lg:grid-cols-[minmax(0,5fr)_minmax(280px,2fr)] lg:items-end"
                      : ""
                  }`}
                >
                  <div
                    className={`relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-muted ${
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
                      <div className="flex h-full flex-col bg-surface p-5 sm:p-8">
                        <div className="flex h-9 items-center gap-1.5 border-b border-border pb-3">
                          <span className="h-2.5 w-2.5 rounded-full bg-border" />
                          <span className="h-2.5 w-2.5 rounded-full bg-border" />
                          <span className="h-2.5 w-2.5 rounded-full bg-border" />
                          <span className="ml-3 h-4 flex-1 rounded-full bg-surface-soft" />
                        </div>
                        <div className="grid flex-1 gap-5 py-6 sm:grid-cols-[1.35fr_0.65fr] sm:items-center sm:py-8">
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
                            <span className="aspect-square rounded-xl bg-brand-primary-soft" />
                            <span className="aspect-square rounded-xl bg-surface-soft" />
                            <span className="col-span-2 h-12 rounded-xl bg-foreground" />
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
                      <h3 className="mt-2 text-[clamp(1.8rem,3vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-foreground transition-colors group-hover:text-accent">
                        {project.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-[clamp(1rem,1.2vw,1.08rem)] leading-relaxed text-muted-foreground">
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
        ) : (
          <FadeIn className="mt-12">
            <div className="rounded-[1.75rem] border border-border/70 bg-surface px-6 py-14 md:px-10 md:py-20">
              <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent">
                  Selected Work
                </p>
                <h3 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-foreground">
                  Carefully selected. Truthfully presented.
                </h3>
                <p className="mt-4 max-w-xl text-[clamp(1rem,1.3vw,1.15rem)] leading-relaxed text-muted-foreground">
                  New verified case studies are currently being prepared for publication.
                  The portfolio remains intentionally curated so public work reflects only
                  what BITMIND can present honestly.
                </p>
                <Link
                  href="/work"
                  className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground"
                >
                  Explore the archive
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </FadeIn>
        )}
      </Container>
    </Section>
  )
}
