import {
  deleteMediaAction,
  updateMediaAction,
  uploadMediaAction,
} from "@/app/admin/actions"
import type { ProductMediaRow, ProjectMediaRow } from "@/types/database"

export function MediaManager({
  entityType,
  entityId,
  media,
}: {
  entityType: "project" | "product"
  entityId: string
  media: Array<ProjectMediaRow | ProductMediaRow>
}) {
  return (
    <section className="mt-10 border-t border-border pt-8">
      <h2 className="text-xl font-semibold">Media</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        PNG, JPEG, WebP, or AVIF. Maximum 8 MB. Alt text is required.
      </p>
      <form action={uploadMediaAction} className="mt-6 grid gap-4 rounded-xl border border-border bg-surface p-5 md:grid-cols-2">
        <input type="hidden" name="entity_type" value={entityType} />
        <input type="hidden" name="entity_id" value={entityId} />
        <label className="grid gap-2 text-sm font-medium">
          Image
          <input required type="file" name="file" accept="image/png,image/jpeg,image/webp,image/avif" className="admin-input py-2" />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Alt text
          <input required name="alt_text" className="admin-input" />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Caption
          <input name="caption" className="admin-input" />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Layout
          <select name="layout" className="admin-input">
            {['full', 'half', 'mobile', 'cover'].map((value) => <option key={value}>{value}</option>)}
          </select>
        </label>
        <button className="admin-button md:col-span-2">Upload Media</button>
      </form>

      <div className="mt-6 grid gap-5">
        {media.length ? media.map((item) => (
          <div key={item.id} className="rounded-xl border border-border p-5">
            <p className="break-all text-xs text-muted-foreground">{item.storage_path}</p>
            <form action={updateMediaAction} className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <input type="hidden" name="entity_type" value={entityType} />
              <input type="hidden" name="entity_id" value={entityId} />
              <input type="hidden" name="media_id" value={item.id} />
              <label className="grid gap-2 text-sm">Alt text<input required name="alt_text" defaultValue={item.alt_text} className="admin-input" /></label>
              <label className="grid gap-2 text-sm">Caption<input name="caption" defaultValue={item.caption ?? ""} className="admin-input" /></label>
              <label className="grid gap-2 text-sm">Layout<select name="layout" defaultValue={item.layout} className="admin-input">{['full', 'half', 'mobile', 'cover'].map((value) => <option key={value}>{value}</option>)}</select></label>
              <label className="grid gap-2 text-sm">Order<input min="0" type="number" name="sort_order" defaultValue={item.sort_order} className="admin-input" /></label>
              <button className="admin-button-secondary md:col-span-2 lg:col-span-4">Save Media Details</button>
            </form>
            <form action={deleteMediaAction} className="mt-4 flex flex-wrap items-end gap-3 border-t border-border pt-4">
              <input type="hidden" name="entity_type" value={entityType} />
              <input type="hidden" name="entity_id" value={entityId} />
              <input type="hidden" name="media_id" value={item.id} />
              <input type="hidden" name="storage_path" value={item.storage_path} />
              <label className="grid gap-1 text-xs text-muted-foreground">Type DELETE<input required name="confirmation" className="admin-input h-9" /></label>
              <button className="text-sm font-medium text-red-700">Delete Media</button>
            </form>
          </div>
        )) : <p className="text-sm text-muted-foreground">No media uploaded yet.</p>}
      </div>
    </section>
  )
}
