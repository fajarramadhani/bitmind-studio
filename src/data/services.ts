import type { Service } from "@/types"

export const services: Service[] = [
  {
    slug: "website-design-development",
    title: "Website Design & Development",
    shortDescription:
      "Modern websites designed around clarity, credibility, performance, and real business goals.",
    description:
      "BITMIND designs and builds modern websites that help businesses communicate clearly, feel credible, and perform well across devices.",
    valueStatement:
      "A focused web presence built to support trust, clarity, and real business communication.",
    subOffers: [
      "Company Profile Website",
      "Landing Page",
      "Website Redesign",
      "Campaign Website",
      "Content-driven Website",
    ],
    idealFor: [
      "Growing businesses",
      "Brands with an outdated website",
      "Campaign or launch pages",
      "Teams that need a clearer online presence",
    ],
    deliverables: [
      "Structure & content direction",
      "Responsive interface design",
      "Frontend development",
      "Launch-ready implementation",
    ],
    ctaLabel: "Start a Website Project",
    featured: true,
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortDescription:
      "Clear and usable interfaces shaped from structure through polished high-fidelity UI.",
    description:
      "BITMIND helps turn product requirements, workflows, and interface ideas into digital experiences that feel clear, usable, and intentional.",
    valueStatement:
      "Interface design that improves comprehension, usability, and the quality of the digital experience.",
    subOffers: [
      "UX flows",
      "Wireframes",
      "Interface design",
      "Prototyping",
      "Responsive design",
      "Design systems",
    ],
    idealFor: [
      "New product interfaces",
      "Redesigning an existing UI",
      "Feature planning before development",
      "Teams that need clearer UX direction",
    ],
    deliverables: [
      "Flow mapping",
      "Wireframes",
      "High-fidelity UI",
      "Clickable prototypes",
    ],
    ctaLabel: "Discuss a Product Interface",
    featured: true,
  },
  {
    slug: "digital-experiences",
    title: "Digital Experiences",
    shortDescription:
      "Interactive and story-driven digital experiences that go beyond a conventional website.",
    description:
      "BITMIND creates digital experiences with stronger narrative, atmosphere, and interaction for campaigns, events, launches, and meaningful moments.",
    valueStatement:
      "Story-led digital experiences designed to feel memorable, expressive, and easy to share.",
    subOffers: [
      "Event microsites",
      "Campaign experiences",
      "Interactive storytelling",
      "Celebration experiences",
      "Branded microsites",
    ],
    idealFor: [
      "Campaign launches",
      "Branded activations",
      "Celebration or invitation experiences",
      "Projects that need more emotional presentation",
    ],
    deliverables: [
      "Experience concept",
      "Visual direction",
      "Responsive implementation",
      "Launch-ready storytelling surface",
    ],
    ctaLabel: "Create an Experience",
    featured: true,
  },
  {
    slug: "business-systems",
    title: "Business Systems",
    shortDescription:
      "Digital tools that help businesses manage information, workflows, and internal operations more clearly.",
    description:
      "BITMIND designs and builds practical internal-facing systems that make business processes easier to use, maintain, and understand.",
    valueStatement:
      "Operational interfaces designed to reduce friction and support day-to-day business workflows.",
    subOffers: [
      "Dashboards",
      "CMS / admin tools",
      "Internal tools",
      "Operational interfaces",
      "Workflow applications",
    ],
    idealFor: [
      "Manual workflows that need structure",
      "Teams managing repeated operational tasks",
      "Businesses that need clearer internal tools",
      "Lightweight custom systems",
    ],
    deliverables: [
      "Workflow mapping",
      "System interface design",
      "Custom implementation",
      "Operational handoff",
    ],
    ctaLabel: "Discuss a System",
    featured: false,
  },
  {
    slug: "custom-digital-products",
    title: "Custom Digital Products",
    shortDescription:
      "Design and development support for turning product ideas into usable digital solutions.",
    description:
      "BITMIND supports early-stage digital product work through interface design, product thinking, prototyping, and implementation for web-based products.",
    valueStatement:
      "A focused path from product idea to usable MVP or web application.",
    subOffers: [
      "MVPs",
      "Product UI",
      "Web applications",
      "Product prototypes",
      "Early-stage digital products",
    ],
    idealFor: [
      "Founders shaping an early product",
      "Businesses testing a new digital idea",
      "Teams that need an MVP direction",
      "Product concepts that need clearer execution",
    ],
    deliverables: [
      "Product structure",
      "Interface design",
      "Prototype or MVP build",
      "Implementation planning",
    ],
    ctaLabel: "Build a Product",
    featured: false,
  },
]
