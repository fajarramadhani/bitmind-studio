import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"
import { Button } from "@/components/ui/Button"
import { BrowserFrame, DeviceFrame } from "@/components/ui/BrowserFrame"
import { ProductCard } from "@/components/ui/ProductCard"
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn"
import { getPublishedProducts } from "@/lib/content"
import {
  getProductHref,
  getProductStatusView,
  MOMENTS_PRODUCT_SLUG,
} from "@/lib/product-presentation"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Products",
  description: "Digital products and experiences built by BITMIND.",
}

const momentsCategories = [
  "Wedding",
  "Birthday",
  "Engagement",
  "Anniversary",
  "Graduation",
  "Farewell",
  "Celebration / Event",
] as const

const philosophyPoints = [
  {
    title: "Built from recurring needs",
    description:
      "We productize ideas that appear repeatedly across client work, internal experiments, and meaningful user needs.",
  },
  {
    title: "Designed with editorial clarity",
    description:
      "Every BITMIND product is positioned to feel intentional, understandable, and commercially credible before it scales.",
  },
  {
    title: "Shaped honestly",
    description:
      "We present what exists today, what is being refined, and what is still ahead without pretending unfinished systems are already live.",
  },
] as const

export default async function ProductsPage() {
  const products = await getPublishedProducts()
  const moments = products.find((product) => product.slug === MOMENTS_PRODUCT_SLUG)
  const momentsStatus = moments ? getProductStatusView(moments) : null

  return (
    <>
      <Section className="pt-12 md:pt-20 lg:pt-24">
        <Container>
          <div className="grid gap-12 xl:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] xl:items-end">
            <FadeIn>
              <div className="flex max-w-4xl flex-col gap-6">
                <p className="text-sm font-medium uppercase tracking-wider text-accent">
                  Products
                </p>
                <h1 className="text-[clamp(2.5rem,5.7vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-foreground">
                  Digital products and experiences built by BITMIND.
                </h1>
                <p className="max-w-2xl text-[clamp(1.05rem,1.45vw,1.25rem)] leading-relaxed text-muted-foreground">
                  We turn recurring problems, product ideas, and meaningful moments
                  into carefully designed digital products.
                </p>
                <div className="flex flex-col gap-3 min-[390px]:flex-row min-[390px]:flex-wrap">
                  <Button href={moments ? getProductHref(moments) : "/moments"} size="lg">
                    Explore BITMIND Moments
                  </Button>
                  <Button href="/contact" variant="secondary" size="lg">
                    Talk to BITMIND
                  </Button>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.12} y={28}>
              <div className="grid gap-4 rounded-[1.75rem] border border-border/70 bg-surface p-5 md:grid-cols-2 md:p-6">
                {products.map((product) => {
                  const status = getProductStatusView(product)
                  return (
                    <div
                      key={product.slug}
                      className="rounded-[1.35rem] border border-border/80 bg-background/70 p-4"
                    >
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent">
                        {product.category}
                      </p>
                      <h2 className="mt-3 text-xl font-semibold leading-tight tracking-[-0.02em] text-foreground">
                        {product.title}
                      </h2>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
                        {product.shortDescription}
                      </p>
                      <p className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {status.label}
                      </p>
                    </div>
                  )
                })}
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {moments ? (
        <Section className="border-t border-white/10 bg-surface-dark py-20 text-white md:py-24 lg:py-28">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-16">
              <FadeIn>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      Featured Product
                    </span>
                    {momentsStatus ? (
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                        {momentsStatus.label}
                      </span>
                    ) : null}
                  </div>

                  <h2 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-white">
                    BITMIND Moments
                  </h2>

                  <p className="text-[clamp(1.05rem,1.45vw,1.25rem)] leading-relaxed text-white/80">
                    Digital experiences for life&apos;s meaningful moments. Designed for
                    weddings, birthdays, anniversaries, and celebrations that deserve
                    more than a generic template.
                  </p>

                  <div className="flex flex-col gap-4 border-y border-white/10 py-6">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                      Experience Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {momentsCategories.map((category) => (
                        <span
                          key={category}
                          className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/85"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
                    BITMIND Moments is currently presented as a guided, done-for-you
                    product experience. The platform vision is expanding, but the
                    public flow today stays grounded in what BITMIND can honestly
                    deliver.
                  </p>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      href={getProductHref(moments)}
                      size="lg"
                      className="bg-white text-black hover:bg-white/90"
                    >
                      Explore BITMIND Moments
                    </Button>
                    <Button
                      href="/contact"
                      variant="ghost"
                      size="lg"
                      className="text-white hover:bg-white/10"
                    >
                      Request an Experience
                    </Button>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.18} y={32}>
                <div className="relative mx-auto w-full max-w-4xl">
                  <BrowserFrame
                    url="moments.bitmind-studio.com"
                    className="border-white/15 bg-white/[0.03]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#F7F8FB] p-5 sm:p-8">
                      <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-[#D9DEEB] bg-white/90 p-5 shadow-sm sm:p-8">
                        <div className="max-w-md">
                          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent">
                            BITMIND Moments
                          </p>
                          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                            A special way to share a meaningful day.
                          </h3>
                          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                            A privacy-safe preview for beautifully presented event
                            stories, details, and invitations.
                          </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-3">
                          <div className="rounded-2xl bg-[#EEF2FF] p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                              Story
                            </p>
                            <p className="mt-2 text-sm text-foreground">
                              Personal narrative and opening moments.
                            </p>
                          </div>
                          <div className="rounded-2xl bg-[#F5F7FB] p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                              Details
                            </p>
                            <p className="mt-2 text-sm text-foreground">
                              Event schedule, location, and shareable information.
                            </p>
                          </div>
                          <div className="rounded-2xl bg-[#EEF2FF] p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                              Memories
                            </p>
                            <p className="mt-2 text-sm text-foreground">
                              Photo-led storytelling with a calmer mobile rhythm.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </BrowserFrame>

                  <div className="absolute -bottom-10 right-4 hidden w-36 md:block xl:w-40">
                    <DeviceFrame className="border-2 border-white/20 bg-white/[0.03] shadow-2xl">
                      <div className="flex h-full flex-col bg-surface p-4 text-center">
                        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent">
                          A Special Day
                        </span>
                        <span className="mt-4 text-xl font-semibold tracking-tight text-foreground">
                          Nadine&apos;s 25th
                        </span>
                        <span className="mt-2 text-xs text-muted-foreground">
                          12 December 2026
                        </span>
                        <div className="mt-6 flex-1 rounded-2xl bg-[#EEF2FF]" />
                        <div className="mt-4 space-y-2 text-left">
                          <div className="h-2 rounded-full bg-border" />
                          <div className="h-2 w-3/4 rounded-full bg-border" />
                        </div>
                      </div>
                    </DeviceFrame>
                  </div>
                </div>
              </FadeIn>
            </div>
          </Container>
        </Section>
      ) : null}

      <Section className="border-t border-border py-20 md:py-24 lg:py-28">
        <Container>
          <FadeIn>
            <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between md:gap-8">
              <SectionHeading
                eyebrow="Product Collection"
                title="A focused product portfolio, not a filler catalog."
                description="Every product shown here reflects something BITMIND owns, is shaping, or is positioning with intention."
              />
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                We are intentionally showing only the products that are publicly
                credible right now.
              </p>
            </div>
          </FadeIn>

          <Stagger className="mt-12 grid gap-8 md:grid-cols-2 lg:max-w-5xl">
            {products.map((product) => (
              <StaggerItem key={product.slug}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section className="border-t border-border bg-surface py-20 md:py-24 lg:py-28">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Why We Build"
              title="Products that grow from real patterns, not from filler ideas."
              description="BITMIND products are shaped by recurring needs, careful positioning, and a realistic view of what is ready now versus what is still being refined."
            />
          </FadeIn>

          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {philosophyPoints.map((point) => (
              <StaggerItem
                key={point.title}
                className="rounded-[1.5rem] border border-border/70 bg-background px-6 py-7"
              >
                <h3 className="text-[clamp(1.2rem,1.6vw,1.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground">
                  {point.title}
                </h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-muted-foreground">
                  {point.description}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section className="border-t border-border py-20 md:py-24 lg:py-28">
        <Container>
          <FadeIn>
            <div className="grid gap-8 rounded-[1.75rem] border border-border bg-foreground px-6 py-10 text-white md:px-10 md:py-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-end lg:px-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Custom Solution Bridge
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                  Need something more tailored than the current product lineup?
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
                  BITMIND can also shape custom digital solutions when your need is
                  more specific than a productized offering — from business systems
                  to product-led brand experiences.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
                <Button
                  href="/contact"
                  size="lg"
                  className="bg-white text-black hover:bg-white/90"
                >
                  Start a Conversation
                </Button>
                <a
                  href="/services"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-white/85 transition-colors hover:text-white"
                >
                  Explore Services
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  )
}