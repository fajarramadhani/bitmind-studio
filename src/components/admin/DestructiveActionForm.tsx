"use client"

import { useState } from "react"
import {
  archiveProductAction,
  archiveProjectAction,
  deleteMediaAction,
  deleteProductAction,
  deleteProjectAction,
} from "@/app/admin/actions"
import { SubmitButton } from "@/components/admin/SubmitButton"

type DestructiveActionFormProps = {
  action: "archive-project" | "delete-project" | "archive-product" | "delete-product" | "delete-media"
  id?: string
  entityType?: "project" | "product"
  entityId?: string
  mediaId?: string
}

const actions = {
  "archive-project": archiveProjectAction,
  "delete-project": deleteProjectAction,
  "archive-product": archiveProductAction,
  "delete-product": deleteProductAction,
  "delete-media": deleteMediaAction,
} as const

export function DestructiveActionForm({ action, id, entityType, entityId, mediaId }: DestructiveActionFormProps) {
  const confirmation = action.startsWith("archive") ? "ARCHIVE" : "DELETE"
  const label = action.startsWith("archive") ? "Archive" : action === "delete-media" ? "Delete Media" : "Delete"
  const pendingLabel = action.startsWith("archive") ? "Archiving..." : "Deleting..."
  const [error, setError] = useState<string | null>(null)

  return (
    <form
      action={actions[action]}
      onSubmit={(event) => {
        const data = new FormData(event.currentTarget)
        if (data.get("confirmation") !== confirmation) {
          event.preventDefault()
          setError(`Type ${confirmation} exactly to continue.`)
        } else {
          setError(null)
        }
      }}
      className="flex flex-wrap items-end gap-2"
    >
      {id ? <input type="hidden" name="id" value={id} /> : null}
      {entityType ? <input type="hidden" name="entity_type" value={entityType} /> : null}
      {entityId ? <input type="hidden" name="entity_id" value={entityId} /> : null}
      {mediaId ? <input type="hidden" name="media_id" value={mediaId} /> : null}
      <label className="grid gap-1 text-xs text-muted-foreground">
        Type {confirmation}
        <input
          required
          name="confirmation"
          autoComplete="off"
          className="admin-input h-9 w-28"
          aria-invalid={Boolean(error)}
          onChange={() => error && setError(null)}
        />
      </label>
      <SubmitButton
        pendingLabel={pendingLabel}
        variant={action.startsWith("archive") ? "secondary" : "danger"}
      >
        {label}
      </SubmitButton>
      {error ? <p role="alert" className="w-full text-xs font-medium text-red-700">{error}</p> : null}
    </form>
  )
}
