import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn"
import { servicePricing } from "@/data/pricing"
import { services } from "@/data/services"

export function ServicePricing() {
  return (
    <Section className="border-t border-border bg-foreground text-background">
      <Container>
        <FadeIn>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Pricing Approach
              </p>
              <h2 className="max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
                Professional scope, flexible quotation.
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-relaxed text-background/70 lg:justify-self-end">
              Every project is different. Final pricing depends on scope, content,
              features and timeline.
            </p>
          </div>
        </FadeIn>

        <Stagger className="mt-14 divide-y divide-background/10 border-y border-background/10">
          {servicePricing.map((pricing) => {
            const service = services.find(
              (item) => item.slug === pricing.serviceSlug
            )

            if (!service) return null

            return (
              <StaggerItem key={pricing.serviceSlug}>
                <div className="grid gap-5 py-7 md:grid-cols-[1fr_1fr_auto] md:items-center md:gap-8">
                  <h3 className="text-lg font-medium text-background">
                    {service.title}
                  </h3>
                  <div>
                    <p className="font-medium text-background">
                      {pricing.priceLabel ?? "Custom quotation"}
                    </p>
                    {pricing.note ? (
                      <p className="mt-1 text-sm leading-relaxed text-background/55">
                        {pricing.note}
                      </p>
                    ) : null}
                  </div>
                  <Link
                    href={`/contact?service=${service.slug}`}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-background transition-colors hover:text-accent"
                  >
                    Request a Quote
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </StaggerItem>
            )
          })}
        </Stagger>
      </Container>
    </Section>
  )
}
