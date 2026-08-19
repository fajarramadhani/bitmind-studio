import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn"

const timelines = [
  { service: "Landing Page", duration: "1–2 weeks" },
  { service: "Company Profile", duration: "2–4 weeks" },
  { service: "Custom Web Application", duration: "Depends on scope" },
  { service: "UI/UX Redesign", duration: "2–3 weeks" },
]

export function ServiceTimeline() {
  return (
    <Section className="border-t border-border">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-24">
          <FadeIn>
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Timeline
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                Typical Duration
              </h2>
              <p className="max-w-xs text-base text-muted-foreground leading-relaxed">
                Project timelines vary based on scope and content availability.
              </p>
            </div>
          </FadeIn>

          <Stagger className="flex flex-col border-t border-border">
            {timelines.map((item) => (
              <StaggerItem
                key={item.service}
                className="flex items-center justify-between py-6 border-b border-border transition-colors hover:bg-muted/30"
              >
                <span className="text-base font-medium text-foreground">
                  {item.service}
                </span>
                <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {item.duration}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  )
}
