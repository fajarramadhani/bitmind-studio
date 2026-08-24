import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
  level?: "h1" | "h2"
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  level = "h2",
}: SectionHeadingProps) {
  const Heading = level
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent",
            align === "center" && "justify-center"
          )}
        >
          {align === "left" ? (
            <span aria-hidden className="h-px w-6 bg-accent/60" />
          ) : null}
          {eyebrow}
        </p>
      ) : null}
      <Heading className="max-w-2xl text-balance text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground">
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-pretty text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed text-muted-foreground",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
