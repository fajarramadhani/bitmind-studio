import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"
import { services } from "@/data/services"
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn"

export function ServicesSection() {
  return (
    <Section className="border-t border-border bg-surface py-20 md:py-24 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <FadeIn>
            <div className="flex flex-col gap-8">
              <SectionHeading
                eyebrow="What We Do"
                title="Digital services designed around real business needs."
              />
              <Link
                href="/services"
                className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-foreground"
              >
                Explore Services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeIn>

          <Stagger className="flex flex-col" staggerDelay={0.1}>
            {services.map((service, index) => (
              <StaggerItem key={service.slug}>
                <Link
                  href={`/services#${service.slug}`}
                  className="group flex flex-col gap-6 border-b border-border py-8 transition-colors first:pt-0 hover:border-accent md:flex-row md:items-baseline md:gap-12"
                >
                  <span className="text-sm font-semibold text-muted-foreground transition-colors group-hover:text-accent md:w-8">
                    0{index + 1}
                  </span>
                  <div className="flex flex-1 flex-col gap-3">
                    <h3 className="text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
                      {service.title}
                    </h3>
                    <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                      {service.shortDescription}
                    </p>
                  </div>
                  <div className="hidden shrink-0 items-center justify-end md:flex md:w-12">
                    <ArrowRight className="h-6 w-6 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:text-accent group-hover:opacity-100" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  )
}
