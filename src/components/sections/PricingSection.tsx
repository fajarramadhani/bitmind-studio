"use client"

import { Check } from "lucide-react"
import Link from "next/link"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"
import { Button } from "@/components/ui/Button"
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn"

type PricingPackage = {
  name: string
  price: string
  description: string
  features: string[]
  isPopular?: boolean
}

type AddOn = {
  name: string
  price: string
}

const packages: PricingPackage[] = [
  {
    name: "LANDING PAGE",
    price: "Rp1.500.000+",
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
  },
  {
    name: "BUSINESS WEBSITE",
    price: "Rp3.500.000+",
    description:
      "Untuk UMKM, bisnis, jasa, dan company profile yang membutuhkan website profesional.",
    features: [
      "Hingga 5 halaman",
      "Responsive design",
      "Custom UI/UX",
      "Contact / WhatsApp integration",
      "Basic SEO",
      "Deployment",
      "Revisi hingga 3x",
    ],
    isPopular: true,
  },
  {
    name: "PROFESSIONAL WEBSITE",
    price: "Rp6.500.000+",
    description:
      "Untuk brand atau perusahaan yang membutuhkan website lebih lengkap dan fleksibel.",
    features: [
      "Hingga 10 halaman",
      "Custom UI/UX",
      "CMS / content management",
      "Form & integrations",
      "SEO structure",
      "Analytics",
      "Deployment",
      "Revisi hingga 4x",
    ],
  },
  {
    name: "CUSTOM WEB APP",
    price: "Mulai Rp10.000.000",
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
  },
]

const addOns: AddOn[] = [
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
            title="Simple pricing. Built around your needs."
            description="From focused landing pages to custom digital products, choose a starting point and let's build from there."
            className="mb-12 md:mb-16"
          />
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Stagger className="contents">
            {packages.map((pkg, index) => (
              <StaggerItem key={pkg.name}>
<div
                  className={[
                    "flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/40",
                    pkg.isPopular &&
                      "border-2 border-accent/70 bg-surface hover:border-accent",
                  ].join(" ")}
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground/80">
                      {pkg.name}
                    </h3>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-semibold tracking-tight text-foreground">
                        {pkg.price}
                      </span>
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
                        variant={pkg.isPopular ? "primary" : "secondary"}
                        className="w-full"
                      >
                        Start a Project
                      </Button>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <FadeIn delay={0.2}>
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

        <FadeIn delay={0.3}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center">
            <p className="text-muted-foreground">
              Don't see what you're looking for?
            </p>
            <Button href="/contact" variant="ghost">
              Discuss Your Project
            </Button>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}