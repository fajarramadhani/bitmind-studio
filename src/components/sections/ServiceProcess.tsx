import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn"

const processSteps = [
  ["Discover", "Understand the business, goals and users."],
  ["Scope", "Define pages, features, timeline and project requirements."],
  ["Design", "Create the visual direction and interface."],
  ["Build", "Develop the approved design into a responsive website."],
  ["Review", "Test, refine and gather feedback."],
  ["Launch", "Deploy the website and prepare it for production."],
] as const

export function ServiceProcess() {
  return (
    <Section className="border-t border-border">
      <Container>
        <FadeIn>
          <div className="mb-14 max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              How We Work
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              A clear process from first conversation to launch.
            </h2>
          </div>
        </FadeIn>

        <Stagger className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map(([title, description], index) => (
            <StaggerItem key={title}>
              <div className="border-t border-border pt-5">
                <span className="text-sm font-semibold text-accent">
                  0{index + 1}
                </span>
                <h3 className="mt-8 text-xl font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
