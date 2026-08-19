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
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
                Built around ideas and technology.
              </h2>
              <p className="max-w-2xl leading-relaxed text-muted-foreground md:text-lg">
                BITMIND STUDIO is an independent digital studio focused on designing
                and building websites and digital products that are useful, thoughtful,
                and built to last.
              </p>
              <div className="pt-2">
                <Button href="/about" variant="ghost">
                  Learn About BITMIND →
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  )
}
