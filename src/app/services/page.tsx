import { ServiceHero } from "@/components/sections/ServiceHero"
import { ServiceList } from "@/components/sections/ServiceList"
import { ServiceIncluded } from "@/components/sections/ServiceIncluded"
import { ServiceTimeline } from "@/components/sections/ServiceTimeline"
import { ServicePricing } from "@/components/sections/ServicePricing"
import { ServiceProcess } from "@/components/sections/ServiceProcess"
import {
  ProjectTypesSection,
  WhyWorkWithBitmind,
} from "@/components/sections/ServiceTrust"
import { RelatedWorkSection } from "@/components/sections/RelatedWorkSection"
import { ServiceMaintenance } from "@/components/sections/ServiceMaintenance"
import { FAQSection } from "@/components/sections/ServiceFAQ"
import { FinalCTASection } from "@/components/sections/FinalCTASection"
import { faqs } from "@/data/faqs"
import { getPublishedProjects } from "@/lib/content"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Services",
  description:
    "Web design, development and digital product services for modern businesses.",
}

export default async function ServicesPage() {
  const projects = await getPublishedProjects()

  return (
    <>
      <ServiceHero />
      <ServiceList />
      <ServiceIncluded />
      <ProjectTypesSection />
      <ServicePricing />
      <ServiceProcess />
      <ServiceTimeline />
      <RelatedWorkSection projects={projects} />
      <WhyWorkWithBitmind />
      <ServiceMaintenance />
      <FAQSection items={faqs} />
      <FinalCTASection />
    </>
  )
}
