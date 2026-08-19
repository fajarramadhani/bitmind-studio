import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"

type BrandLogoProps = {
  iconOnly?: boolean
  preload?: boolean
  size?: "sm" | "md"
  className?: string
}

const iconSizes = {
  sm: 36,
  md: 42,
} as const

export function BrandLogo({
  iconOnly = false,
  preload = false,
  size = "md",
  className,
}: BrandLogoProps) {
  const iconSize = iconSizes[size]

  return (
    <Link
      href="/"
      aria-label={siteConfig.brand.name}
      className={cn(
        "inline-flex w-fit items-center gap-3 text-foreground transition-opacity hover:opacity-75 focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <Image
        src={siteConfig.brand.logo}
        alt=""
        width={iconSize}
        height={iconSize}
        preload={preload}
        unoptimized
        className="shrink-0 object-contain"
      />
      {!iconOnly ? (
        <span className="flex flex-col">
          <span className="text-base font-semibold leading-none tracking-tight">
            {siteConfig.brand.shortName}
          </span>
          <span className="mt-1 text-[0.65rem] font-semibold leading-none tracking-[0.18em] text-accent">
            STUDIO
          </span>
        </span>
      ) : null}
    </Link>
  )
}
