import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { Button } from "@/components/ui/Button"
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn"

const investmentFactors = [
  "Scope",
  "Complexity",
  "Content readiness",
  "Interactions",
  "Integrations",
  "Timeline",
] as const

export function ServicePricing() {
  return (
    <Section className="border-t border-border-dark bg-surface-dark text-background">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
          <FadeIn>
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Investment & Scope
              </p>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-background">
                Every project has a different shape.
              </h2>
              <p className="mt-4 text-[clamp(1rem,1.25vw,1.12rem)] leading-relaxed text-background/75">
                Rather than forcing every project into a fixed package, investment
                is shaped by what needs to be designed, built, refined, and
                delivered.
              </p>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-8">
            <FadeIn delay={0.08}>
              <div className="rounded-[1.5rem] border border-background/10 bg-background/5 p-6 md:p-8">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent">
                  What shapes investment
                </p>
                <Stagger className="mt-6 grid gap-3 sm:grid-cols-2">
                  {investmentFactors.map((item) => (
                    <StaggerItem
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-background/10 bg-background/5 px-4 py-4"
                    >
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-sm leading-relaxed text-background/85">
                        {item}
                      </span>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div className="flex flex-col gap-4 rounded-[1.5rem] border border-background/10 bg-background/5 p-6 md:flex-row md:items-end md:justify-between md:p-8">
                <div className="max-w-xl">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent">
                    Commercial framing
                  </p>
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-background/80">
                    The clearest next step is to describe what you are building.
                    Once the scope is clearer, BITMIND can advise on the most
                    suitable service direction and prepare a realistic quotation.
                  </p>
                </div>
                <Button
                  href="/contact"
                  size="lg"
                  className="bg-background text-foreground hover:bg-background/90"
                >
                  Tell Us What You&apos;re Building
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </Section>
  )
}
