import type { Project } from "@/types"

// Source fallback used only when the CMS/runtime content source is not
// configured.
//
// Local fallback stays intentionally empty for projects. The Supabase seed keeps
// legacy client records for migration/reference, but BITMIND does not elevate
// them into the local public portfolio until ownership/contribution can be
// verified.
//
// Seeded-but-withheld examples:
// - ardana-perkasa-group: excluded. Existing site was not created by BITMIND.
// - prada-badminton-club: excluded. Contribution context needs manual review.
//
// No fabricated projects are added to fill the Work page.
export const projects: Project[] = []
