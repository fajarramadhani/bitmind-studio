import "server-only"

export type ContentSource = "local" | "supabase"

export function hasSupabaseConfig() {
  const privilegedKey =
    process.env.SUPABASE_SECRET_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY

  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY &&
      privilegedKey
  )
}

export function getContentSource(): ContentSource {
  const configured = process.env.CONTENT_SOURCE

  if (configured && configured !== "local" && configured !== "supabase") {
    throw new Error('CONTENT_SOURCE must be either "local" or "supabase".')
  }

  if (configured === "supabase" && !hasSupabaseConfig()) {
    throw new Error(
      "CONTENT_SOURCE is set to supabase, but Supabase environment variables are missing. Public private-media signing requires the server-only privileged Supabase key."
    )
  }

  if (configured === "local" || configured === "supabase") return configured

  // Build remains reproducible before credentials exist. A deployed runtime must
  // explicitly choose its source so production cannot silently serve stale data.
  if (
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PHASE !== "phase-production-build"
  ) {
    throw new Error(
      "CONTENT_SOURCE must be explicitly configured in production."
    )
  }

  return hasSupabaseConfig() ? "supabase" : "local"
}

export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!url || !publishableKey) {
    throw new Error("Supabase backend is not configured.")
  }

  return { url, publishableKey }
}
