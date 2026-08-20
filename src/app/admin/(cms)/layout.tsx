import { AdminShell } from "@/components/admin/AdminShell"
import { requireAdmin } from "@/lib/auth/admin"
import type { Metadata } from "next"

export const metadata: Metadata = {
  robots: { index: false, follow: false, noarchive: true },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin()
  return <AdminShell admin={admin}>{children}</AdminShell>
}
