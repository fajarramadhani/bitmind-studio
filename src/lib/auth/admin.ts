import "server-only"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { hasSupabaseConfig } from "@/lib/content/config"

export type AdminSession = {
  id: string
  email: string | null
  displayName: string | null
}

export async function getAdminSession(): Promise<AdminSession | null> {
  if (!hasSupabaseConfig()) return null

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") return null

  return {
    id: user.id,
    email: user.email ?? null,
    displayName: profile.display_name,
  }
}

export async function requireAdmin() {
  const admin = await getAdminSession()
  if (!admin) redirect("/admin/login")
  return admin
}
