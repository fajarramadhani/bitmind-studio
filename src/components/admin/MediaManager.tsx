import {
  deleteMediaAction,
  updateMediaAction,
  uploadMediaAction,
} from "@/app/admin/actions"
import type { ProductMediaRow, ProjectMediaRow } from "@/types/database"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"

export async function MediaManager({
  entityType,
  entityId,
  media,
}: {
  entityType: "project" | "product"
  entityId: string
  media: Array<ProjectMediaRow | ProductMediaRow>
}) {
  const adminClient = await createClient()
  const mediaWithUrls = await Promise.all(
    media.map(async (item) => {
      const { data } = await adminClient.storage
        .from(entityType === "project" ? "project-media" : "product-media")
        .createSignedUrl(item.storage_path, 900)
      return { ...item, signedUrl: data?.signedUrl ?? null }
    })
  )

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
        <label className="grid gap-2 text-sm font-medium">Aspect Ratio<input name="aspect_ratio" placeholder="16:9" pattern="[1-9][0-9]*:[1-9][0-9]*" className="admin-input" /></label>
        <label className="grid gap-2 text-sm font-medium">Object Fit<select name="object_fit" className="admin-input"><option value="cover">Cover</option><option value="contain">Contain</option></select></label>
        <button className="admin-button md:col-span-2">Upload Media</button>
      </form>

      <div className="mt-6 grid gap-5">
        {mediaWithUrls.length ? mediaWithUrls.map((item) => (
          <div key={item.id} className="rounded-xl border border-border p-5">
            {item.signedUrl ? <div className="relative mb-4 aspect-video max-w-lg overflow-hidden rounded-lg bg-muted"><Image src={item.signedUrl} alt={item.alt_text} fill sizes="(max-width: 768px) 100vw, 512px" className={item.object_fit === "contain" ? "object-contain" : "object-cover"} /></div> : null}
            <p className="break-all text-xs text-muted-foreground">{item.storage_path}</p>
            <form action={updateMediaAction} className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <input type="hidden" name="entity_type" value={entityType} />
              <input type="hidden" name="entity_id" value={entityId} />
              <input type="hidden" name="media_id" value={item.id} />
              <label className="grid gap-2 text-sm">Alt text<input required name="alt_text" defaultValue={item.alt_text} className="admin-input" /></label>
              <label className="grid gap-2 text-sm">Caption<input name="caption" defaultValue={item.caption ?? ""} className="admin-input" /></label>
              <label className="grid gap-2 text-sm">Layout<select name="layout" defaultValue={item.layout} className="admin-input">{['full', 'half', 'mobile', 'cover'].map((value) => <option key={value}>{value}</option>)}</select></label>
              <label className="grid gap-2 text-sm">Order<input min="0" type="number" name="sort_order" defaultValue={item.sort_order} className="admin-input" /></label>
              <label className="grid gap-2 text-sm">Aspect Ratio<input name="aspect_ratio" pattern="[1-9][0-9]*:[1-9][0-9]*" defaultValue={item.aspect_ratio ?? ""} className="admin-input" /></label>
              <label className="grid gap-2 text-sm">Object Fit<select name="object_fit" defaultValue={item.object_fit} className="admin-input"><option value="cover">Cover</option><option value="contain">Contain</option></select></label>
              <button className="admin-button-secondary md:col-span-2 lg:col-span-4">Save Media Details</button>
            </form>
            <form action={deleteMediaAction} className="mt-4 flex flex-wrap items-end gap-3 border-t border-border pt-4">
              <input type="hidden" name="entity_type" value={entityType} />
              <input type="hidden" name="entity_id" value={entityId} />
              <input type="hidden" name="media_id" value={item.id} />
              <label className="grid gap-1 text-xs text-muted-foreground">Type DELETE<input required name="confirmation" className="admin-input h-9" /></label>
              <button className="text-sm font-medium text-red-700">Delete Media</button>
            </form>
          </div>
        )) : <p className="text-sm text-muted-foreground">No media uploaded yet.</p>}
      </div>
    </section>
  )
}
