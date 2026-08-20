import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { getPublishedProjects } from "@/lib/content"
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn"
import { Button } from "@/components/ui/Button"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Work",
  description:
    "A selection of websites and digital products designed and developed by BITMIND STUDIO.",
}

export default async function WorkPage() {
  const projects = await getPublishedProjects()
  if (!projects || projects.length === 0) {
    return (
      <Section className="min-h-[60vh] flex items-center">
        <Container>
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Selected work is being prepared.
            </h1>
            <p className="mt-4 text-muted-foreground">
              Please check back soon for our latest projects.
            </p>
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <Section className="pt-12 md:pt-20">
      <Container>
        <FadeIn>
          <div className="flex flex-col gap-6 md:gap-8">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                SELECTED WORK
              </p>
              <p className="text-sm text-muted-foreground hidden sm:block">
                Selected Projects {new Date().getFullYear()} —
              </p>
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Digital experiences built for real businesses.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              A selection of websites and digital products designed and developed by
              BITMIND STUDIO.
            </p>
          </div>
        </FadeIn>

        <Stagger className="mt-20 grid gap-16 md:gap-24">
          {projects.map((project, i) => {
            // Create an editorial rhythm: full-width, then 2-column, etc.
            // For now, if we have very few projects, we'll just alternate
            const isFullWidth = i % 3 === 0

            return (
              <StaggerItem key={project.slug}>
                <ProjectCard
                  project={project}
                  variant={isFullWidth ? "large" : "default"}
                />
              </StaggerItem>
            )
          })}
        </Stagger>

        <FadeIn className="mt-24 border-t border-border pt-12 md:mt-32 md:pt-16">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Build With BITMIND
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Need a clearer, more credible digital presence?
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/services" variant="secondary">
                Explore Services
              </Button>
              <Button href="/contact">Start a Project</Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
