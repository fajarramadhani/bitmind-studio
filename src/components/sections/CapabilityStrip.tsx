import { Container } from "@/components/layout/Container"

export function CapabilityStrip() {
  const capabilities = [
    "Web Design",
    "Development",
    "UI/UX Design",
    "Digital Products",
  ]

  return (
    <div className="border-b border-border bg-surface py-4">
      <Container>
        <div className="w-full overflow-x-auto">
          <div className="flex min-w-max items-center gap-6 md:min-w-0 md:justify-between md:gap-10">
            {capabilities.map((capability, i) => (
              <div
                key={capability}
                className="flex shrink-0 items-center gap-6 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
              >
                <span>{capability}</span>
                {i < capabilities.length - 1 && (
                  <span className="text-border" aria-hidden="true">
                    /
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
