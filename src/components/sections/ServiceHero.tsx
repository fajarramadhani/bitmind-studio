import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { Button } from "@/components/ui/Button"
import { FadeIn } from "@/components/shared/FadeIn"

export function ServiceHero() {
  return (
    <Section className="pb-0 pt-32 md:pt-40 lg:pt-48">
      <Container>
        <FadeIn>
          <div className="flex max-w-4xl flex-col gap-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Services
            </p>
            <h1 className="text-[clamp(2.6rem,7.5vw,5.5rem)] font-semibold leading-[0.93] tracking-[-0.02em] text-foreground">
              Websites designed to make businesses look more credible and work
              better online.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              From company profiles to custom web applications, BITMIND STUDIO
              combines design and development to build digital experiences that are
              clear, responsive and ready to use.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button href="/contact" size="lg">
                Start a Project
              </Button>
              <Button href="/work" variant="secondary" size="lg">
                View Our Work
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
