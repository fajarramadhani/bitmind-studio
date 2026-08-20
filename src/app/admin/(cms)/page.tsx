import Link from "next/link"
import { getAdminProducts, getAdminProjects } from "@/lib/admin/queries"
import { AdminNotice } from "@/components/admin/AdminNotice"

export const metadata = { title: "CMS Overview", robots: { index: false, follow: false } }

export default async function AdminDashboardPage() {
  const [projects, products] = await Promise.all([
    getAdminProjects(),
    getAdminProducts(),
  ])
  const metrics = [
    ["Total Projects", projects.length],
    ["Published Projects", projects.filter((item) => item.publish_status === "published").length],
    ["Draft Projects", projects.filter((item) => item.publish_status === "draft").length],
    ["Total Products", products.length],
    ["Published Products", products.filter((item) => item.publish_status === "published").length],
    ["Coming Soon", products.filter((item) => item.availability_status === "coming-soon").length],
  ] as const

  return (
    <>
      <AdminNotice />
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Overview</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">Content Dashboard</h1></div>
        <div className="flex flex-wrap gap-3"><Link href="/admin/projects/new" className="admin-button">+ New Project</Link><Link href="/admin/products/new" className="admin-button-secondary">+ New Product</Link></div>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map(([label, value]) => <section key={label} className="rounded-xl border border-border bg-surface p-5"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-5 text-4xl font-semibold">{value}</p></section>)}
      </div>
    </>
  )
}
