# BITMIND STUDIO — Phase 5 Complete

## Supabase Integration

Official packages installed:

```text
@supabase/supabase-js
@supabase/ssr
```

Environment contract is documented in `.env.example`:

```text
NEXT_PUBLIC_SITE_URL
CONTENT_SOURCE
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
SUPABASE_SERVICE_ROLE_KEY
```

Client architecture:

```text
src/lib/supabase/client.ts   Browser client
src/lib/supabase/server.ts   Cookie-aware Server Component/Action client
src/lib/supabase/admin.ts    Server-only service-role client
src/lib/supabase/proxy.ts    Session refresh and signed-out redirect
src/proxy.ts                 Next.js 16 Proxy entrypoint
```

The service-role client imports `server-only` and is never used by Client
Components.

## Database

The reproducible migration is stored at:

```text
supabase/migrations/001_initial_cms.sql
```

Tables:

```text
profiles
projects
project_media
products
product_media
```

The schema includes project kind, independent publish/availability states,
deterministic sort order, publication timestamps, audit fields, URL constraints,
slug constraints, media layout, media ordering, and automatic updated timestamps.

## Security

- RLS is enabled on all five CMS tables.
- Anonymous/public reads are limited to `publish_status = 'published'`.
- Draft and archived content are excluded from public repositories and sitemap.
- `is_admin()` is a `SECURITY DEFINER` function with a controlled empty
  `search_path` and qualified references.
- Every sensitive Server Action calls `requireAdmin()` again.
- There is no public registration route.
- Storage buckets are private and writable only by administrators.
- The service-role key is used only by trusted server code for short-lived signed
  public media URLs.

## Authentication

`/admin/login` uses Supabase email/password authentication. Proxy refreshes auth
cookies and redirects signed-out `/admin/*` requests to login.

After authentication, the server checks `profiles.role = 'admin'`. A valid
Supabase user without the admin profile is signed out and receives a safe access
error.

When credentials are absent, login displays a setup notice and does not imitate a
working CMS.

## Admin Dashboard

Routes:

```text
/admin/login
/admin
/admin/projects
/admin/projects/new
/admin/projects/[id]/edit
/admin/products
/admin/products/new
/admin/products/[id]/edit
/admin/preview/projects/[id]
```

The dashboard shows database-derived project/product status counts and quick
actions. Admin navigation includes Overview, Projects, Products, View Website, and
Logout.

## Project CMS

Implemented source architecture:

- Create and edit projects
- Auto-generated editable URL-safe slug
- Client, BITMIND, and Concept project kinds
- Draft, published, and archived status
- Featured and sort order controls
- Overview, challenge, approach, solution, and outcome fields
- Service, role, and technology arrays
- Server-side validation and unique slug feedback
- Secure draft preview
- Controlled archive and permanent delete
- Media upload, alt text, caption, layout, order, update, and delete
- Storage cleanup during media/project deletion
- Path revalidation for old and new slugs

Concept projects receive an explicit public `Concept Project` label and do not
require a fake client.

## Product CMS

Implemented source architecture:

- Create and edit products
- Separate availability and publish states
- Price and IDR currency fields
- Featured and sort order controls
- Demo URL
- Draft, publish, archive, and controlled permanent delete
- Media upload and management
- Indonesian currency formatting in the admin list
- Public product repository, detail metadata, and unpublished 404 behavior

Payment, checkout, licensing, and customer accounts are intentionally excluded.

## Storage

Migration creates:

```text
project-media
product-media
```

Rules:

- Private buckets
- 8 MiB per image
- PNG, JPEG, WebP, and AVIF only
- Collision-safe paths: `<entity-uuid>/<object-uuid>.<extension>`
- Admin-only CRUD policies
- Public site uses short-lived server-generated signed URLs
- Database record and object deletion are coordinated by Server Actions

## Content Migration

`supabase/seed.sql` performs idempotent slug-based upserts for:

Projects:

```text
ardana-perkasa-group
prada-badminton-club
```

Products:

```text
bitmind-website-starter
landing-page-kit
```

Existing public slugs and URLs are preserved. Local source files remain available
for explicit migration/development mode.

## Public Website Integration

CMS repository integration covers:

- Homepage selected work
- Homepage featured case study
- Homepage featured products
- `/work`
- `/work/[slug]`
- Related Work on Services
- `/products`
- `/products/[slug]`
- Dynamic project/product metadata and OG cover
- Published-only sitemap
- Admin exclusion in robots

The presentational design from prior phases is retained.

## Content Source

```text
CONTENT_SOURCE=local
```

Uses existing TypeScript data intentionally for development and migration.

```text
CONTENT_SOURCE=supabase
```

Uses published Supabase records. Missing Supabase credentials produce a clear
server error. Production requires an explicit content source and does not silently
fall back to local content at runtime.

## Responsive

- Public routes were checked at 375, 390, 768, 1024, and 1440px.
- Admin login is usable at the same breakpoints.
- Admin lists use stacked responsive records rather than an overflowing table.
- Admin forms use responsive one-, two-, three-, and four-column grids.
- The CMS shell switches from compact horizontal navigation to desktop sidebar.

Authenticated admin pages could not be runtime-tested without Supabase
credentials. Their responsive source architecture compiles successfully.

## Accessibility

- Admin login and forms use visible labels and native required fields.
- Admin navigation has a semantic label.
- Focus treatments use brand tokens.
- Status/error messages use `role="status"` or `role="alert"`.
- Destructive actions require typing `DELETE`.
- Media alt text is required.
- Draft preview is clearly identified as non-public.
- Products index now has a single semantic H1.

## Validation

```text
npm run lint
PASS

npm run build
PASS
```

Local validation:

```text
Public routes                                 PASS
Existing project/product slugs               PASS
Sitemap excludes admin                       PASS
Robots disallows /admin                      PASS
Signed-out /admin → /admin/login             PASS
Signed-out create routes → /admin/login      PASS
Responsive public browser QA                 PASS
Admin login responsive QA                    PASS
```

## Supabase Remote Verification

```text
NOT RUN — credentials not configured
```

## Technical Notes

- No remote Supabase project was modified.
- Migration status: not applied remotely.
- Seed status: not run remotely.
- Storage bucket status: not created remotely.
- Admin user/profile status: not created.
- Authenticated login, CRUD, RLS, signed media, publish/revalidation, and archive
  flows require configured credentials before remote verification.
- Database TypeScript interfaces are maintained manually. The setup guide should be
  followed by generated Supabase types once a project exists.
- Public private-media URLs expire after one hour and are regenerated by server
  repositories.
- Contact inquiry backend remains out of scope and unchanged.

## Next Phase

```text
Ready for Phase 6 — Lead Management, Inquiry Backend & Notifications.

Waiting for approval before continuing.
```
