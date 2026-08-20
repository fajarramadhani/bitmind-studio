export function AdminDashboardSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <div className="h-3 w-20 animate-pulse rounded bg-muted" />
          <div className="h-9 w-56 animate-pulse rounded bg-muted" />
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="h-11 w-32 animate-pulse rounded-lg bg-muted" />
          <div className="h-11 w-32 animate-pulse rounded-lg bg-muted" />
        </div>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <section key={index} className="rounded-xl border border-border bg-surface p-5">
            <div className="h-4 w-28 animate-pulse rounded bg-muted" />
            <div className="mt-5 h-10 w-16 animate-pulse rounded bg-muted" />
          </section>
        ))}
      </div>
    </>
  )
}

export function AdminListSkeleton({ title }: { title: string }) {
  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-3">
          <div className="h-3 w-20 animate-pulse rounded bg-muted" />
          <div className="h-9 w-56 animate-pulse rounded bg-muted" />
        </div>
        <div className="h-11 w-32 animate-pulse rounded-lg bg-muted" />
      </div>
      <div className="mt-8 grid gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <article key={`${title}-${index}`} className="rounded-xl border border-border bg-surface p-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-12 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-10 animate-pulse rounded bg-muted" />
                </div>
                <div className="h-6 w-56 animate-pulse rounded bg-muted" />
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
              </div>
              <div className="flex flex-wrap gap-3">
                {Array.from({ length: 4 }).map((__, buttonIndex) => (
                  <div key={buttonIndex} className="h-11 w-24 animate-pulse rounded-lg bg-muted" />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
