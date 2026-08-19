import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn"
import { ProjectCard } from "@/components/ui/ProjectCard"
import type { Project } from "@/types"

export function RelatedWorkSection({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null

  return (
    <Section className="border-t border-border">
      <Container>
        <FadeIn>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Related Work
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                See the thinking applied to real projects.
              </h2>
            </div>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground"
            >
              View Our Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>
        <Stagger className="mt-12 grid gap-10 md:grid-cols-2">
          {projects.slice(0, 2).map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
