import Link from "next/link"
import { BrandLogo } from "@/components/brand/BrandLogo"
import { logoutAction } from "@/app/admin/actions"
import type { AdminSession } from "@/lib/auth/admin"
import { AdminNav } from "@/components/admin/AdminNav"
import { AdminToastProvider } from "@/components/admin/AdminToast"
import { SubmitButton } from "@/components/admin/SubmitButton"

export function AdminShell({
  admin,
  children,
}: {
  admin: AdminSession
  children: React.ReactNode
}) {
  return (
    <AdminToastProvider>
      <div className="admin-shell min-h-dvh bg-background text-foreground">
        <div className="mx-auto grid min-h-dvh max-w-[1600px] lg:grid-cols-[240px_1fr]">
          <aside className="border-b border-border bg-surface p-5 lg:border-b-0 lg:border-r lg:p-7">
            <div className="flex items-center justify-between lg:block">
              <BrandLogo size="sm" />
              <span className="rounded-full bg-brand-primary-soft px-3 py-1 text-xs font-semibold text-brand-primary-dark">
                CMS
              </span>
            </div>
            <AdminNav />
            <div className="mt-7 border-t border-border pt-5 lg:mt-10">
              <p className="truncate text-xs text-muted-foreground">
                {admin.displayName ?? admin.email ?? "Administrator"}
              </p>
              <div className="mt-4 flex gap-3 lg:flex-col">
                <Link href="/" target="_blank" className="text-sm font-medium hover:text-accent">
                  View Website ↗
                </Link>
                <form action={logoutAction}>
                  <SubmitButton variant="plain" pendingLabel="Signing out...">
                    Logout
                  </SubmitButton>
                </form>
              </div>
            </div>
          </aside>
          <div className="min-w-0 p-5 sm:p-8 lg:p-10">{children}</div>
        </div>
      </div>
    </AdminToastProvider>
  )
}
