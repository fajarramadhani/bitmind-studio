export function AdminNotice({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  const error = typeof searchParams?.error === "string" ? searchParams.error : null
  const success = ["saved", "uploaded", "media-saved", "media-deleted"].some(
    (key) => searchParams?.[key] === "1"
  )

  if (!error && !success) return null

  return (
    <p
      role="status"
      className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
        error
          ? "border-red-200 bg-red-50 text-red-800"
          : "border-green-200 bg-green-50 text-green-800"
      }`}
    >
      {error ? decodeURIComponent(error) : "Changes saved successfully."}
    </p>
  )
}
