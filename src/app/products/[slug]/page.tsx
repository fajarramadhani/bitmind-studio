import { notFound } from "next/navigation"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { getProductBySlug, getPublishedProducts } from "@/lib/content"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import Image from "next/image"
import { ProjectGallery } from "@/components/ui/ProjectGallery"

type ProductPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params
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
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
            {product.coverImage ?? product.thumbnail ? (
              <Image
                src={product.coverImage ?? product.thumbnail ?? ""}
                alt={product.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : null}
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Badge variant="accent">{product.category}</Badge>
              <Badge
                variant={product.status === "available" ? "default" : "outline"}
              >
                {product.status}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {product.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {product.shortDescription}
            </p>
            {product.description ? (
              <p className="leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            ) : null}
            {product.demoUrl ? (
              <a
                href={product.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-accent hover:underline"
              >
                View Demo ↗
              </a>
            ) : null}
            <div className="pt-4">
              <Button
                href={product.status === "available" ? product.purchaseUrl : undefined}
                target={product.purchaseUrl ? "_blank" : undefined}
                rel={product.purchaseUrl ? "noopener noreferrer" : undefined}
                size="lg"
                disabled={product.status !== "available" || !product.purchaseUrl}
              >
                {product.status === "available"
                  ? "Buy Now"
                  : product.status === "coming-soon"
                    ? "Coming Soon"
                    : "Unavailable"}
              </Button>
            </div>
          </div>
        </div>
        {product.gallery?.length ? (
          <ProjectGallery items={product.gallery} className="mt-16" />
        ) : null}
      </Container>
    </Section>
  )
}

export async function generateStaticParams() {
  return (await getPublishedProducts()).map((product) => ({ slug: product.slug }))
}
