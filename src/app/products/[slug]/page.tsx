import Image from "next/image"
import { notFound, redirect } from "next/navigation"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { ProjectGallery } from "@/components/ui/ProjectGallery"
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn"
import { getProductBySlug } from "@/lib/content"
import {
  getProductDetailCopy,
  getProductHref,
  getProductStatusView,
  isMomentsProductSlug,
} from "@/lib/product-presentation"

type ProductPageProps = {
  params: Promise<{ slug: string }>
}

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params

  if (isMomentsProductSlug(slug)) {
    return {
      title: "BITMIND Moments",
      description:
        "Digital experiences for life's meaningful moments, presented as a guided BITMIND offering.",
    }
  }

  const product = await getProductBySlug(slug)
  if (!product) return {}

  return {
    title: product.title,
    description: product.shortDescription,
    openGraph: {
      title: `${product.title} — BITMIND STUDIO`,
      description: product.shortDescription,
      images: product.coverImage
        ? [{ url: product.coverImage, alt: product.title }]
        : undefined,
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params

  if (isMomentsProductSlug(slug)) {
    redirect("/moments")
  }

  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const status = getProductStatusView(product)
  const detail = getProductDetailCopy(product)
  const previewImage = product.coverImage ?? product.thumbnail

  return (
    <>
      <Section className="pt-12 md:pt-20 lg:pt-24">
        <Container>
          <div className="grid gap-12 xl:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] xl:items-center">
            <FadeIn>
              <div className="flex max-w-3xl flex-col gap-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="accent">{product.category}</Badge>
                  <Badge variant={status.badgeVariant}>{status.label}</Badge>
                </div>
                <h1 className="text-4xl font-semibold leading-[1.02] tracking-tight text-foreground md:text-5xl lg:text-6xl">
                  {product.title}
                </h1>
                <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                  {product.shortDescription}
                </p>
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  {detail.overview}
                </p>
                <div className="flex flex-col gap-3 min-[390px]:flex-row min-[390px]:flex-wrap">
                  <Button href={detail.primaryCta.href} size="lg">
                    {detail.primaryCta.label}
                  </Button>
                  {detail.secondaryCta ? (
                    <Button href={detail.secondaryCta.href} variant="secondary" size="lg">
                      {detail.secondaryCta.label}
                    </Button>
                  ) : null}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.12} y={28}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-border bg-muted">
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt={product.title}
                    fill
                    sizes="(max-width: 1280px) 100vw, 42vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col justify-between bg-background/50 p-6 sm:p-8">
                    <div>
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent">
                        {product.category}
                      </p>
                      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        {product.title}
                      </h2>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <span className="h-24 rounded-xl bg-brand-primary-soft" />
                      <span className="h-24 rounded-xl bg-muted" />
                      <span className="h-24 rounded-xl bg-muted" />
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border py-20 md:py-24 lg:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <FadeIn>
              <div className="rounded-[1.5rem] border border-border bg-surface p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Who It&apos;s For
                </p>
                <div className="mt-5 space-y-4">
                  {detail.whoItsFor.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                      <p className="text-sm leading-relaxed text-foreground md:text-[0.95rem]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="rounded-[1.5rem] border border-border bg-surface p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Core Value
                </p>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {detail.coreValue}
                </p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-surface py-20 md:py-24 lg:py-28">
        <Container>
          <FadeIn>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Key Capabilities
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Product direction shaped around practical value.
              </h2>
            </div>
          </FadeIn>

          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {detail.capabilities.map((capability) => (
              <StaggerItem
                key={capability}
                className="rounded-[1.25rem] border border-border bg-background p-6"
              >
                <p className="text-sm leading-relaxed text-foreground md:text-[0.95rem]">
                  {capability}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section className="border-t border-border py-20 md:py-24 lg:py-28">
        <Container>
          <div className="grid gap-8 rounded-[1.75rem] border border-border bg-foreground px-6 py-10 text-white md:px-10 md:py-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-end lg:px-12">
            <FadeIn>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Current Status
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                  {status.label}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
                  {detail.statusNote}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
                <Button
                  href={detail.primaryCta.href}
                  size="lg"
                  className="bg-white text-black hover:bg-white/90"
                >
                  {detail.primaryCta.label}
                </Button>
                <Button
                  href="/products"
                  variant="ghost"
                  size="lg"
                  className="text-white hover:bg-white/10"
                >
                  Browse Products
                </Button>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {product.gallery?.length ? (
        <Section className="border-t border-border py-20 md:py-24 lg:py-28">
          <Container>
            <FadeIn>
              <div className="mb-12 max-w-3xl md:mb-16">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Product Media
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  Supporting visuals and media.
                </h2>
              </div>
            </FadeIn>
            <ProjectGallery items={product.gallery} />
          </Container>
        </Section>
      ) : null}

      <Section className="border-t border-border py-20 md:py-24 lg:py-28">
        <Container>
          <FadeIn>
            <div className="rounded-[1.75rem] border border-border bg-surface px-6 py-10 md:px-10 md:py-12 lg:px-12">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    Next Step
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                    Interested in where this product is heading?
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                    We can share the current direction, discuss the problem space, and
                    explain where the product stands today without overstating what is
                    already live.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
                  <Button href={detail.primaryCta.href} size="lg">
                    {detail.primaryCta.label}
                  </Button>
                  <Button href={getProductHref(product)} variant="ghost" size="lg">
                    Refresh Product View
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  )
}