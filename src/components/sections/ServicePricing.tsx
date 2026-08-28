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
    <Section className="border-t border-white/10 bg-surface-dark">
      <Container>
        <FadeIn>
          <div className="mb-12 max-w-2xl md:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5aa9ff]">
              Investment &amp; Scope
            </p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-white">
              Every project has a different shape.
            </h2>
            <p className="mt-4 text-[clamp(1rem,1.25vw,1.12rem)] leading-relaxed text-white/75">
              Rather than forcing every project into a fixed package, investment
              is shaped by what needs to be designed, built, refined, and
              delivered.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2">
          <FadeIn delay={0.08}>
            <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-7">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#5aa9ff]">
                What shapes investment
              </p>
              <Stagger className="mt-6 grid gap-3 sm:grid-cols-2">
                {investmentFactors.map((item) => (
                  <StaggerItem
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/5 px-4 py-4 transition-colors hover:bg-white/8"
                  >
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#5aa9ff]" />
                    <span className="text-sm leading-relaxed text-white/85">
                      {item}
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div className="flex h-full flex-col justify-between rounded-[1.25rem] border border-white/10 bg-white/5 p-7">
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#5aa9ff]">
                  Commercial framing
                </p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-white/80">
                  The clearest next step is to describe what you are building.
                  Once the scope is clearer, BITMIND can advise on the most
                  suitable service direction and prepare a realistic quotation.
                </p>
              </div>
              <div className="mt-6">
                <Button
                  href="/contact"
                  size="lg"
                  className="w-full bg-white text-black hover:bg-white/90 sm:w-auto"
                >
                  Tell Us What You&apos;re Building
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  )
}