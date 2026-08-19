import Link from "next/link"
import { ContactHero } from "@/components/sections/ContactHero"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { FadeIn } from "@/components/shared/FadeIn"
import { siteConfig } from "@/config/site"

export const metadata = {
  title: "Start a Project",
  description: "Tell BITMIND STUDIO about your website or digital product project.",
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <Section className="border-t border-border bg-surface py-12 md:py-24">
        <Container>
          <FadeIn>
            <div className="flex flex-col items-center text-center gap-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                Want more context first?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Review our work and services before deciding which direction fits
                your project.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/work"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border bg-surface px-7 py-3 text-base font-medium text-foreground transition-colors hover:border-accent/30 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  View Our Work
                </Link>
                {siteConfig.whatsapp ? (
                  <a
                    href={siteConfig.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-7 py-3 text-base font-medium text-accent-foreground transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    Chat with BITMIND →
                  </a>
                ) : null}
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  )
}
