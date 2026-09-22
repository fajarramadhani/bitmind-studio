"use client"

import { Check } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"
import { Button } from "@/components/ui/Button"
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn"

type PricingPackage = {
  name: string
  normalPrice: string
  promoPrice: string
  discount: string
  description: string
  features: string[]
  cta: string
  isEmphasized?: boolean
}

const packages: PricingPackage[] = [
  {
    name: "LANDING PAGE",
    normalPrice: "Rp2.000.000",
    promoPrice: "Rp1.500.000",
    discount: "SAVE 25%",
    description:
      "Untuk personal brand, campaign, product launch, dan kebutuhan one-page website.",
    features: [
      "1 halaman",
      "Responsive mobile & desktop",
      "Custom UI design",
      "CTA / WhatsApp integration",
      "Basic SEO",
      "Deployment",
      "Revisi hingga 2x",
    ],
    cta: "Start a Project",
    isEmphasized: false,
  },
  {
    name: "BUSINESS WEBSITE",
    normalPrice: "Rp4.500.000",
    promoPrice: "Rp3.500.000",
    discount: "SAVE 22%",
    description:
      "Untuk UMKM, bisnis, jasa, dan company profile yang membutuhkan website profesional.",
    features: [
      "Jusquah 5 halaman",
      "Responsive design",
      "Custom UI/UX",
      "Contact / WhatsApp integration",
      "Basic SEO",
      "Deployment",
      "Revisi hingga 3x",
    ],
    cta: "Start a Project",
    isEmphasized: true,
  },
  {
    name: "PROFESSIONAL WEBSITE",
    normalPrice: "Rp8.000.000",
    promoPrice: "Rp6.500.000",
    discount: "SAVE 19%",
    description:
      "Untuk brand atau perusahaan yang membutuhkan website lebih lengkap dan fleksibel.",
    features: [
      "Jusquah 10 halaman",
      "Custom UI/UX",
      "CMS / content management",
      "Form & integrations",
      "SEO structure",
      "Analytics",
      "Deployment",
      "Revisi hingga 4x",
    ],
    cta: "Start a Project",
    isEmphasized: false,
  },
  {
    name: "CUSTOM WEB APP",
    normalPrice: "Rp12.500.000",
    promoPrice: "Mulai Rp10.000.000",
    discount: "SAVE 20%",
    description:
      "Untuk kebutuhan digital yang membutuhkan fitur, workflow, dan sistem yang dibuat secara custom.",
    features: [
      "Custom feature & workflow",
      "Authentication",
      "Dashboard",
      "Database",
      "API / third-party integration",
      "Admin panel",
      "Deployment",
      "Harga berdasarkan scope",
    ],
    cta: "Discuss Your Project",
    isEmphasized: false,
  },
]

const addOns = [
  { name: "Additional page", price: "Mulai Rp300.000" },
  { name: "Copywriting", price: "Mulai Rp500.000" },
  { name: "UI/UX Design only", price: "Mulai Rp1.000.000" },
  { name: "CMS", price: "Mulai Rp1.000.000" },
  { name: "Maintenance", price: "Mulai Rp500.000/bulan" },
  { name: "Basic SEO", price: "Mulai Rp750.000" },
  { name: "Domain & hosting", price: "Sesuai kebutuhan" },
  { name: "Custom feature", price: "By quotation" },
]

export function PricingSection() {
  return (
    <Section
      id="pricing"
      className="border-t border-border bg-surface py-20 md:py-24 lg:py-28"
    >
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Pricing"
            title="Build your website. Start with the right package."
            description="Transparent starting prices for websites designed to look good, work well, and grow with your business."
            className="mb-12 md:mb-16"
          />
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Stagger className="contents">
            {packages.map((pkg) => (
              <StaggerItem key={pkg.name}>
                <div
                  className={[
                    "flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-all",
                    pkg.isEmphasized &&
                      "border-accent/70 shadow-[0_8px_32px_-12px_rgba(0,101,255,0.35)] hover:border-accent",
                    !pkg.isEmphasized && "hover:border-accent/40",
                  ].join(" ")}
                >
                  <div className="flex flex-col gap-4">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground/80">
                      {pkg.name}
                    </h3>

                    {pkg.discount && (
                      <div className="inline-flex w-fit items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                        {pkg.discount}
                      </div>
                    )}

                    <div className="flex flex-col gap-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-medium tracking-tight text-muted-foreground/60 line-through">
                          {pkg.normalPrice}
                        </span>
                      </div>
                      <div className="flex items-end gap-2">
                        <span className="text-[2.5rem] font-semibold tracking-tight text-foreground leading-none">
                          {pkg.promoPrice}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {pkg.description}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-1 flex-col">
                    <div className="flex-1">
                      <ul className="space-y-3">
                        {pkg.features.map((feature) => (
                          <li key={feature} className="flex gap-3">
                            <Check className="h-5 w-5 shrink-0 text-accent" />
                            <span className="text-sm leading-relaxed text-muted-foreground">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8">
                      <Button
                        href="/contact"
                        size="lg"
                        variant={pkg.isEmphasized ? "primary" : "secondary"}
                        className="w-full"
                      >
                        {pkg.cta}
                      </Button>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <FadeIn delay={0.15}>
          <div className="mt-16 border-t border-border pt-12">
            <h3 className="mb-6 text-center text-lg font-semibold tracking-tight text-foreground">
              Add-ons
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Stagger>
                {addOns.map((addOn) => (
                  <StaggerItem key={addOn.name}>
                    <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-muted/30 px-4 py-3 transition-colors hover:border-accent/40 hover:bg-muted/50">
                      <span className="text-sm leading-relaxed text-foreground">
                        {addOn.name}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">
                        {addOn.price}
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Prices shown are starting prices. Final pricing depends on project
              scope, features, and requirements.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center">
            <p className="text-lg font-medium text-foreground">
              Have something different in mind?
            </p>
            <p className="text-muted-foreground">
              Let's discuss what you're building.
            </p>
            <Button href="/contact" variant="ghost" size="lg">
              Discuss Your Project
            </Button>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}