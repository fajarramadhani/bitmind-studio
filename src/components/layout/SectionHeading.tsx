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
        <p className="text-sm font-medium uppercase tracking-wider text-accent">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-lg leading-relaxed text-muted-foreground",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
