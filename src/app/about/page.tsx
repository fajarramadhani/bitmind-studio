import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"

export const metadata = {
  title: "About",
}

export default function AboutPage() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Our Story"
          title="About BITMIND STUDIO"
          description="Web & Digital Product Studio based in Indonesia."
        />
        <div className="mt-12 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          <p className="mb-6">
            BITMIND STUDIO is an independent digital studio focused on designing
            and building high-quality digital experiences and products.
          </p>
          <p>
            We combine technology, strategy, and design thinking to solve complex
            problems and create digital solutions that work for modern businesses.
          </p>
        </div>
      </Container>
    </Section>
  )
}
