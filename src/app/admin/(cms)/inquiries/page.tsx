import { AdminNotice } from "@/components/admin/AdminNotice"
import { InquiryStatusForm } from "@/components/admin/InquiryStatusForm"
import { DestructiveActionForm } from "@/components/admin/DestructiveActionForm"
import { getAdminInquiries } from "@/lib/admin/queries"
import type { InquiryRow } from "@/types/database"

const statusLabel: Record<InquiryRow["status"], string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  archived: "Archived",
}

export default async function AdminInquiriesPage() {
  const inquiries = await getAdminInquiries()

  return (
    <>
      <AdminNotice />
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Inquiries
          </p>
          <h1 className="mt-2 text-3xl font-semibold">Manage Inquiries</h1>
        </div>
      </div>
      <div className="mt-8 grid gap-4">
        {inquiries.length ? (
          inquiries.map((inquiry) => (
            <article
              key={inquiry.id}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-semibold ${
                        inquiry.status === "new"
                          ? "bg-brand-primary-soft text-brand-primary-dark"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {statusLabel[inquiry.status]}
                    </span>
                    <span className="text-muted-foreground">
                      {new Date(inquiry.created_at).toLocaleString("id-ID", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                  <h2 className="mt-2 text-lg font-semibold">{inquiry.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {inquiry.email}
                    {inquiry.whatsapp ? ` • ${inquiry.whatsapp}` : ""}
                    {inquiry.company ? ` • ${inquiry.company}` : ""}
                  </p>
                  <div className="mt-3 grid gap-1 text-sm">
                    <p className="text-muted-foreground">
                      <span className="font-medium text-foreground">Project:</span>{" "}
                      {inquiry.project_type} • {inquiry.budget} • {inquiry.timeline}
                    </p>
                    <p className="text-muted-foreground">{inquiry.description}</p>
                    {inquiry.reference ? (
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">Reference:</span>{" "}
                        {inquiry.reference}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap items-end gap-3">
                  <InquiryStatusForm id={inquiry.id} current={inquiry.status} />
                  <DestructiveActionForm action="delete-inquiry" id={inquiry.id} />
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-border p-10 text-center">
            <h2 className="font-semibold">No inquiries yet.</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Submissions from the contact form will appear here.
            </p>
          </div>
        )}
      </div>
    </>
  )
}