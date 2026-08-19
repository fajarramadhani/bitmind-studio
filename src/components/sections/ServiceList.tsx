import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { services } from "@/data/services"
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn"
import type { Service } from "@/types"

function ServiceBlock({ service, index }: { service: Service; index: number }) {
  return (
    <article
      id={service.slug}
      className="group scroll-mt-28 border-b border-border py-12 transition-colors first:pt-0 last:border-b-0 last:pb-0 hover:bg-muted/30"
    >
      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-12">
        {/* Left: Number + Title */}
        <div className="lg:col-span-4">
          <div className="flex items-baseline gap-4">
            <span className="text-sm font-semibold text-accent">0{index + 1}</span>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Right: Description + Details */}
        <div className="lg:col-span-8">
          <p className="text-base leading-relaxed text-muted-foreground mb-6">
            {service.description}
          </p>

          {service.idealFor && service.idealFor.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                Best For
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.idealFor.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-surface border border-border px-3 py-1 text-xs text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {service.deliverables && service.deliverables.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                Deliverables
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.deliverables.map((item) => (
                  <span
                    key={item}
                    className="rounded-md bg-muted px-3 py-1 text-xs text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          <Link
            href={`/contact?service=${service.slug}`}
            className="group/link inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent/80"
          >
            Discuss This Service
            <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  )
}

export function ServiceList() {
  return (
    <Section>
      <Container>
        <FadeIn>
          <div className="mb-12 md:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              What We Do
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl mb-4">
              Core Services
            </h2>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Each service is designed around real business needs, not just visual
              templates.
            </p>
          </div>
        </FadeIn>

        <Stagger className="flex flex-col">
          {services.map((service, i) => (
            <StaggerItem key={service.slug}>
              <ServiceBlock service={service} index={i} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
