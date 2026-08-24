import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn"

const processSteps = [
  {
    title: "Discover",
    description:
      "We clarify the goal, audience, content requirements, technical constraints, and what success should look like before the work takes shape.",
  },
  {
    title: "Design",
    description:
      "We shape the structure, flows, interface direction, and visual experience so the project feels coherent before it moves into build.",
  },
  {
    title: "Build",
    description:
      "Approved directions are turned into responsive, production-ready digital experiences with attention to implementation quality and usability.",
  },
  {
    title: "Launch",
    description:
      "We validate key flows, refine the final details, and prepare the project for release with a clearer handoff into the live stage.",
  },
] as const

export function ServiceProcess() {
  return (
    <Section className="border-t border-border">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="How We Work"
            title="A clear process from direction to launch."
            description="The service process is intentionally straightforward so the project stays understandable from the first conversation through the final release stage."
          />
        </FadeIn>

        <Stagger className="mt-12 grid border-t border-border md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <StaggerItem
              key={step.title}
              className="border-b border-border py-8 md:px-6 lg:border-r lg:px-5 lg:last:border-r-0"
            >
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent">
                Step {index + 1}
              </span>
              <h3 className="mt-6 text-[1.2rem] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
