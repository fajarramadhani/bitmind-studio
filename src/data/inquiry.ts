export const projectTypeOptions = [
  "Website Design & Development",
  "UI/UX Design",
  "Digital Experiences",
  "Business Systems",
  "Custom Digital Products",
  "Other",
]

export const budgetOptions = [
  "Under Rp2.5M",
  "Rp2.5M – Rp5M",
  "Rp5M – Rp10M",
  "Rp10M+",
  "Not Sure Yet",
]

export const timelineOptions = [
  "As soon as possible",
  "Within 1 month",
  "1–2 months",
  "2–3 months",
  "Flexible",
]

export const projectTypeToServiceSlug: Record<string, string> = {
  "Website Design & Development": "website-design-development",
  "UI/UX Design": "ui-ux-design",
  "Digital Experiences": "digital-experiences",
  "Business Systems": "business-systems",
  "Custom Digital Products": "custom-digital-products",
  Other: "other",
}

export const serviceSlugToProjectType: Record<string, string> = {
  "website-design-development": "Website Design & Development",
  "ui-ux-design": "UI/UX Design",
  "digital-experiences": "Digital Experiences",
  "business-systems": "Business Systems",
  "custom-digital-products": "Custom Digital Products",
  other: "Other",
}
