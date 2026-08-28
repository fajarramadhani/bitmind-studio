import Link from "next/link"
import { cn } from "@/lib/utils"

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
  children: React.ReactNode
  href?: string
  linkOnClick?: () => void
  target?: React.HTMLAttributeAnchorTarget
  rel?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]"

const variants = {
  primary:
    "bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary-hover hover:shadow-[0_12px_32px_-12px_rgba(0,101,255,0.55)] active:bg-brand-primary-dark",
  secondary:
    "border border-border bg-surface text-foreground hover:bg-muted hover:border-accent/40 active:bg-muted/80",
  ghost: "text-foreground hover:bg-muted active:bg-muted/80",
} as const

const sizes = {
  sm: "min-h-9 px-4 py-2 text-sm",
  default: "min-h-11 px-6 py-2.5 text-sm",
  lg: "min-h-12 px-7 py-3 text-base",
} as const

export function Button({
  variant = "primary",
  size = "default",
  className,
  children,
  href,
  linkOnClick,
  target,
  rel,
  ...props
}: ButtonProps) {
  const classes = cn(baseStyles, variants[variant], sizes[size], className)

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={linkOnClick}
        target={target}
        rel={rel}
      >
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
