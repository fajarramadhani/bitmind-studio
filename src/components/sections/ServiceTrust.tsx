import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn"

const projectTypes = [
  "Corporate Website",
  "Landing Page",
  "Business Website",
  "Portfolio Website",
  "Campaign Website",
  "Internal Dashboard",
  "Custom Web Tool",
  "Website Redesign",
]

const reasons = [
  ["Direct Collaboration", "Communication directly with the person building the project."],
  ["Design + Development", "Visual and technical decisions are handled together."],
  ["Responsive by Default", "Designed for mobile, tablet and desktop."],
  ["Clear Process", "Defined project stages from discovery to launch."],
] as const

export function ProjectTypesSection() {
  return (
    <Section className="border-t border-border">
      <Container>
        <FadeIn>
          <p className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Project Types
          </p>
        </FadeIn>
        <Stagger className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {projectTypes.map((type) => (
            <StaggerItem key={type}>
              <div className="flex min-h-28 items-end border-b border-r border-border p-5 text-lg font-medium text-foreground transition-colors hover:bg-surface">
                {type}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}

export function WhyWorkWithBitmind() {
  return (
    <Section className="border-t border-border bg-surface">
      <Container>
        <FadeIn>
          <div className="mb-14">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Why BITMIND
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Focused collaboration, without unnecessary layers.
            </h2>
          </div>
        </FadeIn>
        <Stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(([title, description], index) => (
            <StaggerItem key={title}>
              <span className="text-3xl font-light text-accent/70">
                0{index + 1}
              </span>
              <h3 className="mt-6 text-lg font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
