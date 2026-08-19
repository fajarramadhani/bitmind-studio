import { cn } from "@/lib/utils"

type BadgeProps = {
  children: React.ReactNode
  variant?: "default" | "accent" | "outline"
  className?: string
}

const variants = {
  default: "bg-muted text-muted-foreground",
  accent: "bg-accent/10 text-accent",
  outline: "border border-border text-muted-foreground",
} as const

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
