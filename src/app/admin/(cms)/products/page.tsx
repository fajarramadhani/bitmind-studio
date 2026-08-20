import Link from "next/link"
import { AdminNotice } from "@/components/admin/AdminNotice"
import { DestructiveActionForm } from "@/components/admin/DestructiveActionForm"
import { getAdminProducts } from "@/lib/admin/queries"

export default async function AdminProductsPage() {
  const products = await getAdminProducts()

  return (
    <>
      <AdminNotice />
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Products
          </p>
          <h1 className="mt-2 text-3xl font-semibold">Manage Products</h1>
        </div>
        <Link href="/admin/products/new" className="admin-button">
          + New Product
        </Link>
      </div>
      <div className="mt-8 grid gap-4">
        {products.length ? (
          products.map((product) => (
            <article
              key={product.id}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span>{product.availability_status}</span>
                    <span>•</span>
                    <span>{product.publish_status}</span>
                    {product.featured ? <span className="text-accent">Featured</span> : null}
                  </div>
                  <h2 className="mt-2 text-lg font-semibold">{product.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {product.category}
                    {product.price !== null
                      ? ` • ${new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: product.currency,
                          maximumFractionDigits: 0,
                        }).format(product.price)}`
                      : ""}
                  </p>
                </div>
                <div className="flex flex-wrap items-end gap-3">
                  <Link href={`/admin/products/${product.id}/edit`} className="admin-button-secondary">Edit</Link>
                  <Link href={`/admin/preview/products/${product.id}`} target="_blank" className="admin-button-secondary">Preview</Link>
                  <DestructiveActionForm action="archive-product" id={product.id} />
                  <DestructiveActionForm action="delete-product" id={product.id} />
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-border p-10 text-center">
            <h2 className="font-semibold">No products yet.</h2>
            <Link href="/admin/products/new" className="mt-3 inline-flex text-sm text-accent">
              Create your first product.
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
