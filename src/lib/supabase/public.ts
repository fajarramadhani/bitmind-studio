import "server-only"

import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"
import { getSupabaseEnv } from "@/lib/content/config"

export function createPublicClient() {
  const { url, publishableKey } = getSupabaseEnv()

  return createClient<Database>(url, publishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })
}
