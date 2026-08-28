import Link from "next/link"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn"
import { ArrowRight } from "lucide-react"

const engagementModels = [
  {
    number: "01",
    title: "Project-Based",
    description:
      "A good fit for clearly defined websites, interfaces, digital experiences, systems, or product builds with a known goal and scope.",
  },
  {
    number: "02",
    title: "Productized / Guided",
    description:
      "A better fit when the work follows a more structured delivery model, such as a guided digital experience with a clearer shape and process.",
  },
  {
    number: "03",
    title: "Scope-Led Collaboration",
    description:
      "Some work starts with a stronger design or product direction than a fixed specification. In those cases, BITMIND helps define what should be built before the implementation scope is finalized.",
  },
] as const

export function ServiceIncluded() {
  return (
    <Section className="border-t border-border bg-surface">
      <Container>
        <FadeIn>
          <div className="mb-12 max-w-2xl md:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Engagement Models
            </p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground">
              A focused way of working, without pretending to be a large agency
              structure.
            </h2>
            <p className="mt-4 max-w-xl text-[clamp(1rem,1.25vw,1.12rem)] leading-relaxed text-muted-foreground">
              BITMIND works through a small number of clear engagement models so
              the collaboration stays understandable, practical, and grounded in
              the actual project needs.
            </p>
          </div>
        </FadeIn>

        <Stagger
          className="grid gap-6 md:grid-cols-3"
          staggerDelay={0.08}
        >
          {engagementModels.map((item) => (
            <StaggerItem
              key={item.title}
              className="group flex flex-col rounded-[1.25rem] border border-border/70 bg-background p-7 transition-colors hover:border-accent/30"
            >
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent">
                {item.number}
              </span>
              <h3 className="mt-5 text-[clamp(1.15rem,1.5vw,1.35rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-foreground">
                {item.title}
              </h3>
              <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <Link
                href="/contact"
                className="group/link mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
              >
                Discuss this model
                <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}