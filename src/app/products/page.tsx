import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"
import { ProductCard } from "@/components/ui/ProductCard"
import { getPublishedProducts } from "@/lib/content"

export const metadata = {
  title: "Products",
}

export default async function ProductsPage() {
  const products = await getPublishedProducts()
  return (
    <Section>
      <Container>
        <SectionHeading
          level="h1"
          eyebrow="Our Shop"
          title="Digital Products"
          description="High-quality tools and resources for digital professionals."
          className="mb-12 md:mb-16"
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
