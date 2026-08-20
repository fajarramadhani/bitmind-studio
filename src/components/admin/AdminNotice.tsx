"use client"

import { useEffect, useMemo } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useAdminToast } from "@/components/admin/AdminToast"

export function AdminNotice() {
  const { pushToast } = useAdminToast()
  const router = useRouter()
  const pathname = usePathname()
  const currentSearchParams = useSearchParams()

  const toast = useMemo(() => {
    const entity = pathname.includes("/products")
      ? "Product"
      : pathname.includes("/projects")
        ? "Project"
        : "Item"
    const error = currentSearchParams.get("error")
    if (error) {
      const messageMap: Record<string, string> = {
        invalid: "Email or password is incorrect.",
        forbidden: "Email or password is incorrect.",
        confirmation: "Confirmation phrase is incorrect.",
        "invalid-id": "Unable to find that item.",
        "not-found": "Unable to find that item.",
        archive: "Unable to archive item. Please try again.",
        delete: "Unable to delete item. Please try again.",
        "storage-cleanup": "Unable to remove stored media. Please try again.",
        upload: "Unable to upload media. Check the file and try again.",
        "upload-validation": "Select a supported image and provide alt text.",
        "upload-parent": "Unable to find the project or product for this upload.",
        "upload-type": "Use a PNG, JPEG, WebP, or AVIF image up to 8 MB.",
        "upload-orphan": "Unable to complete the media upload. Please try again.",
        "upload-record": "Unable to save the uploaded media. Please try again.",
        "media-validation": "Check the media fields and try again.",
        "media-not-found": "Unable to find that media item.",
        "storage-delete": "Unable to delete the stored media. Please try again.",
        "media-update": "Unable to save media details. Please try again.",
        "delete-media": "Unable to delete media. Please try again.",
      }
      return {
        tone: "error" as const,
        message: messageMap[error] ?? decodeURIComponent(error),
      }
    }

    const successMap: Array<[string, string]> = [
      ["logged-in", "Signed in successfully."],
      ["logged-out", "Signed out successfully."],
      ["saved", `${entity} saved successfully.`],
      ["published", `${entity} published successfully.`],
      ["uploaded", "Media uploaded successfully."],
      ["media-saved", "Media details updated successfully."],
      ["media-deleted", "Media deleted successfully."],
      ["archived", `${entity} archived successfully.`],
      ["deleted", `${entity} deleted successfully.`],
    ]

    const match = successMap.find(([key]) => currentSearchParams.get(key) === "1")
    return match ? { tone: "success" as const, message: match[1] } : null
  }, [currentSearchParams, pathname])

  useEffect(() => {
    if (!toast) return
    pushToast(toast)

    const params = new URLSearchParams(currentSearchParams.toString())
    ;["error", "logged-in", "logged-out", "saved", "published", "uploaded", "media-saved", "media-deleted", "archived", "deleted"].forEach((key) => {
      params.delete(key)
    })
    const next = params.toString()
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false })
  }, [currentSearchParams, pathname, pushToast, router, toast])

  return null
}
