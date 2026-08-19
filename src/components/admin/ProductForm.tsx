import Link from "next/link"
import { saveProductAction } from "@/app/admin/actions"
import { SlugFields } from "@/components/admin/SlugFields"
import type { ProductRow } from "@/types/database"

export function ProductForm({ product }: { product?: ProductRow }) {
  return (
    <form action={saveProductAction} className="grid gap-8">
      <input type="hidden" name="id" value={product?.id ?? ""} />
      <input type="hidden" name="old_slug" value={product?.slug ?? ""} />
      <SlugFields title={product?.title} slug={product?.slug} />
      <label className="grid gap-2 text-sm font-medium">Category<input required name="category" defaultValue={product?.category ?? ""} className="admin-input" /></label>
      <label className="grid gap-2 text-sm font-medium">Short Description<textarea required rows={3} name="short_description" defaultValue={product?.short_description ?? ""} className="admin-input" /></label>
      <label className="grid gap-2 text-sm font-medium">Description<textarea rows={7} name="description" defaultValue={product?.description ?? ""} className="admin-input" /></label>
      <div className="grid gap-5 md:grid-cols-3">
        <label className="grid gap-2 text-sm font-medium">Availability<select name="availability_status" defaultValue={product?.availability_status ?? "coming-soon"} className="admin-input"><option value="coming-soon">Coming Soon</option><option value="available">Available</option><option value="unavailable">Unavailable</option></select></label>
        <label className="grid gap-2 text-sm font-medium">Publish Status<select name="publish_status" defaultValue={product?.publish_status ?? "draft"} className="admin-input"><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
        <label className="grid gap-2 text-sm font-medium">Sort Order<input min="0" type="number" name="sort_order" defaultValue={product?.sort_order ?? 0} className="admin-input" /></label>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        <label className="grid gap-2 text-sm font-medium">Price<input min="0" step="0.01" type="number" name="price" defaultValue={product?.price ?? ""} className="admin-input" /></label>
        <label className="grid gap-2 text-sm font-medium">Currency<input maxLength={3} name="currency" defaultValue={product?.currency ?? "IDR"} className="admin-input uppercase" /></label>
        <label className="flex items-center gap-3 self-end rounded-lg border border-border p-3 text-sm font-medium"><input type="checkbox" name="featured" defaultChecked={product?.featured ?? false} /> Featured product</label>
      </div>
      <label className="grid gap-2 text-sm font-medium">Demo URL<input type="url" name="demo_url" defaultValue={product?.demo_url ?? ""} className="admin-input" /></label>
      <label className="grid gap-2 text-sm font-medium">Purchase URL<input type="url" name="purchase_url" defaultValue={product?.purchase_url ?? ""} className="admin-input" /></label>
      <div className="flex flex-wrap gap-3 border-t border-border pt-6">
        <button className="admin-button">{product ? "Save Product" : "Create Product"}</button>
        <Link href="/admin/products" className="admin-button-secondary">Cancel</Link>
      </div>
    </form>
  )
}
