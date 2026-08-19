import type { Project } from "@/types"

export const projects: Project[] = [
  {
    slug: "ardana-perkasa-group",
    title: "Ardana Perkasa Group",
    client: "Ardana Perkasa Group",
    category: "Corporate Website",
    year: 2026,
    shortDescription:
      "Modern corporate website showcasing business portfolio and services.",
    description:
      "A comprehensive corporate website built for Ardana Perkasa Group, designed to present the company, its ecosystem and services in a clear, modern digital format.",
    services: [
      "Web Design",
      "Web Development",
      "Content Strategy",
      "SEO Optimization",
    ],
    role: ["UI Design", "Frontend Development", "Responsive Implementation"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    featured: true,
    overview:
      "Ardana Perkasa Group required a clearer digital presence capable of presenting the company, its business ecosystem and key information in a modern and structured format. The previous website no longer reflected the scale and professionalism of the organization.",
    challenge:
      "The existing website lacked structure and visual clarity. Key company information was difficult to find, the layout was not responsive, and the overall presentation did not match the professional image of the business group.",
    approach:
      "We started by mapping the information architecture to ensure every section of the company ecosystem had a clear place. The visual direction was built around typographic hierarchy, professional spacing, and a clean layout system that works consistently across all screen sizes.",
    solution:
      "The result is a fully responsive corporate website with clear information hierarchy, modern visual language, and structured content sections for each business unit. The design system uses reusable interface components that make future content updates straightforward.",
    outcome:
      "The final website provides a clearer, more responsive digital presence that makes company information easier to explore across desktop and mobile. The structured layout allows the team to update content without breaking the overall design.",
    nextProjectSlug: "prada-badminton-club",
  },
  {
    slug: "prada-badminton-club",
    title: "Prada Badminton Club",
    client: "Prada Badminton Club",
    category: "Community Website",
    year: 2025,
    shortDescription:
      "Engaging community platform for badminton club members and enthusiasts.",
    description:
      "A community-focused website designed for Prada Badminton Club, making club information, schedules and activities accessible to members and visitors.",
    services: [
      "Web Design",
      "Web Development",
      "UI/UX Design",
      "Responsive Design",
    ],
    role: ["UI/UX Design", "Frontend Development"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    featured: true,
    overview:
      "Prada Badminton Club needed a dedicated online presence to share club information, training schedules, and community updates with both existing members and potential new members.",
    challenge:
      "The club relied on social media and messaging groups for all communication. There was no central place for members to find schedules, event details, or club information, which created confusion and made the club less visible to new members.",
    approach:
      "We designed around the key information members actually need: schedules, location, contact details, and community updates. The interface prioritizes simplicity and mobile usability since most members access information from their phones.",
    solution:
      "A clean, mobile-first community website with dedicated sections for club information, training schedules, and contact. The design uses a warm, energetic visual direction that reflects the club culture while maintaining clarity and usability.",
    outcome:
      "The website gives the club a professional digital identity and a central hub for member communication. Key information is now easy to find, and the club has a shareable link that represents them beyond social media.",
    nextProjectSlug: "ardana-perkasa-group",
  },
]
