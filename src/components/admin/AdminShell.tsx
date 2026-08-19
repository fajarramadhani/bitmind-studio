import Link from "next/link"
import { BrandLogo } from "@/components/brand/BrandLogo"
import { logoutAction } from "@/app/admin/actions"
import type { AdminSession } from "@/lib/auth/admin"

const adminLinks = [
  ["Overview", "/admin"],
  ["Projects", "/admin/projects"],
  ["Products", "/admin/products"],
] as const

export function AdminShell({
  admin,
  children,
}: {
  admin: AdminSession
  children: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto bg-background text-foreground">
      <div className="mx-auto grid min-h-dvh max-w-[1600px] lg:grid-cols-[240px_1fr]">
        <aside className="border-b border-border bg-surface p-5 lg:border-b-0 lg:border-r lg:p-7">
          <div className="flex items-center justify-between lg:block">
            <BrandLogo size="sm" />
            <span className="rounded-full bg-brand-primary-soft px-3 py-1 text-xs font-semibold text-brand-primary-dark">
              CMS
            </span>
          </div>
          <nav aria-label="Admin navigation" className="mt-7 flex gap-2 overflow-x-auto lg:flex-col">
            {adminLinks.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-7 border-t border-border pt-5 lg:mt-10">
            <p className="truncate text-xs text-muted-foreground">
              {admin.displayName ?? admin.email ?? "Administrator"}
            </p>
            <div className="mt-4 flex gap-3 lg:flex-col">
              <Link href="/" target="_blank" className="text-sm font-medium hover:text-accent">
                View Website ↗
              </Link>
              <form action={logoutAction}>
                <button className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Logout
                </button>
              </form>
            </div>
          </div>
        </aside>
        <main className="min-w-0 p-5 sm:p-8 lg:p-10">{children}</main>
      </div>
    </div>
  )
}
