import { Suspense } from "react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { FadeIn } from "@/components/shared/FadeIn"
import { InquiryForm } from "@/components/sections/InquiryForm"

export function ContactHero() {
  return (
    <Section className="pt-32 md:pt-40 lg:pt-48">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-24 lg:items-start">
          <FadeIn>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Start a Project
                </p>
                <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
                  Tell us what you&apos;re building and we&apos;ll help define the best next step.
                </h1>
                <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                  Whether you need a website, interface design, a digital
                  experience, a business system, or a custom digital product,
                  BITMIND will review the project direction and recommend a
                  practical next step.
                </p>
              </div>

              <div className="border-t border-border pt-8">
                <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  What We Need From You
                </h2>
                <ul className="flex flex-col gap-3">
                  {[
                    "Project context or business background",
                    "Existing website, product, or workflow references",
                    "Key goals and required outcomes",
                    "Relevant content or brand materials",
                    "Any technical or timing constraints",
                    "Feedback during the review process",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-accent">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">
                  Don&apos;t have everything ready yet? We can still start by defining
                  the direction and what the project actually needs.
                </p>
              </div>

              <div className="border-t border-border pt-8">
                <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  What Happens Next
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  We&apos;ll review the scope, identify any open questions, and
                  respond with the most useful next step for the project.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground">
                Tell Us About Your Project
              </h2>
              <Suspense
                fallback={
                  <p className="text-sm text-muted-foreground">
                    Preparing the inquiry form...
                  </p>
                }
              >
                <InquiryForm />
              </Suspense>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  )
}
