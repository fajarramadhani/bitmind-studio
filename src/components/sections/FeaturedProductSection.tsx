import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { FadeIn } from "@/components/shared/FadeIn"
import { DeviceFrame } from "@/components/ui/BrowserFrame"

export function FeaturedProductSection() {
  return (
    <Section className="border-t border-white/10 bg-surface-dark py-20 text-white md:py-24 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-16">
          <FadeIn>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-accent">
                  Featured Product
                </span>
              </div>

              <h2 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-white">
                BITMIND Moments
              </h2>

              <p className="text-[clamp(1.1rem,1.5vw,1.35rem)] leading-relaxed text-white/80">
                Digital experiences for life&apos;s meaningful moments. A guided,
                done-for-you offering for weddings, birthdays, celebrations, and
                personal storytelling.
              </p>

              <div className="flex flex-col gap-4 border-y border-white/10 py-6">
                <h4 className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-white/50">
                  Experience Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Wedding",
                    "Birthday",
                    "Engagement",
                    "Anniversary",
                    "Graduation",
                    "Farewell",
                    "Celebration / Event",
                  ].map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full bg-white/5 px-4 py-1.5 text-xs text-white/80"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <Link
                  href="/moments"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-all hover:bg-white/90"
                >
                  Explore BITMIND Moments
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} y={32}>
            <div className="relative mx-auto flex max-w-[320px] justify-center">
              <div className="pointer-events-none absolute -inset-4 rounded-full bg-brand-primary/10 blur-3xl" />
              <DeviceFrame className="relative border border-white/20 bg-white/[0.03] shadow-2xl">
                <div className="flex h-full flex-col bg-surface p-4">
                  <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-xl bg-muted border border-border/50">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-accent">
                        A Special Day
                      </span>
                      <span className="mt-4 text-xl font-semibold tracking-tight text-foreground">
                        Nadine&apos;s
                        <br /> Celebration
                      </span>
                      <span className="mt-4 h-1 w-8 bg-border" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="h-3 w-3/4 rounded-sm bg-muted" />
                    <div className="h-3 w-1/2 rounded-sm bg-muted" />
                    <div className="h-3 w-2/3 rounded-sm bg-muted" />
                  </div>
                  <div className="mt-auto pt-6">
                    <div className="h-10 w-full rounded-full bg-brand-primary" />
                  </div>
                </div>
              </DeviceFrame>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  )
}