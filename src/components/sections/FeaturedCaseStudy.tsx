import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { Badge } from "@/components/ui/Badge"
import { FadeIn } from "@/components/shared/FadeIn"
import type { Project } from "@/types"
import Image from "next/image"

export function FeaturedCaseStudy({ project }: { project: Project | null }) {
  if (!project) {
    return null
  }

  return (
    <Section className="bg-surface-dark py-20 text-white md:py-24 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-16">
          <FadeIn>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5aa9ff]">
                  Featured Case Study
                </span>
                <Badge
                  variant="outline"
                  className="border-white/20 text-white/80"
                >
                  {project.year}
                </Badge>
              </div>

              <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                {project.title}
              </h2>

              <p className="text-base leading-relaxed text-white/75">
                {project.description || project.shortDescription}
              </p>

              {(project.challenge || project.approach) && (
                <div className="grid gap-6 border-y border-white/10 py-6 md:grid-cols-2">
                  {project.challenge && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">
                        The Challenge
                      </h4>
                      <p className="text-sm leading-relaxed text-white/80 line-clamp-4">
                        {project.challenge}
                      </p>
                    </div>
                  )}
                  {project.approach && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">
                        The Approach
                      </h4>
                      <p className="text-sm leading-relaxed text-white/80 line-clamp-4">
                        {project.approach}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div>
                <Link
                  href={`/work/${project.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90"
                >
                  View Case Study
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} y={32}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <div className="flex h-10 items-center gap-2 border-b border-white/10 bg-white/5 px-4">
                <span className="h-3 w-3 rounded-full bg-white/10" />
                <span className="h-3 w-3 rounded-full bg-white/10" />
                <span className="h-3 w-3 rounded-full bg-white/10" />
              </div>
              <div className="relative flex h-[calc(100%-2.5rem)] w-full items-center justify-center p-8">
                {project.coverImage ?? project.thumbnail ? (
                  <Image
                    src={project.coverImage ?? project.thumbnail ?? ""}
                    alt={`${project.title} case study preview`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                  />
                ) : (
                <div className="flex flex-col items-center gap-3 text-center">
                  <span className="text-sm font-medium tracking-wide text-white/60">
                    {project.title}
                  </span>
                  <span className="text-xs text-white/40">
                    Visual Ecosystem Preview
                  </span>
                </div>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  )
}