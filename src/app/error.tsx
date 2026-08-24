"use client"

import { Container } from "@/components/layout/Container"
import { Button } from "@/components/ui/Button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section className="flex min-h-[calc(100svh-72px)] items-center border-b border-border bg-background">
      <Container>
        <div className="flex flex-col items-start gap-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Something went wrong
          </p>

          <h1 className="text-[clamp(2.6rem,8.7vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-foreground sm:text-[clamp(3.4rem,7vw,5rem)]">
            <span className="block">Unexpected</span>
            <span className="block text-muted-foreground">error.</span>
          </h1>

          <p className="max-w-md text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            An error occurred while loading this page. Please try again or
            return to the homepage.
          </p>

          {process.env.NODE_ENV === "development" && error?.message && (
            <pre className="max-w-lg overflow-x-auto rounded-lg border border-border bg-surface p-4 text-sm text-muted-foreground">
              {error.message}
            </pre>
          )}

          <div className="flex flex-col gap-3 min-[390px]:flex-row min-[390px]:flex-wrap">
            <Button
              onClick={reset}
              size="lg"
              className="w-full min-[390px]:w-auto"
            >
              Try Again
            </Button>
            <Button
              href="/"
              variant="secondary"
              size="lg"
              className="w-full min-[390px]:w-auto"
            >
              Back to Home
            </Button>
            <Button
              href="/contact"
              variant="ghost"
              size="lg"
              className="w-full min-[390px]:w-auto"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
