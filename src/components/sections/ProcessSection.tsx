import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn"

const steps = [
  ["Discover", "Understand the business, goals, and requirements."],
  ["Plan", "Define content, structure, and project direction."],
  ["Design", "Translate strategy into a clear visual experience."],
  ["Build", "Turn the direction into a responsive product."],
  ["Review", "Refine through testing and focused feedback."],
  ["Launch", "Deploy and prepare the product for real users."],
] as const

export function ProcessSection() {
  return (
    <Section className="border-t border-border py-20 md:py-24 lg:py-28">
      <Container>
        <FadeIn className="mb-12 md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Process</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            How We Work
          </h2>
        </FadeIn>

        <Stagger className="grid border-t border-border md:grid-cols-2 lg:grid-cols-6">
          {steps.map(([title, description], index) => (
            <StaggerItem
              key={title}
              className="border-b border-border py-6 md:px-5 lg:border-r lg:px-4 lg:last:border-r-0"
            >
              <span className="text-sm font-semibold text-accent">0{index + 1}</span>
              <h3 className="mt-8 text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
