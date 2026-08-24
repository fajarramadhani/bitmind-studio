import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn"

const engagementModels = [
  {
    title: "Project-Based",
    description:
      "A good fit for clearly defined websites, interfaces, digital experiences, systems, or product builds with a known goal and scope.",
  },
  {
    title: "Productized / Guided",
    description:
      "A better fit when the work follows a more structured delivery model, such as a guided digital experience with a clearer shape and process.",
  },
  {
    title: "Scope-Led Collaboration",
    description:
      "Some work starts with a stronger design or product direction than a fixed specification. In those cases, BITMIND helps define what should be built before the implementation scope is finalized.",
  },
] as const

export function ServiceIncluded() {
  return (
    <Section className="border-t border-border bg-surface">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
          <FadeIn>
            <SectionHeading
              eyebrow="Engagement Models"
              title="A focused way of working, without pretending to be a large agency structure."
              description="BITMIND works through a small number of clear engagement models so the collaboration stays understandable, practical, and grounded in the actual project needs."
            />
          </FadeIn>

          <Stagger className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {engagementModels.map((item) => (
              <StaggerItem
                key={item.title}
                className="rounded-[1.5rem] border border-border/70 bg-background px-6 py-7"
              >
                <h3 className="text-[clamp(1.15rem,1.5vw,1.35rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-foreground">
                  {item.title}
                </h3>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  )
}
