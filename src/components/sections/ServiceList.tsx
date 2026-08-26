import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"
import { services } from "@/data/services"
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn"
import { Badge } from "@/components/ui/Badge"
import type { Service } from "@/types"

function ServiceBlock({ service, index }: { service: Service; index: number }) {
  return (
    <article
      id={service.slug}
      className="group scroll-mt-28"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
        {/* Left column - sticky sidebar */}
        <aside className="hidden lg:block lg:sticky lg:top-32 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-hidden">
          <div className="flex flex-col gap-6 pt-2">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent">
              0{index + 1}
            </span>
            <div>
              <h3 className="text-[clamp(1.7rem,2.7vw,2.4rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-foreground">
                {service.title}
              </h3>
              {service.valueStatement ? (
                <p className="mt-4 max-w-md text-[1rem] leading-relaxed text-muted-foreground">
                  {service.valueStatement}
                </p>
              ) : null}
              <p className="mt-6 max-w-md text-[1rem] leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
          </div>
        </aside>

        {/* Right column - scrollable content */}
        <div className="flex flex-col gap-10">
          {service.subOffers && service.subOffers.length > 0 ? (
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Typical Scope
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {service.subOffers.map((item) => (
                  <Badge key={item} variant="outline" className="px-3 py-1.5">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}

          {service.idealFor && service.idealFor.length > 0 ? (
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Typical Use Cases
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {service.idealFor.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                    <span className="text-[0.98rem] leading-relaxed text-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <Link
            href={`/contact?service=${service.slug}`}
            className="group/link inline-flex w-fit items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent/80"
          >
            {service.ctaLabel ?? "Start a Project"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  )
}

export function ServiceList() {
  return (
    <Section id="capabilities" className="border-t border-border">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
          <FadeIn>
            <div className="flex flex-col gap-8">
              <SectionHeading
                eyebrow="Core Capabilities"
                title="Five focused service pillars, shaped for modern digital needs."
                description="The service architecture is intentionally focused so it is easier to understand what BITMIND can help design and build."
              />
            </div>
          </FadeIn>

          <Stagger className="flex flex-col divide-y divide-border" staggerDelay={0.08}>
            {services.map((service, i) => (
              <StaggerItem key={service.slug}>
                <ServiceBlock service={service} index={i} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  )
}