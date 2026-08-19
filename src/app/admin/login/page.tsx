import Link from "next/link"
import { BrandLogo } from "@/components/brand/BrandLogo"
import { loginAction } from "@/app/admin/actions"
import { hasSupabaseConfig } from "@/lib/content/config"

export const metadata = { title: "Admin Login", robots: { index: false, follow: false } }

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const configured = hasSupabaseConfig()
  const error = params.error

  return (
    <div className="fixed inset-0 z-[80] flex min-h-dvh items-center justify-center bg-background p-5">
      <main className="w-full max-w-md rounded-2xl border border-border bg-surface p-7 shadow-sm sm:p-9">
        <BrandLogo />
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Content Management
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Admin Login</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Authorized BITMIND administrators only. Public signup is not available.
        </p>

        {!configured ? (
          <div className="mt-7 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
            Supabase backend is not configured. CMS functionality requires the
            environment variables documented in `docs/supabase-setup.md`.
          </div>
        ) : (
          <form action={loginAction} className="mt-7 grid gap-5">
            {error ? (
              <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                {error === "forbidden" ? "This account is not authorized as an administrator." : "Invalid email or password."}
              </p>
            ) : null}
            <label className="grid gap-2 text-sm font-medium">Email<input required type="email" name="email" autoComplete="email" className="admin-input" /></label>
            <label className="grid gap-2 text-sm font-medium">Password<input required type="password" name="password" autoComplete="current-password" className="admin-input" /></label>
            <button className="admin-button">Login</button>
          </form>
        )}
        <Link href="/" className="mt-6 inline-flex text-sm text-muted-foreground hover:text-foreground">← Back to website</Link>
      </main>
    </div>
  )
}
