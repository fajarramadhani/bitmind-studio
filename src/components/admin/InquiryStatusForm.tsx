"use client"

import { useState } from "react"
import { updateInquiryStatusAction } from "@/app/admin/actions"
import type { InquiryRow } from "@/types/database"
import { SubmitButton } from "@/components/admin/SubmitButton"

const statusOptions: Array<{ value: InquiryRow["status"]; label: string }> = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "archived", label: "Archived" },
]

export function InquiryStatusForm({
  id,
  current,
}: {
  id: string
  current: InquiryRow["status"]
}) {
  const [status, setStatus] = useState<InquiryRow["status"]>(current)

  return (
    <form
      action={updateInquiryStatusAction}
      className="flex flex-wrap items-end gap-2"
    >
      <input type="hidden" name="id" value={id} />
      <label className="grid gap-1 text-xs text-muted-foreground">
        Status
        <select
          name="status"
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as InquiryRow["status"])
          }
          className="admin-input h-9"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <SubmitButton pendingLabel="Saving..." variant="secondary">
        Update
      </SubmitButton>
    </form>
  )
}