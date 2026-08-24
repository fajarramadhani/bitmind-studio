import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { Button } from "@/components/ui/Button"
import { FadeIn } from "@/components/shared/FadeIn"

export function AboutSection() {
  return (
    <Section className="border-t border-border bg-surface py-20 md:py-24 lg:py-28">
      <Container>
        <div className="grid gap-8 border-y border-border py-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <FadeIn>
            <div className="flex flex-col gap-5">
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground">
                Small studio. Serious execution.
              </h2>
              <p className="max-w-2xl text-balance text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed text-muted-foreground">
                BITMIND is an independent digital studio focused on carefully designed
                and thoughtfully built digital experiences and products.
              </p>
              <div className="pt-2">
                <Button href="/about" variant="ghost" className="group -mx-3">
                  Learn About BITMIND
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  )
}
