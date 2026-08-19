export type ServicePricing = {
  serviceSlug: string
  startingPrice?: number
  priceLabel?: string
  note?: string
}

export const servicePricing: ServicePricing[] = [
  {
    serviceSlug: "company-profile-website",
    priceLabel: "Custom quotation based on scope",
    note: "Final pricing depends on number of pages, features, content and timeline.",
  },
  {
    serviceSlug: "landing-page",
    priceLabel: "Custom quotation based on scope",
    note: "Pricing varies based on design complexity and integration requirements.",
  },
  {
    serviceSlug: "website-redesign",
    priceLabel: "Custom quotation based on scope",
    note: "Depends on current website scope and redesign requirements.",
  },
  {
    serviceSlug: "web-application",
    priceLabel: "Custom quotation based on scope",
    note: "Pricing depends on features, complexity and development timeline.",
  },
  {
    serviceSlug: "ui-ux-design",
    priceLabel: "Custom quotation based on scope",
    note: "Pricing based on project scope and number of screens.",
  },
]
