import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { FadeIn } from "@/components/shared/FadeIn"

const maintenanceScope = [
  "Content updates",
  "Minor fixes",
  "Performance monitoring",
  "Deployment support",
  "Technical maintenance",
]

export function ServiceMaintenance() {
  return (
    <Section className="border-t border-border bg-surface">
      <Container>
        <FadeIn>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-start lg:gap-24">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Optional Support
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                Website Care & Maintenance
              </h2>
            </div>
            <div>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Post-launch support can be arranged based on the website and the
                level of ongoing assistance required.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {maintenanceScope.map((item) => (
                  <li
                    key={item}
                    className="border-t border-border pt-3 text-sm text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact?service=website-redesign"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent"
              >
                Discuss Support
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
