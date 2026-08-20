# Phase 5 Production-Safe CMS Audit

## Already Implemented

- Official `@supabase/supabase-js` and `@supabase/ssr` packages
- Browser, server, service-role, and Proxy clients
- Server-side `profiles.role = 'admin'` authorization
- No public signup route
- Projects, project media, products, product media, and profiles schema
- Draft, published, archived, project-kind, and product availability states
- Private Storage buckets, MIME allowlist, 8 MiB limit, and UUID paths
- Local/Supabase repository layer and database-to-domain mappers
- Published-only public repository queries
- Admin dashboard, project/product forms, media editor, and project preview
- Dynamic public content integration, SEO, robots, and sitemap
- Idempotent slug-based seed preserving existing public URLs

## Completed on `feature/phase-5-cms`

- Preserved `published_at` while editing already-published content
- Added authoritative database lookup for old slugs and destructive actions
- Added media ownership checks and stopped trusting client-submitted Storage paths
- Changed cleanup order so Storage deletion must succeed before metadata/parent deletion
- Revalidated public pages after media-only mutations
- Added product purchase URL, public demo/gallery rendering, and product draft preview
- Added admin-wide `noindex`, current-navigation state, list feedback, and archive confirmation
- Removed duplicate main landmarks and hidden public navigation behind admin/login shells
- Added visible signed-media preview, aspect ratio, and object-fit media controls
- Added server validation for currency and product URLs
- Removed implicit admin role default from SQL
- Added essential nonblank database checks and one-cover-per-entity constraints
- Added missing audit/relationship indexes
- Clarified clean-project policy inventory and signed-URL caching/security requirements
- Added native validation and migration-security tests

## Partially Implemented

- Dynamic public content uses request-time Supabase reads and path revalidation. A
  persistent tagged-cache strategy can be introduced later if traffic requires it.
- Slug changes revalidate old/new URLs but do not create durable redirects. The CMS
  warns that changing a slug changes the public URL.
- Private signed media URLs have a one-hour lifetime. The public CMS mode must remain
  dynamically rendered or use a cache lifetime shorter than the URL lifetime.
- File MIME and size are validated, but malware scanning and byte-signature
  inspection are not included in this phase.

## Missing by Scope or Credentials

- Remote Supabase project migration, seed, buckets, administrator, and environment
  configuration
- Remote authenticated CRUD and RLS verification
- Automated orphan reconciliation after infrastructure-level partial failures
- Durable slug-history redirects
- Inquiry/contact backend (Phase 6)
- Checkout, licensing, and customer accounts

## Needs Remote Verification

- Anonymous read of published rows and denial of draft/archived rows
- Authenticated non-admin denial of draft, CRUD, and Storage operations
- Admin CRUD, signed media, upload rules, publish, archive, and cleanup
- Seed idempotency when executed twice
- Publishing a new slug without redeploy
- Revalidation of homepage, listings, detail pages, and sitemap
- Signed URL expiry and production cache headers
- Preview branch Supabase environment after credentials are supplied
