import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/Badge"
import {
  getProductCardCtaLabel,
  getProductHref,
  getProductStatusView,
} from "@/lib/product-presentation"
import type { Product } from "@/types"

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const status = getProductStatusView(product)
  const href = getProductHref(product)
  const ctaLabel = getProductCardCtaLabel(product)

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border/70 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_28px_60px_-28px_rgba(17,17,17,0.25)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-border/60 bg-surface-soft">
        {product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full flex-col justify-between bg-surface-soft p-6">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent">
              {product.category}
            </span>
            <div className="space-y-2">
              <span className="block text-2xl font-semibold tracking-tight text-foreground">
                {product.title}
              </span>
              <span className="block h-1 w-10 rounded-full bg-border" />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-5 px-5 py-5 md:px-6 md:py-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">{product.category}</Badge>
          <Badge variant={status.badgeVariant}>{status.label}</Badge>
        </div>

        <div className="space-y-3">
          <h3 className="text-[clamp(1.35rem,2vw,1.75rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-foreground transition-colors group-hover:text-accent">
            {product.title}
          </h3>
          <p className="text-[0.95rem] leading-relaxed text-muted-foreground md:text-[1rem]">
            {product.shortDescription}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border/80 pt-4 text-sm font-medium text-foreground">
          <span>{ctaLabel}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
