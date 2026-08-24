export type ServicePricing = {
  serviceSlug: string
  startingPrice?: number
  priceLabel?: string
  note?: string
}

// Pricing data is intentionally data-driven and aligned with `src/data/services.ts`.
// Slugs match the real service slugs so the Services page can join these values.
export const servicePricing: ServicePricing[] = [
  {
    serviceSlug: "website-design-development",
    priceLabel: "Custom quotation based on scope",
    note: "Final pricing depends on number of pages, features, content and timeline.",
  },
  {
    serviceSlug: "ui-ux-design",
    priceLabel: "Custom quotation based on scope",
    note: "Pricing based on project scope and number of screens.",
  },
  {
    serviceSlug: "digital-experiences",
    priceLabel: "Custom quotation based on scope",
    note: "Pricing varies based on design complexity and integration requirements.",
  },
  {
    serviceSlug: "business-systems",
    priceLabel: "Custom quotation based on scope",
    note: "Depends on workflow complexity and number of operational interfaces.",
  },
  {
    serviceSlug: "custom-digital-products",
    priceLabel: "Custom quotation based on scope",
    note: "Pricing depends on features, complexity and development timeline.",
  },
]
