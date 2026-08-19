import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/Badge"
import type { Product } from "@/types"

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 transition-all hover:border-accent/30 hover:shadow-sm"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
        {product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center border border-border/50">
            <span className="text-sm font-medium text-muted-foreground">
              {product.title}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Badge variant="accent">{product.category}</Badge>
          <Badge variant={product.status === "available" ? "default" : "outline"}>
            {product.status}
          </Badge>
        </div>
        <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
          {product.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {product.shortDescription}
        </p>
      </div>
    </Link>
  )
}
