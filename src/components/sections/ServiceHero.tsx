import { Container } from "@/components/layout/Container"
import { Button } from "@/components/ui/Button"
import { FadeIn } from "@/components/shared/FadeIn"

export function ServiceHero() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container>
        <FadeIn>
          <div className="flex max-w-4xl flex-col gap-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Services
            </p>
            <h1 className="text-[clamp(2.6rem,7.5vw,5.5rem)] font-semibold leading-[0.93] tracking-[-0.02em] text-foreground">
              Digital solutions, thoughtfully designed and built.
            </h1>
            <p className="max-w-2xl text-[clamp(1.05rem,1.45vw,1.25rem)] leading-relaxed text-muted-foreground">
              BITMIND works across websites, interfaces, interactive experiences,
              internal systems, and custom digital products with a focused,
              carefully crafted approach to design and implementation.
            </p>
            <div className="flex flex-col gap-3 min-[390px]:flex-row min-[390px]:flex-wrap">
              <Button href="/contact" size="lg">
                Start a Project
              </Button>
              <Button href="#capabilities" variant="secondary" size="lg">
                Explore Services
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
