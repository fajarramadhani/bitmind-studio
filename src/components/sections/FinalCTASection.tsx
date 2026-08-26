import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { Button } from "@/components/ui/Button"
import { FadeIn } from "@/components/shared/FadeIn"

export function FinalCTASection() {
  return (
    <Section className="py-20 md:py-24 lg:py-28">
      <Container>
        <FadeIn>
          <div className="relative overflow-hidden rounded-[2rem] bg-surface-dark px-7 py-14 text-white ring-1 ring-white/[0.08] md:px-12 md:py-16 lg:px-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_30rem_at_80%_80%,rgba(0,101,255,0.15),transparent_60%)]" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="flex max-w-3xl flex-col gap-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Start a Project
                </p>

                <h2 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.025em] md:leading-[1.1]">
                  Have something worth building?
                </h2>

                <p className="max-w-xl text-[clamp(1.1rem,1.5vw,1.35rem)] leading-relaxed text-white/80">
                  Let&apos;s turn it into a digital experience that works.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button
                  href="/contact"
                  variant="secondary"
                  size="lg"
                  className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                >
                  Start a Project
                </Button>
                <Button
                  href="/work"
                  variant="ghost"
                  size="lg"
                  className="text-white hover:bg-white/10"
                >
                  View Our Work
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}