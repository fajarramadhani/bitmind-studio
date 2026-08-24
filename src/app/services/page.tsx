import { ServiceHero } from "@/components/sections/ServiceHero"
import { ServiceList } from "@/components/sections/ServiceList"
import { ServiceIncluded } from "@/components/sections/ServiceIncluded"
import { ServicePricing } from "@/components/sections/ServicePricing"
import { ServiceProcess } from "@/components/sections/ServiceProcess"
import { ServiceBridgeSection } from "@/components/sections/ServiceTrust"
import { FAQSection } from "@/components/sections/ServiceFAQ"
import { FinalCTASection } from "@/components/sections/FinalCTASection"
import { faqs } from "@/data/faqs"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Services",
  description:
    "Digital solutions across websites, interfaces, digital experiences, business systems, and custom digital products.",
}

export default function ServicesPage() {
  return (
    <>
      <ServiceHero />
      <ServiceList />
      <ServiceIncluded />
      <ServicePricing />
      <ServiceProcess />
      <ServiceBridgeSection />
      <FAQSection items={faqs} />
      <FinalCTASection />
    </>
  )
}
