import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn"

const capabilities = [
  {
    num: "01",
    title: "Website Design & Development",
    description:
      "Company profiles, landing pages, website redesigns, and responsive corporate websites designed for credibility and performance.",
    href: "/services#website-design-development",
  },
  {
    num: "02",
    title: "UI/UX Design",
    description:
      "User interface and experience design, interactive wireframes, clickable prototypes, and unified digital design systems.",
    href: "/services#ui-ux-design",
  },
  {
    num: "03",
    title: "Digital Experiences",
    description:
      "Interactive microsites, event websites, campaign pages, and immersive visual storytelling experiences that move people.",
    href: "/services#digital-experiences",
  },
  {
    num: "04",
    title: "Business Systems",
    description:
      "Custom internal dashboards, tailor-made CMS admin panels, operational tools, and business workflow systems.",
    href: "/services#business-systems",
  },
  {
    num: "05",
    title: "Custom Digital Products",
    description:
      "End-to-end design and development of digital products, scalable web applications, and functional MVPs for modern brands.",
    href: "/services#custom-digital-products",
  },
]

export function ServicesSection() {
  return (
    <Section className="border-t border-border bg-surface py-20 md:py-24 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.8fr] lg:gap-20">
          <FadeIn>
            <div className="flex flex-col gap-8">
              <SectionHeading
                eyebrow="What We Do"
                title="Capabilities tailored to modern business needs."
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
            {capabilities.map((cap) => (
              <StaggerItem key={cap.num}>
                <Link
                  href={cap.href}
                  className="group flex flex-col gap-6 border-b border-border py-8 transition-colors first:pt-0 hover:border-accent md:flex-row md:items-baseline md:gap-12"
                >
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-accent md:w-10">
                    {cap.num}
                  </span>
                  <div className="flex flex-1 flex-col gap-3">
                    <h3 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
                      {cap.title}
                    </h3>
                    <p className="max-w-xl text-[clamp(0.95rem,1.2vw,1.1rem)] leading-relaxed text-muted-foreground">
                      {cap.description}
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
