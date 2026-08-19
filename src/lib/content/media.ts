import "server-only"

import { createAdminClient } from "@/lib/supabase/admin"

export async function resolveMediaUrl(
  bucket: "project-media" | "product-media",
  storagePath: string
) {
  const supabase = createAdminClient()
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(storagePath, 3600)

  if (error) throw new Error("Unable to load CMS media.")
  return data.signedUrl
}

export function getStorageReference(
  value: string | null,
  expectedBucket: "project-media" | "product-media"
) {
  if (!value?.startsWith("storage://")) return null
  const withoutScheme = value.slice("storage://".length)
  const slash = withoutScheme.indexOf("/")
  if (slash === -1) return null
  const bucket = withoutScheme.slice(0, slash)
  if (bucket !== expectedBucket) return null
  return withoutScheme.slice(slash + 1)
}
