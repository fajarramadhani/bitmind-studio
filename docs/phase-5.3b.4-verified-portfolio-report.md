# Phase 5.3B.4: Verified Portfolio Reconstruction & Work Experience Report

**Date:** 2026-08-21
**Status:** Completed
**Phase:** 5.3B.4

## Overview
This phase refocused the public Work experience around portfolio integrity instead of portfolio volume. Public work surfaces now use verified-only filtering, excluded or unconfirmed records are withheld from `/work`, homepage “Selected Work”, related-work surfaces, and work-detail routing, and the local fallback inventory no longer fabricates or elevates projects simply to fill the portfolio.

This phase intentionally accepts an honest empty-state experience when no verified public projects are available.

## Portfolio Inventory Audit

| Project | Current source | Verified contribution status | Recommended public classification | Public portfolio eligibility | Missing information/assets | Risks |
|---|---|---|---|---|---|---|
| Ardana Perkasa Group | Local fallback project data | Exclude | Excluded from BITMIND portfolio | No | Verified scope/ownership evidence, permission basis, contribution proof | Misrepresenting third-party work as BITMIND execution |
| Prada Badminton Club | Local fallback project data | Needs Confirmation | Needs manual review before any public elevation | No | Exact contribution scope, approval to publish, final public-facing positioning | Overstating contribution or publishing unclear authorship |
| Private birthday / event-style projects | Mentioned strategically, not approved for public portfolio use | Not Yet Portfolio Ready | Keep private unless explicit public-use permission exists | No | Public-use permission, anonymized assets, contribution framing | Privacy exposure and repurposing private event content as general commercial proof |
| Verified public portfolio projects | CMS / runtime content only when sufficiently verified | Verified | Portfolio project | Yes | Case-study assets may still be incomplete | Sparse content is acceptable; false certainty is not |

## Classification Rules Applied

### Verified
Only records with clear public-use eligibility and contribution confidence should appear on:
- `/work`
- `/work/[slug]`
- homepage Selected Work
- related-work sections
- sitemap portfolio entries

### Needs Confirmation
Records may remain in source systems, but must not be publicly elevated until contribution scope and publishing eligibility are confirmed.

### Exclude
Records that should not be presented as BITMIND work must be blocked from public portfolio surfaces.

### Not Yet Portfolio Ready
Private or sensitive work may be real, but must stay off public portfolio surfaces until permission, framing, and assets are appropriate.

## Implemented Changes

### 1. Verified-only portfolio filtering
A shared public-eligibility layer now governs which project records may appear on public portfolio surfaces.

**Key file**
- `src/lib/project-portfolio.ts`

**Behavior**
- `ardana-perkasa-group` is excluded
- `prada-badminton-club` is marked as needing confirmation
- only eligible projects are returned by `getPublicPortfolioProjects(...)`

### 2. Local fallback project inventory hardened
The local fallback project inventory was reduced to an empty public array instead of keeping unsafe or unclear case studies live by default.

**Key file**
- `src/data/projects.ts`

**Behavior**
- no fabricated replacement projects were introduced
- no unclear project was silently promoted to fill the Work page
- local fallback now aligns with honesty-first portfolio governance

### 3. Homepage Selected Work now respects verified-only logic
Homepage proof-of-work surfaces now render only verified public projects.

**Key file**
- `src/app/page.tsx`

**Behavior**
- homepage Selected Work uses `getPublicPortfolioProjects(projects)`
- current inventory may intentionally render the curated empty state
- excluded or unconfirmed records are not used as trust signals

### 4. Work index redesigned for integrity-first presentation
The `/work` page now supports a truthful empty state instead of relying on inflated portfolio volume.

**Key files**
- `src/app/work/page.tsx`
- `src/components/ui/ProjectCard.tsx`

**Behavior**
- verified projects render in the redesigned editorial layout
- when none are eligible, the page displays a clear preparation/curation message
- project cards now read as portfolio evidence rather than product cards

### 5. Related work surfaces filtered
Related-work sections now filter project lists before rendering.

**Key file**
- `src/components/sections/RelatedWorkSection.tsx`

**Behavior**
- excluded or unconfirmed records do not leak into supporting sections
- service/detail surfaces remain aligned with verified-only portfolio policy

### 6. Verified-only work detail routing
Public project detail pages now reject excluded or unconfirmed slugs.

**Key file**
- `src/app/work/[slug]/page.tsx`

**Behavior**
- non-public portfolio slugs return `notFound()`
- work-detail metadata is not generated for excluded/unconfirmed records
- next-project navigation is built from the already-filtered public portfolio list only

### 7. Sitemap portfolio routes hardened
Portfolio URLs included in the sitemap are now filtered through the same verified-only public logic.

**Key file**
- `src/app/sitemap.ts`

**Behavior**
- excluded/unconfirmed work items are not advertised as public URLs
- `/moments` remains the public entry route for BITMIND Moments
- `/products/bitmind-moments` remains excluded from product-detail route listings

## Public Experience Outcome

### Homepage
- “Selected Work” now reflects verified-only logic
- if no verified projects exist, the homepage remains truthful instead of promotional-by-invention

### `/work`
- portfolio page now communicates curation and verification honestly
- no filler case studies were introduced

### `/work/[slug]`
- excluded or unclear projects cannot be browsed as public case studies
- detail pages remain available only for verified public work

### Related work
- supporting sections stay consistent with the same portfolio-governance policy

### Sitemap
- public indexing behavior is aligned with visible portfolio eligibility

## Files Changed

- `src/app/page.tsx`
- `src/app/work/page.tsx`
- `src/app/work/[slug]/page.tsx`
- `src/components/sections/RelatedWorkSection.tsx`
- `src/components/ui/ProjectCard.tsx`
- `src/data/projects.ts`
- `src/lib/project-portfolio.ts`
- `src/app/sitemap.ts`

## What Was Explicitly Not Done

To preserve integrity and avoid unauthorized content changes, this phase did **not**:
- reintroduce Ardana as BITMIND portfolio proof
- automatically elevate Prada Badminton Club
- expose private birthday/event content
- invent clients, outcomes, metrics, or contribution claims
- add fake case studies to fill the grid
- migrate Supabase schema or enums
- delete unclear CMS records
- change BITMIND Moments product architecture
- build the Moments SaaS
- deploy/push changes automatically

## Validation Checklist

Run:
- `npm run lint`
- `npm run build`

Recommended manual QA:
- `/`
- `/work`
- direct visit to `/work/ardana-perkasa-group` → should 404
- direct visit to `/work/prada-badminton-club` → should 404
- confirm homepage Selected Work remains truthful when no verified projects are available
- confirm related-work sections do not surface excluded/unconfirmed records

## Regression Notes

Expected result after this phase:
- portfolio integrity is stronger than before
- zero verified projects is treated as acceptable and honest
- excluded/unconfirmed projects are preserved in governance logic without being exposed publicly
- Work and Products remain clearly separated:
  - **Work** = verified execution evidence
  - **Products** = BITMIND-owned offerings
