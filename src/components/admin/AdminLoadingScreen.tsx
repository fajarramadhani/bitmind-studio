import { BrandLogo } from "@/components/brand/BrandLogo"

export function AdminLoadingScreen() {
  return (
    <div
      role="status"
      aria-label="Loading BITMIND CMS"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm transition-opacity"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <BrandLogo iconOnly size="md" />
        <div className="mt-2 flex flex-col gap-1">
          <p className="text-xl font-semibold tracking-tight text-foreground">
            BITMIND <span className="text-brand-primary">STUDIO</span>
          </p>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            CMS
          </p>
        </div>
        <div className="mt-8 flex gap-1.5" aria-hidden="true">
          <div className="h-2 w-2 animate-bounce rounded-full bg-brand-primary [animation-delay:-0.3s]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-brand-primary [animation-delay:-0.15s]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-brand-primary" />
        </div>
        <span className="sr-only">Loading admin content</span>
      </div>
    </div>
  )
}
