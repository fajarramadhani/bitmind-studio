# PHASE 5.3B — Strategic Alignment & Portfolio Integrity Lock

## Status

Alignment phase completed. This document locks the positioning, portfolio integrity, product architecture, and redesign scope before major UI implementation.

No destructive changes, database migrations, Supabase policy changes, dependency additions, environment changes, CMS publishing, or BITMIND Moments platform implementation were performed.

## 1. Revised Phase 5.3B scope

### In scope

- Reposition BITMIND as a digital studio with clear commercial offers.
- Lock the homepage information architecture.
- Establish BITMIND Moments as the flagship product architecture.
- Reframe Services as studio capabilities.
- Preserve the distinction between Work and Products.
- Audit portfolio ownership and contribution integrity.
- Keep future Moments routes possible without building the platform.
- Prepare presentation changes for the later redesign implementation.

### Explicitly out of scope

- Customer dashboard.
- Invitation builder.
- Guest management.
- RSVP management.
- Payment integration.
- QR guest check-in.
- WhatsApp sender.
- Advanced invitation analytics.
- Full self-service template engine.
- New complex Supabase architecture solely for Moments.
- Project taxonomy migration.
- Major UI implementation in this alignment step.

## 2. Revised homepage IA

1. Hero
2. Selected Work
3. What We Do
4. Featured Product — BITMIND Moments
5. Products
6. How We Work
7. Brand / About Statement
8. Final CTA

### Homepage rules

- Remove the standalone Featured Case Study section if its purpose is integrated into Selected Work.
- Replace the existing generic Capability Strip with stronger capability/offer communication.
- Do not use unverified work to create a more impressive homepage.
- Do not use identifiable private birthday content.
- The homepage must answer:
  1. Who is BITMIND?
  2. What has BITMIND actually built?
  3. What can someone buy, request, or use?

### Hero direction

Keep the current strong composition but update positioning toward:

- websites
- digital experiences
- business systems
- BITMIND-owned products

Recommended CTA hierarchy:

- Primary: Explore Work
- Secondary: Start a Project

## 3. Revised Products architecture

BITMIND is not currently intended to look like a generic template marketplace.

### Products page direction

Use:

- Heading: `Products`
- Supporting direction: `Digital products and experiences built by BITMIND.`

Remove:

- `Our Shop` positioning
- artificial catalog expansion
- fake availability or fake product depth

### Flagship product umbrella

# BITMIND Moments

Positioning:

> Digital experiences for life’s meaningful moments.

Initial experience categories:

- Wedding Invitation
- Birthday Experience
- Engagement
- Anniversary
- Graduation
- Farewell
- Event / Celebration Microsite

### Other product direction

- Moneara may appear as a BITMIND-owned product or product in development only when its current status is accurate.
- Future BITMIND-owned products may remain Coming Soon.
- A product may appear in both Work and Products when the content serves two different purposes.

## 4. Future BITMIND Moments information architecture

The Phase 5.3B presentation should not prevent these future routes:

- `/moments`
- `/moments/wedding`
- `/moments/birthday`
- `/moments/anniversary`
- `/moments/engagement`
- `/moments/graduation`
- `/moments/farewell`
- `/moments/templates`
- `/moments/templates/[slug]`
- `/moments/pricing`
- future `/moments/dashboard`

These routes are architectural direction only. They are not to be fully implemented during this phase.

## 5. Revised Services architecture

Services describe what BITMIND can design and build for a client.

Recommended pillars:

1. Website Design & Development
2. UI/UX Design
3. Digital Experiences
4. Business Systems
5. Custom Digital Products

Do not label the fifth service simply `Digital Products`, because that conflicts conceptually with the Products area.

Birthday, invitation, and celebration offerings are commercial products/productized experiences under BITMIND Moments, not replacements for the service pillars.

## 6. Work vs Products distinction

### Work answers

> What has BITMIND actually built?

Only verified work should be publicly elevated.

### Products answers

> What can someone buy, request, or use from BITMIND?

A BITMIND-owned product may appear in both areas:

- Moneara in Work: product design/development case study.
- Moneara in Products: actual BITMIND product, with accurate status.
- BITMIND Moments in Work: product/platform case study only when sufficient verified work exists.
- BITMIND Moments in Products: commercial offering.

Do not fabricate case studies to populate Work.

## 7. Portfolio integrity audit

The current source contains two project entries in `src/data/projects.ts`, mirrored by the Supabase seed:

- Ardana Perkasa Group
- Prada Badminton Club

### Ardana Perkasa Group

Decision: **remove from the proposed public BITMIND portfolio and flagship backlog.**

The website was not created by BITMIND according to the project context provided for this phase. Therefore BITMIND must not currently present it as:

- a BITMIND-created project
- a BITMIND case study
- proof of BITMIND contribution
- a BITMIND flagship

Do not fabricate ownership, role, contribution, metrics, or outcomes.

Do not delete the CMS record solely because it is currently unsuitable for public elevation. It should remain available for manual review/content governance.

### Prada Badminton Club

Decision: **manual ownership/contribution confirmation required before public elevation.**

The entry exists in source, but this alignment audit does not establish enough evidence to classify it safely as a BITMIND-created or BITMIND-contributed project.

Until reviewed:

- do not elevate it as a flagship
- do not rely on it as homepage proof
- do not publish stronger contribution claims
- retain the record for manual review

