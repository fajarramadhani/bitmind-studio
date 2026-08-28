import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"
import { Button } from "@/components/ui/Button"
import { BrowserFrame, DeviceFrame } from "@/components/ui/BrowserFrame"
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "BITMIND Moments",
  description:
    "Digital experiences for life's meaningful moments, presented as a guided BITMIND offering.",
}

const categories = [
  {
    title: "Wedding",
    status: "Priority Category",
    description:
      "A refined digital experience for sharing ceremony details, story-led sections, and a memorable invitation flow.",
  },
  {
    title: "Birthday",
    status: "Previewable",
    description:
      "A privacy-safe birthday experience direction built around storytelling, celebration details, and visual warmth.",
  },
  {
    title: "Engagement",
    status: "Planned",
    description:
      "A focused experience for announcing and celebrating a meaningful milestone with clarity and style.",
  },
  {
    title: "Anniversary",
    status: "Planned",
    description:
      "A digital format for honoring shared memories, celebration details, and elegant personal storytelling.",
  },
  {
    title: "Graduation",
    status: "Planned",
    description:
      "A cleaner, more memorable experience for sharing achievements, schedules, and celebration information.",
  },
  {
    title: "Farewell",
    status: "Planned",
    description:
      "A thoughtful event experience for transitions, appreciation moments, and guest communication.",
  },
  {
    title: "Celebration / Event",
    status: "Planned",
    description:
      "A flexible umbrella for custom celebration formats that still need an intentional digital presence.",
  },
] as const

const coreExperience = [
  "Personalized opening experience",
  "Event details and shareable logistics",
  "Countdown and timeline-driven storytelling",
  "Photo gallery and visual memory sections",
  "Music and atmosphere direction",
  "Guest messages, RSVP, maps, and digital gift flows as future-oriented capabilities when the right build phase arrives",
] as const

const workflow = [
  {
    title: "Choose an Experience",
    description:
      "Select the moment, tone, and visual direction that best matches the celebration.",
  },
  {
    title: "Share Your Story",
    description:
      "Provide the event details, photos, and content needed to shape the experience.",
  },
  {
    title: "We Build It",
    description:
      "BITMIND prepares and customizes the digital experience around your content and direction.",
  },
  {
    title: "Review & Publish",
    description:
      "Review the final result, request refinements, and receive the shareable experience once it is ready.",
  },
] as const

const futurePoints = [
  "A consistent Moments ecosystem across life events and celebration formats.",
  "Stronger reusable experience patterns without sacrificing emotional storytelling.",
  "A future platform direction built from honest public capability, not from premature promises.",
] as const

