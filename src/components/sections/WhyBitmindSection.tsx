import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn"

export function WhyBitmindSection() {
  const points = [
    {
      num: "01",
      title: "Design with purpose",
      description:
        "Design decisions are made for clarity and usability, avoiding excessive decoration to keep experiences direct and functional.",
    },
    {
      num: "02",
      title: "Built for every screen",
      description:
        "Engineered with a mobile-first philosophy, ensuring reliable responsive experiences across diverse device layouts.",
    },
    {
      num: "03",
      title: "Design & development unified",
      description:
        "Visual design and technical architecture are developed alongside each other for consistent, high-fidelity results.",
    },
    {
      num: "04",
      title: "From idea to launch",
      description:
        "We guide projects closely from initial consultation and planning through structured design, build, and production deployment.",
    },
  ]

  return (
    <Section className="border-t border-border bg-surface py-20 md:py-24 lg:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Why BITMIND"
            title="A structured approach to design and technology."
            className="mb-12 md:mb-16"
          />
        </FadeIn>

        <Stagger className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point) => (
            <StaggerItem key={point.num}>
              <div className="flex flex-col gap-5 border-b border-border py-7 sm:px-6 lg:border-r lg:last:border-r-0">
                <span className="text-2xl font-light tracking-tight text-accent/80">
                  {point.num}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {point.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {point.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
