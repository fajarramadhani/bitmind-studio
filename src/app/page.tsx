import { HeroSection } from "@/components/sections/HeroSection"
import { SelectedWorkSection } from "@/components/sections/SelectedWorkSection"
import { ServicesSection } from "@/components/sections/ServicesSection"
import { FeaturedProductSection } from "@/components/sections/FeaturedProductSection"
import { ProductsSection } from "@/components/sections/ProductsSection"
import { ProcessSection } from "@/components/sections/ProcessSection"
import { AboutSection } from "@/components/sections/AboutSection"
import { FinalCTASection } from "@/components/sections/FinalCTASection"
import {
  getFeaturedProducts,
  getPublishedProjects,
} from "@/lib/content"
import { getPublicPortfolioProjects } from "@/lib/project-portfolio"

export const dynamic = "force-dynamic"

export default async function Home() {
  const [projects, featuredProducts] = await Promise.all([
    getPublishedProjects(),
    getFeaturedProducts(),
  ])

  // Only verified projects may appear as homepage proof. With the current
  // inventory this intentionally renders the curated empty state instead of
  // elevating excluded or unconfirmed records.
  const verifiedProjects = getPublicPortfolioProjects(projects)

  return (
    <>
      <HeroSection project={null} />
      <SelectedWorkSection projects={verifiedProjects} />
      <ServicesSection />
      <FeaturedProductSection />
      <ProductsSection products={featuredProducts} />
      <ProcessSection />
      <AboutSection />
      <FinalCTASection />
    </>
  )
}
