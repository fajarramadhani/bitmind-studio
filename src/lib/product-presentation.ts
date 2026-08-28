import type { Product } from "@/types"

export const MOMENTS_PRODUCT_SLUG = "bitmind-moments"
export const MONEARA_PRODUCT_SLUG = "moneara"

type BadgeVariant = "default" | "accent" | "outline"

type ProductStatusView = {
  label: string
  badgeVariant: BadgeVariant
  detail: string
}

type ProductDetailCopy = {
  overview: string
  whoItsFor: string[]
  coreValue: string
  capabilities: string[]
  statusNote: string
  primaryCta: {
    label: string
    href: string
  }
  secondaryCta?: {
    label: string
    href: string
  }
}

export function isMomentsProductSlug(slug: string) {
  return slug === MOMENTS_PRODUCT_SLUG
}

export function getProductHref(productOrSlug: Pick<Product, "slug"> | string) {
  const slug = typeof productOrSlug === "string" ? productOrSlug : productOrSlug.slug
  return isMomentsProductSlug(slug) ? "/moments" : `/products/${slug}`
}

export function getProductStatusView(
  product: Pick<Product, "slug" | "status" | "title">
): ProductStatusView {
  if (product.slug === MOMENTS_PRODUCT_SLUG && product.status === "coming-soon") {
    return {
      label: "Early Access",
      badgeVariant: "accent",
      detail:
        "BITMIND Moments is currently offered as a guided, done-for-you experience while the broader product ecosystem is being shaped.",
    }
  }

  if (product.slug === MONEARA_PRODUCT_SLUG && product.status === "coming-soon") {
    return {
      label: "In Development",
      badgeVariant: "outline",
      detail:
        "Moneara is actively being refined as a BITMIND-owned financial product and is not yet publicly released.",
    }
  }

  if (product.status === "available") {
    return {
      label: "Available",
      badgeVariant: "default",
      detail: `${product.title} is currently available as part of BITMIND's public product offering.`,
    }
  }

  if (product.status === "unavailable") {
    return {
      label: "Unavailable",
      badgeVariant: "outline",
      detail: `${product.title} is not currently open for public access or request.`,
    }
  }

  return {
    label: "Coming Soon",
    badgeVariant: "outline",
    detail: `${product.title} is being prepared for a future public release.`,
  }
}

export function getProductCardCtaLabel(product: Pick<Product, "slug" | "status">) {
  if (product.slug === MOMENTS_PRODUCT_SLUG) return "Explore Experiences"
  if (product.status === "available") return "View Product"
  if (product.status === "coming-soon") return "See Product Direction"
  return "Learn More"
}

export function getProductPrimaryCta(product: Pick<Product, "slug" | "status">) {
  if (product.slug === MOMENTS_PRODUCT_SLUG) {
    return {
      label: "Explore Experiences",
      href: "/moments",
    }
  }

  if (product.status === "available") {
    return {
      label: "Talk to BITMIND",
      href: "/contact",
    }
  }

  return {
    label: "Register Interest",
    href: "/contact",
  }
}

const detailCopyBySlug: Record<string, ProductDetailCopy> = {
  [MONEARA_PRODUCT_SLUG]: {
    overview:
      "Moneara is BITMIND's personal finance product direction — designed to make money management feel clearer, calmer, and easier to maintain over time.",
    whoItsFor: [
      "People who want a simpler way to understand spending, planning, and day-to-day money habits.",
      "Users who prefer a focused finance experience over overly complicated dashboards.",
      "BITMIND collaborators evaluating a future-owned digital product beyond service work.",
    ],
    coreValue:
      "A finance product should reduce friction, not create more of it. Moneara is being shaped around practical clarity, approachable interfaces, and everyday decision support.",
    capabilities: [
      "Thoughtful product UX for personal finance workflows",
      "Clear information architecture for money tracking and planning",
      "A BITMIND-owned product direction that can evolve intentionally over time",
    ],
    statusNote:
      "Moneara is currently in development. The product is being positioned and refined before any broader public release or onboarding flow is announced.",
    primaryCta: {
      label: "Talk to BITMIND",
      href: "/contact",
    },
    secondaryCta: {
      label: "Back to Products",
      href: "/products",
    },
  },
}

export function getProductDetailCopy(product: Product): ProductDetailCopy {
  const specific = detailCopyBySlug[product.slug]
  if (specific) return specific

  return {
    overview:
      product.description ??
      product.shortDescription ??
      `${product.title} is part of BITMIND's evolving product portfolio.`,
    whoItsFor: [
      `People or teams interested in ${product.category.toLowerCase()} shaped with BITMIND's product design approach.`,
      "Partners looking for a more intentional and focused digital experience.",
      "Collaborators exploring BITMIND-owned tools, systems, or product directions.",
    ],
    coreValue:
      product.shortDescription ??
      `${product.title} is designed to turn a clear product idea into a usable, well-positioned experience.`,
    capabilities: [
      "Focused product positioning and interface direction",
      "BITMIND-led experience design and implementation thinking",
      "A product structure that can evolve without overstating current functionality",
    ],
    statusNote: getProductStatusView(product).detail,
    primaryCta: getProductPrimaryCta(product),
    secondaryCta: {
      label: "Back to Products",
      href: "/products",
    },
  }
}
