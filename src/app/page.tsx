import { HeroSection } from "@/components/sections/HeroSection"
import { CapabilityStrip } from "@/components/sections/CapabilityStrip"
import { SelectedWorkSection } from "@/components/sections/SelectedWorkSection"
import { ServicesSection } from "@/components/sections/ServicesSection"
import { FeaturedCaseStudy } from "@/components/sections/FeaturedCaseStudy"
import { ProductsSection } from "@/components/sections/ProductsSection"
import { WhyBitmindSection } from "@/components/sections/WhyBitmindSection"
import { ProcessSection } from "@/components/sections/ProcessSection"
import { AboutSection } from "@/components/sections/AboutSection"
import { FinalCTASection } from "@/components/sections/FinalCTASection"
import {
  getFeaturedProducts,
  getFeaturedProjects,
  getPublishedProjects,
} from "@/lib/content"

export default async function Home() {
  const [projects, featuredProjects, featuredProducts] = await Promise.all([
    getPublishedProjects(),
    getFeaturedProjects(),
    getFeaturedProducts(),
  ])
  const featuredCaseStudy = featuredProjects[0] ?? projects[0] ?? null

  return (
    <>
      <HeroSection project={featuredCaseStudy} />
      <CapabilityStrip />
      <SelectedWorkSection projects={projects} />
      <ServicesSection />
      <FeaturedCaseStudy project={featuredCaseStudy} />
      <ProductsSection products={featuredProducts} />
      <WhyBitmindSection />
      <ProcessSection />
      <AboutSection />
      <FinalCTASection />
    </>
  )
}
