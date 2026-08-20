"use client"

import { useFormStatus } from "react-dom"
import { cn } from "@/lib/utils"

type SubmitButtonProps = {
  children: React.ReactNode
  pendingLabel: string
  statusAware?: boolean
  variant?: "primary" | "secondary" | "danger" | "plain"
  className?: string
}

const styles = {
  primary: "admin-button",
  secondary: "admin-button-secondary",
  danger: "inline-flex min-h-11 items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60",
  plain: "inline-flex min-h-9 items-center text-sm font-medium text-muted-foreground transition hover:text-foreground disabled:cursor-not-allowed disabled:opacity-60",
} as const

export function SubmitButton({ children, pendingLabel, statusAware = false, variant = "primary", className }: SubmitButtonProps) {
  const { pending, data } = useFormStatus()
  const publishStatus = statusAware ? data?.get("publish_status") : null
  const activeLabel =
    publishStatus === "published"
      ? "Publishing..."
      : publishStatus === "archived"
        ? "Archiving..."
        : pendingLabel

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={cn(styles[variant], pending && "cursor-not-allowed", className)}
    >
      {pending ? activeLabel : children}
    </button>
  )
}
