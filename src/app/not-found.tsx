import { Container } from "@/components/layout/Container"
import { Button } from "@/components/ui/Button"

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100svh-72px)] items-center border-b border-border bg-background">
      <Container>
        <div className="flex flex-col items-start gap-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Error 404
          </p>

          <h1 className="text-[clamp(2.6rem,8.7vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-foreground sm:text-[clamp(3.4rem,7vw,5rem)]">
            <span className="block">Page not</span>
            <span className="block text-muted-foreground">found.</span>
          </h1>

          <p className="max-w-md text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>

          <div className="flex flex-col gap-3 min-[390px]:flex-row min-[390px]:flex-wrap">
            <Button href="/" size="lg" className="w-full min-[390px]:w-auto">
              Back to Home
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              size="lg"
              className="w-full min-[390px]:w-auto"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
