import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"
import { ProductCard } from "@/components/ui/ProductCard"
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn"
import type { Product } from "@/types"

export function ProductsSection({ products }: { products: Product[] }) {
  const featuredProducts = products.filter((product) => product.featured)

  return (
    <Section className="border-t border-border py-20 md:py-24 lg:py-28">
      <Container>
        <FadeIn>
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between md:gap-8">
            <SectionHeading
              eyebrow="Products"
              title="Digital products and experiences built by BITMIND."
              description="A focused collection of BITMIND-owned and productized offerings."
            />
            <Link
              href="/products"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-foreground"
            >
              Explore Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>

        {featuredProducts.length > 0 ? (
          <Stagger className="mt-12 grid gap-8 md:grid-cols-2 lg:max-w-4xl">
            {featuredProducts.map((product) => (
              <StaggerItem key={product.slug}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <FadeIn className="mt-12">
            <div className="rounded-[1.75rem] border border-border/70 bg-surface px-6 py-14 md:px-10 md:py-18">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-accent">
                Product Collection
              </p>
              <h3 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-foreground">
                New product releases are being prepared carefully.
              </h3>
              <p className="mt-4 max-w-2xl text-[clamp(1rem,1.2vw,1.1rem)] leading-relaxed text-muted-foreground">
                BITMIND only publishes products that can be presented honestly. More
                productized offerings will appear here once they are ready for public release.
              </p>
            </div>
          </FadeIn>
        )}
      </Container>
    </Section>
  )
}
