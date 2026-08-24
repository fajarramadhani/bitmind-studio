import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"

type BrowserFrameProps = {
  children: React.ReactNode
  url?: string
  className?: string
  title?: string
}

export function BrowserFrame({
  children,
  url = new URL(siteConfig.url).hostname,
  className,
  title,
}: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "relative min-w-0 overflow-hidden rounded-[1.5rem] border border-border/70 bg-surface shadow-[0_18px_60px_rgba(17,17,17,0.08)]",
        className
      )}
    >
      {/* Header bar */}
      <div className="flex h-11 items-center gap-2 border-b border-border/80 bg-surface-soft/80 px-4 select-none backdrop-blur-sm">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-border" />
          <span className="h-3 w-3 rounded-full bg-border" />
          <span className="h-3 w-3 rounded-full bg-border" />
        </div>
        <div className="mx-2 min-w-0 flex-1 truncate rounded-full border border-border/60 bg-background px-3 py-1 text-center text-[0.7rem] text-muted-foreground sm:mx-4 sm:px-4">
          {url}
        </div>
        {title && (
          <div className="hidden text-xs text-muted-foreground md:block">
            {title}
          </div>
        )}
      </div>

      {/* Screen container */}
      <div className="relative w-full bg-background">{children}</div>
    </div>
  )
}

type DeviceFrameProps = {
  children: React.ReactNode
  className?: string
}

export function DeviceFrame({ children, className }: DeviceFrameProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[260px] overflow-hidden rounded-[28px] border-[3px] border-border bg-surface shadow-[0_18px_50px_rgba(17,17,17,0.12)]",
        className
      )}
    >
      <div className="flex h-6 items-center justify-center bg-surface-dark">
        <span className="h-1.5 w-12 rounded-full bg-background/30" />
      </div>
      <div className="relative aspect-[9/19] w-full bg-background">
        {children}
      </div>
    </div>
  )
}
