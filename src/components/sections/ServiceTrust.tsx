import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { FadeIn } from "@/components/shared/FadeIn"

const bridgeItems = [
  {
    eyebrow: "Digital Experiences",
    title: "Looking for a celebration or personal-event experience?",
    description:
      "BITMIND Moments is the guided product direction for weddings, birthdays, anniversaries, and other meaningful occasions that need a more expressive digital presence.",
    href: "/moments",
    cta: "Explore BITMIND Moments",
  },
  {
    eyebrow: "Custom Digital Products",
    title: "Need a clearer view of BITMIND-owned product work?",
    description:
      "Products remain separate from Services. Explore the BITMIND product collection to see what the studio is already shaping, productizing, or positioning directly.",
    href: "/products",
    cta: "Explore BITMIND Products",
  },
] as const

export function ServiceBridgeSection() {
  return (
    <Section className="border-t border-border bg-surface">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2">
          {bridgeItems.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.08}>
              <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-border/70 bg-background px-6 py-8 md:px-7 md:py-9">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent">
                    {item.eyebrow}
                  </p>
                  <h2 className="mt-4 text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-foreground">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-[0.98rem] leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                <Link
                  href={item.href}
                  className="group mt-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
                >
                  {item.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  )
}
