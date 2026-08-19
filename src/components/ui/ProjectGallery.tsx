import Image from "next/image"
import { cn } from "@/lib/utils"
import type { ProjectGalleryItem } from "@/types"

type ProjectGalleryProps = {
  items?: ProjectGalleryItem[]
  className?: string
}

export function ProjectGallery({ items, className }: ProjectGalleryProps) {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <div className={cn("flex flex-col gap-12 md:gap-16 lg:gap-24", className)}>
      {items.map((item, index) => {
        // Simple alternating layout logic for demonstration
        const isFullWidth = index % 3 === 0
        const isTwoColumn = index % 3 === 1

        if (isFullWidth) {
          return (
            <figure key={index} className="flex flex-col gap-4">
              <div
                className={cn(
                  "relative w-full overflow-hidden rounded-2xl bg-muted border border-border/50",
                  item.aspect || "aspect-[16/9]"
                )}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className={cn(
                    "object-cover",
                    item.fit === "contain" && "object-contain"
                  )}
                  sizes="(max-width: 768px) 100vw, 1280px"
                />
              </div>
              {item.caption && (
                <figcaption className="text-center text-sm text-muted-foreground mt-2">
                  {item.caption}
                </figcaption>
              )}
            </figure>
          )
        }

        if (isTwoColumn && items[index + 1]) {
          const nextItem = items[index + 1]
          // Render two items next to each other
          return (
            <div
              key={index}
              className="grid gap-6 md:grid-cols-2 lg:gap-12"
            >
              <figure className="flex flex-col gap-4">
                <div
                  className={cn(
                    "relative w-full overflow-hidden rounded-xl bg-muted border border-border/50",
                    item.aspect || "aspect-square"
                  )}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className={cn(
                      "object-cover",
                      item.fit === "contain" && "object-contain"
                    )}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {item.caption && (
                  <figcaption className="text-sm text-muted-foreground mt-2">
                    {item.caption}
                  </figcaption>
                )}
              </figure>

              <figure className="flex flex-col gap-4 mt-8 md:mt-16">
                <div
                  className={cn(
                    "relative w-full overflow-hidden rounded-xl bg-muted border border-border/50",
                    nextItem.aspect || "aspect-[4/3]"
                  )}
                >
                  <Image
                    src={nextItem.src}
                    alt={nextItem.alt}
                    fill
                    className={cn(
                      "object-cover",
                      nextItem.fit === "contain" && "object-contain"
                    )}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {nextItem.caption && (
                  <figcaption className="text-sm text-muted-foreground mt-2">
                    {nextItem.caption}
                  </figcaption>
                )}
              </figure>
            </div>
          )
        }

        // Skip rendering if it was already handled by the two-column block
        if (index % 3 === 2 && items[index - 1]) {
          return null
        }

        // Fallback for single item
        return (
          <figure key={index} className="flex flex-col gap-4 mx-auto w-full max-w-4xl">
            <div
              className={cn(
                "relative w-full overflow-hidden rounded-xl bg-muted border border-border/50",
                item.aspect || "aspect-[4/3]"
              )}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className={cn(
                  "object-cover",
                  item.fit === "contain" && "object-contain"
                )}
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
            {item.caption && (
              <figcaption className="text-center text-sm text-muted-foreground mt-2">
                {item.caption}
              </figcaption>
            )}
          </figure>
        )
      })}
    </div>
  )
}
