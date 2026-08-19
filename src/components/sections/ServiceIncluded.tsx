import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn"

const includedItems = [
  "Discovery & Planning",
  "Information Architecture",
  "UI Design",
  "Responsive Development",
  "Basic SEO Setup",
  "Performance Optimization",
  "Deployment",
  "Post-launch Support",
]

export function ServiceIncluded() {
  return (
    <Section className="border-t border-border bg-surface">
      <Container>
        <FadeIn>
          <div className="mb-12 md:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              What&apos;s Included
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl mb-4">
              Typical Project Deliverables
            </h2>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Depending on project scope, most projects may include the following.
            </p>
          </div>
        </FadeIn>

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {includedItems.map((item, index) => (
            <StaggerItem key={item}>
              <div className="flex flex-col gap-3 border border-border rounded-xl p-6 transition-colors hover:border-accent/30 hover:bg-muted">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  0{index + 1}
                </span>
                <h3 className="text-base font-medium text-foreground">
                  {item}
                </h3>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
