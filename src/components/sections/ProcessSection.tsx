import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn"

const steps = [
  ["Discover", "Understand the goal, audience, constraints, and opportunity."],
  ["Design", "Shape the experience, structure, interface, and visual direction."],
  ["Build", "Turn the approved direction into a working digital product or experience."],
  ["Launch", "Validate, refine, and prepare the final experience for production."],
] as const

export function ProcessSection() {
  return (
    <Section className="border-t border-border py-20 md:py-24 lg:py-28">
      <Container>
        <FadeIn className="mb-12 md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">How We Work</p>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground">
            A clear process from first conversation to launch.
          </h2>
        </FadeIn>

        <Stagger className="grid border-t border-border md:grid-cols-2 lg:grid-cols-4">
          {steps.map(([title, description], index) => (
            <StaggerItem
              key={title}
              className="border-b border-border py-8 md:px-6 lg:border-r lg:px-5 lg:last:border-r-0"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Step {index + 1}</span>
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">{title}</h3>
              <p className="mt-3 text-[clamp(0.9rem,1.1vw,1rem)] leading-relaxed text-muted-foreground">{description}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
