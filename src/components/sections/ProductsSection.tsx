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
              title="Digital Products"
              description="Tools, templates, and products built by BITMIND."
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

        <Stagger className="mt-12 grid gap-8 md:grid-cols-2 lg:max-w-4xl">
          {featuredProducts.map((product) => (
            <StaggerItem key={product.slug}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
