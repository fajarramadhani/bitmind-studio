# Supabase Setup

## 1. Create a Supabase project

Create a dedicated BITMIND STUDIO project from the Supabase dashboard. Do not use
an unrelated or production database while testing this migration.

## 2. Configure environment variables

Copy `.env.example` to `.env.local` and provide values from Supabase project
settings:

```text
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CONTENT_SOURCE=local
NEXT_PUBLIC_SUPABASE_URL=https://PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

The service-role key is server-only. Never expose it through a `NEXT_PUBLIC_`
variable or a client component.

## 3. Apply the schema

1. Run `supabase/migrations/001_initial_cms.sql` in the Supabase SQL editor as a project owner.
2. Verify all statements complete without errors.

Do not run `supabase db reset` against a remote project. This migration targets a
new CMS schema and should be reviewed before adapting it to an existing database.

## 4. Create the administrator

1. Create the first user manually in Supabase Authentication.
2. Bootstrap that user with trusted SQL, using the same email as the Auth user:

```sql
insert into public.profiles (id, email, display_name, role)
values ('USER_UUID_HERE', 'admin@example.com', 'Administrator', 'admin')
on conflict (id) do update set
  email = excluded.email,
  display_name = excluded.display_name,
  role = excluded.role;
```

The seed upserts by slug and preserves `ardana-perkasa-group`, `prada-badminton-club`, `bitmind-website-starter`, and `landing-page-kit`. It does not delete other content or media.

There is no `/admin/register` route. Additional administrators must be created
intentionally through Supabase Auth and inserted into `profiles` by trusted admin
operations.

## 5. Seed existing content

Run `supabase/seed.sql` after the migration and administrator bootstrap. The seed
is idempotent and uses slug-based upserts, so existing URLs remain unchanged.

## 6. Switch to CMS mode

After migration, seed, and RLS verification:

```text
CONTENT_SOURCE=supabase
```

Restart the application. Visit `/admin/login`, sign in with the configured admin,
then verify Projects and Products are visible. Public routes must continue to show
only published rows.

`CONTENT_SOURCE=local` remains available for migration and development. Production
must set a source explicitly; it does not silently fall back to local data.

## 7. Storage

The migration creates private `project-media` and `product-media` buckets. Both accept PNG, JPEG, WebP, and AVIF images up to 8 MiB. GIF is not allowed.

Object paths must follow `<entity-uuid>/<object-uuid>.<extension>`, for example:

```text
7fe3b62e-f417-4db2-94e2-ee372af990b0/096548c1-dceb-43bd-b124-a9707283eb7f.webp
```

The entity UUID should match the owning project or product. The object UUID avoids filename collisions. Store this relative path in `storage_path`.

The website must obtain short-lived signed URLs from trusted server code. Do not store an expiring signed URL in `public_url`; leave it null for Supabase Storage assets. `public_url` and project/product URL fields may be used for durable external HTTP(S) assets when needed.

Database media rows and Storage objects do not cascade across systems. Delete both when removing an asset.

The migration creates both buckets automatically. Verify them in the Storage
dashboard before uploading media through the CMS.

## 8. Verification

- Confirm all five public tables have RLS enabled.
- Confirm anonymous and ordinary authenticated users see only `publish_status = 'published'` content.
- Confirm media metadata is visible only for a published parent.
- Confirm only admins can read or mutate Storage objects.
- Confirm both buckets are private with an 8 MiB limit and no GIF MIME type.
- Confirm invalid or non-UUID-nested object paths are rejected.

Also test:

```text
Signed out /admin → /admin/login
Non-admin account → access denied
Admin account → CRUD allowed
Draft project → absent from /work and sitemap
Published project → visible publicly
Archived project → public route returns 404
```

## 9. Backup and export

Use Supabase dashboard backups when available. For a manual content export, use a
trusted PostgreSQL client or Supabase CLI from a secured environment to export the
five CMS tables and Storage object inventory. Never place database passwords,
service-role keys, or exported private data in this repository.

Before schema changes, export at least:

```text
profiles
projects
project_media
products
product_media
storage.objects rows for project-media and product-media
```