export default function MomentsPage() {
  return (
    <>
      <Section className="pt-12 md:pt-20 lg:pt-24">
        <Container>
          <div className="grid gap-12 xl:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] xl:items-center">
            <FadeIn>
              <div className="flex max-w-4xl flex-col gap-6">
                <p className="text-sm font-medium uppercase tracking-wider text-accent">
                  BITMIND Moments
                </p>
                <h1 className="text-[clamp(2.5rem,5.7vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-foreground">
                  Make every meaningful moment feel special.
                </h1>
                <p className="max-w-2xl text-[clamp(1.05rem,1.45vw,1.25rem)] leading-relaxed text-muted-foreground">
                  A guided BITMIND product experience for beautifully presented
                  digital celebrations — from weddings and birthdays to the moments
                  people want to remember and share with care.
                </p>
                <div className="flex flex-col gap-3 min-[390px]:flex-row min-[390px]:flex-wrap">
                  <Button href="#categories" size="lg" className="w-full min-[390px]:w-auto">
                    Explore Experiences
                  </Button>
                  <Button href="#how-it-works" variant="secondary" size="lg" className="w-full min-[390px]:w-auto">
                    View How It Works
                  </Button>
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                  BITMIND Moments currently reflects a done-for-you, productized
                  service model. It is not yet a self-service builder or full platform.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.14} y={32}>
              <div className="relative mx-auto w-full max-w-4xl">
                <BrowserFrame
                  url="moments.bitmind-studio.com"
                  className="border-border/70 bg-surface"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[linear-gradient(180deg,#FAFBFE_0%,#F2F4FA_100%)] p-5 sm:p-8">
                    <div className="grid h-full gap-5 rounded-[1.5rem] border border-[#DBE1EF] bg-white/90 p-5 shadow-sm sm:grid-cols-[1.2fr_0.8fr] sm:p-8">
                      <div className="flex flex-col justify-between">
                        <div>
                          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#004bbf]">
                            Your moment, beautifully remembered.
                          </p>
                          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#141414] sm:text-4xl">
                            A special day,
                            <br /> thoughtfully shared.
                          </h2>
                          <p className="mt-4 max-w-md text-sm leading-relaxed text-[#5c5c5c] sm:text-base">
                            Editorial storytelling, elegant event information, and a
                            mobile-first rhythm designed for moments people genuinely
                            care about.
                          </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-2xl bg-[#EEF2FF] p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#004bbf]">
                              Storytelling
                            </p>
                            <p className="mt-2 text-sm text-[#141414]">
                              Open with personality, not with a generic template feel.
                            </p>
                          </div>
                          <div className="rounded-2xl bg-[#F5F7FB] p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#004bbf]">
                              Mobile First
                            </p>
                            <p className="mt-2 text-sm text-[#141414]">
                              Built to feel especially strong on phone-sized screens.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hidden rounded-[1.25rem] bg-[#F7F8FB] p-4 sm:flex sm:flex-col sm:justify-between">
                        <div>
                          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#004bbf]">
                            Preview Concept
                          </p>
                          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#141414]">
                            Nadine&apos;s 25th
                          </h3>
                          <p className="mt-2 text-sm text-[#5c5c5c]">
                            A Special Day · 12 December 2026
                          </p>
                        </div>
                        <div className="space-y-3">
                          <div className="h-28 rounded-2xl bg-[#E8ECF8]" />
                          <div className="h-2 rounded-full bg-border" />
                          <div className="h-2 w-4/5 rounded-full bg-border" />
                        </div>
                      </div>
                    </div>
                  </div>
                </BrowserFrame>

                <div className="absolute -bottom-10 right-4 hidden w-36 md:block xl:w-40">
                  <DeviceFrame className="border-2 bg-white shadow-2xl">
                    <div className="flex h-full flex-col bg-[#FBFBFD] p-4 text-center">
                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#004bbf]">
                        A Special Day
                      </span>
                      <span className="mt-4 text-xl font-semibold tracking-tight text-[#141414]">
                        Nadine&apos;s 25th
                      </span>
                      <span className="mt-2 text-xs text-[#5c5c5c]">
                        Celebrate with us
                      </span>
                      <div className="mt-5 flex-1 rounded-2xl bg-[#E8ECF8]" />
                      <div className="mt-4 h-10 rounded-full bg-[#141414]" />
                    </div>
                  </DeviceFrame>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      <Section id="categories" className="border-t border-border py-20 md:py-24 lg:py-28">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Experience Categories"
              title="One product ecosystem, shaped for different kinds of meaningful moments."
              description="These categories belong to BITMIND Moments as one umbrella offering — not as seven unrelated products."
            />
          </FadeIn>

          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <StaggerItem
                key={category.title}
                className="rounded-[1.5rem] border border-border/70 bg-surface px-6 py-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-[clamp(1.2rem,1.6vw,1.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground">
                    {category.title}
                  </h2>
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent">
                    {category.status}
                  </span>
                </div>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-muted-foreground">
                  {category.description}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section className="border-t border-border bg-surface py-20 md:py-24 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,5fr)] lg:items-start">
            <FadeIn>
              <SectionHeading
                eyebrow="Core Experience"
                title="Designed to support the moments people want to remember, revisit, and share."
                description="The product direction focuses on storytelling, event clarity, and a calmer mobile experience. Some capabilities are already part of the design direction, while others remain part of the future product roadmap."
              />
            </FadeIn>

            <Stagger className="grid gap-4">
              {coreExperience.map((item) => (
                <StaggerItem
                  key={item}
                  className="rounded-2xl border border-border bg-background px-5 py-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                    <p className="text-sm leading-relaxed text-foreground md:text-[0.95rem]">
                      {item}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      <Section id="how-it-works" className="border-t border-border py-20 md:py-24 lg:py-28">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="How It Works"
              title="A done-for-you process built for the current stage of the product."
              description="Today, BITMIND Moments is presented as a guided experience rather than a self-service builder."
            />
          </FadeIn>

          <Stagger className="mt-12 grid border-t border-border md:grid-cols-2 lg:grid-cols-4">
            {workflow.map((step, index) => (
              <StaggerItem
                key={step.title}
                className="border-b border-border py-8 md:px-6 lg:border-r lg:px-5 lg:last:border-r-0"
              >
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent">
                  Step {index + 1}
                </span>
                <h2 className="mt-6 text-[1.2rem] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground">{step.title}</h2>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section className="border-t border-border-dark bg-surface-dark py-20 text-white md:py-24 lg:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-end">
            <FadeIn>
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5aa9ff]">
                  Experience Preview
                </p>
                <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-white">
                  Fictional preview, real design intent.
                </h2>
                <p className="mt-4 text-[clamp(1rem,1.25vw,1.15rem)] leading-relaxed text-white/75">
                  This concept uses a fictional celebration and purpose-built copy to
                  demonstrate the art direction, storytelling rhythm, and mobile-first
                  presentation of BITMIND Moments.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.14}>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#5aa9ff]">
                  Preview Details
                </p>
                <div className="mt-4 space-y-3 text-[0.98rem] leading-relaxed text-white/80">
                  <p>Concept: Nadine&apos;s 25th</p>
                  <p>Theme: A Special Day</p>
                  <p>Date: 12 December 2026</p>
                  <p>Purpose: Demonstrate visual storytelling without using private event data.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border py-20 md:py-24 lg:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,3fr)] lg:items-end">
            <FadeIn>
              <SectionHeading
                eyebrow="Future Vision"
                title="One platform for the moments worth remembering."
                description="BITMIND Moments is designed to grow carefully over time — expanding the ecosystem without pretending every future capability is already live today."
              />
            </FadeIn>

            <Stagger className="grid gap-4">
              {futurePoints.map((point) => (
                <StaggerItem
                  key={point}
                  className="rounded-2xl border border-border bg-surface px-5 py-4"
                >
                  <div className="flex items-start gap-3">
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <p className="text-sm leading-relaxed text-foreground md:text-[0.95rem]">
                      {point}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border py-20 md:py-24 lg:py-28">
        <Container>
          <FadeIn>
            <div className="rounded-[1.75rem] border border-border bg-surface px-6 py-10 md:px-10 md:py-12 lg:px-12">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    Start Your Moment
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                    Ready to create a more memorable digital experience for your celebration?
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                    Tell BITMIND about the moment you want to share and we&apos;ll help
                    define the right next step for the experience.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
                  <Button href="/contact" size="lg" className="w-full sm:w-auto">
                    Request an Experience
                  </Button>
                  <Button href="/products" variant="ghost" size="lg" className="w-full sm:w-auto">
                    Back to Products
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  )
}
