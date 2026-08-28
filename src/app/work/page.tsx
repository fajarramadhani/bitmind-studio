import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { Button } from "@/components/ui/Button"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn"
import { getPublishedProjects } from "@/lib/content"
import { getPublicPortfolioProjects } from "@/lib/project-portfolio"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Work",
  description:
    "Selected digital products, experiences, and independent or professional work from BITMIND.",
}

export default async function WorkPage() {
  const projects = await getPublishedProjects()
  const verifiedProjects = getPublicPortfolioProjects(projects)

  return (
    <>
      <Section className="pt-12 md:pt-20 lg:pt-24">
        <Container>
          <FadeIn>
            <div className="flex max-w-4xl flex-col gap-6">
              <p className="text-sm font-medium uppercase tracking-wider text-accent">
                Selected Work
              </p>
              <h1 className="text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-foreground">
                Work built with purpose.
              </h1>
              <p className="max-w-2xl text-[clamp(1.05rem,1.5vw,1.25rem)] leading-relaxed text-muted-foreground">
                A focused collection of selected digital products, experiences, and
                independent or professional work.
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      <Section className="pt-12 md:pt-16 lg:pt-20">
        <Container>
          {verifiedProjects.length > 0 ? (
            <Stagger className="grid gap-12 md:gap-16 lg:gap-20">
              {verifiedProjects.map((project, index) => (
                <StaggerItem key={project.slug}>
                  <ProjectCard
                    project={project}
                    variant={index % 3 === 0 ? "large" : "default"}
                  />
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <FadeIn>
              <div className="rounded-[1.75rem] border border-border/70 bg-surface px-6 py-14 md:px-10 md:py-20">
                <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent">
                    Portfolio Archive
                  </p>
                  <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-foreground">
                    Carefully selected. Truthfully presented.
                  </h2>
                  <p className="mt-4 text-[clamp(1rem,1.3vw,1.15rem)] leading-relaxed text-muted-foreground">
                    Case studies are currently being prepared for publication. BITMIND
                    keeps the public portfolio intentionally curated so every project
                    shown reflects work that can be presented honestly.
                  </p>
                  <div className="mt-8 flex justify-center">
                    <Button href="/contact" variant="secondary" size="lg">
                      Start a Project
                    </Button>
                  </div>
                </div>
              </div>
            </FadeIn>
          )}
        </Container>
      </Section>

      <Section className="border-t border-border py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="flex flex-col items-center gap-6 text-center">
              <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                Want to see where the studio is heading next?
              </h2>
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 text-sm font-medium text-foreground"
              >
                Explore BITMIND Products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  )
}
