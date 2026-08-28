import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"
import { Button } from "@/components/ui/Button"
import { FadeIn } from "@/components/shared/FadeIn"

export const metadata = {
  title: "About",
  description:
    "BITMIND STUDIO is an independent digital studio focused on designing and building thoughtful digital experiences and products.",
}

const values = [
  {
    title: "Craft Over Speed",
    description:
      "We take the time to understand what matters before writing a single line of code. Every detail is considered, not rushed.",
  },
  {
    title: "Honest Work",
    description:
      "No inflated promises or unnecessary complexity. We do what the project actually needs and do it well.",
  },
  {
    title: "Close Collaboration",
    description:
      "We work directly with the people who care most about the outcome. Fewer layers, clearer communication, better results.",
  },
  {
    title: "Long-Term Thinking",
    description:
      "We build things that last and scale gracefully, not just demos that impress on launch day and crumble afterward.",
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-12 md:pt-20 lg:pt-24">
        <Container>
          <FadeIn>
            <div className="flex max-w-4xl flex-col gap-6">
              <p className="text-sm font-medium uppercase tracking-wider text-accent">
                About BITMIND STUDIO
              </p>
              <h1 className="text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-foreground">
                A small studio with
                <br />
                serious intentions.
              </h1>
              <p className="max-w-2xl text-[clamp(1.05rem,1.5vw,1.25rem)] leading-relaxed text-muted-foreground">
                We design and build digital experiences and products — websites,
                interfaces, and systems that are grounded in clarity, function,
                and care.
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Our Story */}
      <Section className="pt-12 md:pt-16 lg:pt-20">
        <Container>
          <FadeIn>
            <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
              <SectionHeading
                eyebrow="Our Story"
                title="How we started"
              />
              <div className="max-w-xl space-y-5 text-lg leading-relaxed text-muted-foreground">
                <p>
                  BITMIND STUDIO was founded in Indonesia by a team that wanted to
                  do things differently — fewer projects, more focus. Instead of
                  scaling up into a large agency with endless account layers, we
                  kept the studio small and deliberate.
                </p>
                <p>
                  The name itself reflects what we care about: the intersection of
                  technology and mind — building digital products that are
                  thoughtful, not just technically functional. Every project we
                  take on is a chance to prove that quality, not volume, is the
                  measure that matters.
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* What We Stand For */}
      <Section className="border-t border-border bg-surface">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Values"
              title="What we stand for"
              description="These aren't aspirational platitudes — they're the actual decisions we make every day."
              className="mb-12 lg:mb-16"
            />
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((value, index) => (
              <FadeIn key={value.title} delay={index * 0.08}>
                <div className="rounded-2xl border border-border/70 bg-background p-6 md:p-8">
                  <h3 className="text-lg font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* How We Work */}
      <Section className="border-t border-border">
        <Container>
          <FadeIn>
            <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
              <SectionHeading
                eyebrow="Approach"
                title="How we work"
              />
              <div className="max-w-xl space-y-5 text-lg leading-relaxed text-muted-foreground">
                <p>
                  We start every project by understanding the real problem — not
                  just the brief, but the business context, the user, and the
                  constraints that shape what&apos;s possible. This discovery phase
                  isn&apos;t a checkbox; it&apos;s the foundation everything else is built on.
                </p>
                <p>
                  From there, we move through design and development in close
                  loops with our clients. There are no black boxes. You see the
                  work as it takes shape, and you have a real say in where it
                  goes. When the project ships, it ships because everyone
                  involved is confident it&apos;s right.
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="border-t border-border bg-surface">
        <Container>
          <FadeIn>
            <div className="flex flex-col items-center gap-6 text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-accent">
                Let&apos;s Talk
              </p>
              <h2 className="max-w-2xl text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground">
                Have a project in mind?
              </h2>
              <p className="max-w-xl text-[clamp(1rem,1.3vw,1.15rem)] leading-relaxed text-muted-foreground">
                We take on a limited number of projects at a time so we can give
                each one the attention it deserves. If you have an idea, a
                problem, or a vision — let&apos;s talk about how to bring it to life.
              </p>
              <div className="flex w-full flex-col justify-center gap-3 pt-2 min-[390px]:w-auto min-[390px]:flex-row">
                <Button href="/contact" size="lg" className="w-full min-[390px]:w-auto">
                  Start a Conversation
                </Button>
                <Button href="/work" variant="secondary" size="lg" className="w-full min-[390px]:w-auto">
                  See Our Work
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  )
}
