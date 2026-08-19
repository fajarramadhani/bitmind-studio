import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { Button } from "@/components/ui/Button"
import { FadeIn } from "@/components/shared/FadeIn"

export function FinalCTASection() {
  return (
    <Section className="py-20 md:py-24 lg:py-28">
      <Container>
        <FadeIn>
          <div className="rounded-2xl bg-foreground px-7 py-14 text-background md:px-12 md:py-16 lg:px-16">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="flex max-w-3xl flex-col gap-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/60">
                Start a Project
              </p>

              <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Have an idea?
                <br />
                Let&apos;s build it.
              </h2>

              <p className="max-w-xl text-lg leading-relaxed text-background/80">
                Whether you&apos;re building a new website, redesigning an existing
                one or exploring a digital product, let&apos;s talk.
              </p>

              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button
                  href="/work"
                  variant="secondary"
                  size="lg"
                  className="border-transparent bg-background text-foreground hover:bg-background/90"
                >
                  Start a Project
                </Button>
                <Button
                  href="/contact"
                  variant="ghost"
                  size="lg"
                  className="text-background hover:bg-background/10"
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
