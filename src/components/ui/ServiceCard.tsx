import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Service } from "@/types"

type ServiceCardProps = {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/30 hover:bg-muted"
    >
      <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
        {service.title}
      </h3>
      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {service.shortDescription}
      </p>
      <div className="mt-auto flex items-center gap-1 pt-2 text-sm font-medium text-accent opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
        Learn more
        <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  )
}