### Other candidate projects

The following candidates were discussed in the business context but were not found as current source entries in this audit:

- STILERA
- Moneara
- Ardimotion
- private birthday websites

They must not be added to the public portfolio merely to fill the Work page. Each requires verified source material, ownership/contribution context, content, media rights, and an appropriate classification before publication.

## 8. Items removed from proposed public portfolio

- Ardana Perkasa Group as a BITMIND portfolio case.
- Any claim that Ardana was designed or developed by BITMIND.
- Any invented Ardana role, ownership, performance result, or case-study narrative.
- Any identifiable private birthday project used as product demo content by default.
- Any private birthday content reused in homepage imagery, templates, advertising, or public product pages without explicit approval.

## 9. Items requiring manual ownership/context confirmation

- Prada Badminton Club.
- Any future employer/company-related work where the founder’s contribution is not explicit.
- Any collaboration with partial BITMIND involvement.
- Any independent project whose ownership needs clarification.
- Any private birthday website involving a real person.
- Any Moneara or Moments case study presented in both Work and Products.

## 10. BITMIND Moments positioning rules

Use generic commercial terminology:

- Birthday Website
- Birthday Experience
- Digital Birthday Experience

For demos, use:

- fictional personas
- generic placeholder identities
- newly created demo assets
- content written specifically for public demonstration

Example directions:

- `Nadine’s 25th Birthday`
- `A Special Day — Birthday Experience Demo`

These are examples only. Do not copy personal content from real private projects.

Never use employers, managers, coworkers, executives, clients, friends, or other identifiable individuals as sample personas without explicit approval.

## 11. Database confirmation

**No database schema changes are required for this alignment step.**

Do not migrate `project_kind` yet.

The future taxonomy proposal may remain:

- client
- professional
- independent
- bitmind
- internal
- concept

Existing `internal` values must not be blindly migrated. A future taxonomy task must include manual review and safe backfill planning.

## 12. Exact files expected to change during later implementation

### Homepage

- `src/app/page.tsx`
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/CapabilityStrip.tsx`
- `src/components/sections/SelectedWorkSection.tsx`
- `src/components/sections/FeaturedCaseStudy.tsx`
- `src/components/sections/ProductsSection.tsx`
- `src/components/sections/ServicesSection.tsx`
- `src/components/sections/ProcessSection.tsx`
- `src/components/sections/AboutSection.tsx`
- `src/components/sections/FinalCTASection.tsx`

### Work

- `src/app/work/page.tsx`
- `src/app/work/[slug]/page.tsx`
- `src/components/ui/ProjectCard.tsx`
- `src/components/ui/ProjectGallery.tsx`

### Products

- `src/app/products/page.tsx`
- `src/app/products/[slug]/page.tsx`
- `src/components/ui/ProductCard.tsx`
- `src/data/products.ts`

### Services

- `src/app/services/page.tsx`
- `src/components/sections/ServiceHero.tsx`
- `src/components/sections/ServiceList.tsx`
- `src/components/sections/ServicePricing.tsx`
- `src/components/sections/ServiceProcess.tsx`
- `src/components/sections/ServiceTrust.tsx`
- `src/data/services.ts`

### Global presentation

- `src/components/navigation/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/SectionHeading.tsx`
- `src/app/globals.css`

### Only if taxonomy changes in a later dedicated task

- `src/types/index.ts`
- `src/types/database.ts`
- `src/lib/content/labels.ts`
- `src/lib/content/mappers.ts`
- `src/components/admin/ProjectForm.tsx`
- `src/lib/admin/validation.ts`
- Supabase migration files

## 13. Implementation order for Phase 5.3B

1. Lock portfolio integrity rules in content governance.
2. Remove Ardana from proposed public portfolio elevation.
3. Mark Prada for manual ownership/contribution confirmation.
4. Confirm approved public project inventory before redesigning Work.
5. Lock BITMIND Moments positioning and category architecture.
6. Lock the Services vs Products distinction.
7. Approve the homepage information architecture.
8. Implement homepage presentation changes.
9. Reframe Products listing and detail presentation.
10. Refine Work listing/detail presentation using only verified projects.
11. Refine Services, About, Contact, and global chrome.
12. Validate mobile, accessibility, motion, CMS runtime behavior, and CTA destinations.
13. Produce a Phase 5.3B implementation report in `docs/` before beginning the next phase.

## 14. Risks and guardrails

- Do not break runtime Supabase content loading.
- Do not convert CMS content back to hardcoded source content.
- Do not use private birthday data as public marketing material.
- Do not infer BITMIND ownership from association with a company or employer.
- Do not fabricate projects, products, testimonials, metrics, or outcomes.
- Do not build Moments platform functionality under the redesign scope.
- Do not migrate the database taxonomy during alignment.
- Do not remove unclear CMS records without a separate governance decision.
- Do not make the public catalog look larger than the verified product inventory.

## Conclusion

The Phase 5.3B redesign should make BITMIND clearer and more commercially useful without overstating its portfolio. The core strategy is:

- verified work only in Work
- clear capabilities in Services
- BITMIND-owned and productized offerings in Products
- BITMIND Moments as the flagship product architecture
- privacy-safe fictional/generic demo content
- no platform build and no database migration in this phase

**PHASE 5.3B ALIGNMENT READY FOR REVIEW**
