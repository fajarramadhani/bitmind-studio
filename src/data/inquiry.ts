export const projectTypeOptions = [
  "Company Profile Website",
  "Landing Page",
  "Website Redesign",
  "Web Application",
  "UI/UX Design",
  "Digital Product",
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
  "Company Profile Website": "company-profile-website",
  "Landing Page": "landing-page",
  "Website Redesign": "website-redesign",
  "Web Application": "web-application",
  "UI/UX Design": "ui-ux-design",
  "Digital Product": "digital-product",
  "Other": "other",
}

export const serviceSlugToProjectType: Record<string, string> = {
  "company-profile-website": "Company Profile Website",
  "landing-page": "Landing Page",
  "website-redesign": "Website Redesign",
  "web-application": "Web Application",
  "ui-ux-design": "UI/UX Design",
  "digital-product": "Digital Product",
  "other": "Other",
}
