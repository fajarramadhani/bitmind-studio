import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const migration = await readFile(
  new URL("../supabase/migrations/001_initial_cms.sql", import.meta.url),
  "utf8"
)

test("all CMS tables enable RLS", () => {
  for (const table of [
    "profiles",
    "projects",
    "project_media",
    "products",
    "product_media",
  ]) {
    assert.match(
      migration,
      new RegExp(`alter table public\\.${table} enable row level security`, "i")
    )
  }
})

test("public project and product reads require published status", () => {
  assert.match(
    migration,
    /Published projects are publicly readable[\s\S]*publish_status = 'published'/
  )
  assert.match(
    migration,
    /Published products are publicly readable[\s\S]*publish_status = 'published'/
  )
})

test("admin authorization uses a controlled security-definer function", () => {
  assert.match(migration, /create or replace function public\.is_admin\(\)/)
  assert.match(migration, /security definer/)
  assert.match(migration, /set search_path = ''/)
  assert.match(migration, /role = 'admin'/)
})

test("administrator role must be explicitly provided", () => {
  assert.doesNotMatch(migration, /role text not null default 'admin'/)
  assert.match(migration, /role text not null,/)
})

test("Storage buckets are private with an 8 MiB image limit", () => {
  assert.match(
    migration,
    /'project-media', 'project-media', false, 8388608/
  )
  assert.match(
    migration,
    /'product-media', 'product-media', false, 8388608/
  )
  assert.match(
    migration,
    /array\['image\/png', 'image\/jpeg', 'image\/webp', 'image\/avif'\]/
  )
})

test("media writes require admin authorization", () => {
  assert.match(migration, /Admins can upload CMS media[\s\S]*public\.is_admin\(\)/)
  assert.match(migration, /Admins can delete CMS media[\s\S]*public\.is_admin\(\)/)
})
