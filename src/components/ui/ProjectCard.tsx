import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Project } from "@/types"
import { cn } from "@/lib/utils"
import { projectKindLabels } from "@/lib/content/labels"

type ProjectCardProps = {
  project: Project
  variant?: "default" | "large"
}

export function ProjectCard({ project, variant = "default" }: ProjectCardProps) {
  const contextLabel =
    project.kind && project.kind !== "client"
      ? projectKindLabels[project.kind]
      : null

  return (
    <Link href={`/work/${project.slug}`} className="group flex flex-col gap-5">
      <div
        className={cn(
          "relative overflow-hidden rounded-[1.5rem] border border-border/60 bg-surface-soft transition-all duration-500 group-hover:border-accent/40 group-hover:shadow-[0_28px_60px_-28px_rgba(17,17,17,0.3)]",
          variant === "large" ? "aspect-[16/10]" : "aspect-[5/4]"
        )}
      >
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes={variant === "large" ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-end bg-[linear-gradient(180deg,rgba(255,255,255,0.5),rgba(246,246,243,1))] p-6 text-left md:p-8">
            <div>
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent">
                {project.category}
              </span>
              <span className="mt-3 block max-w-sm text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                {project.title}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 px-1">
        <div className="flex flex-wrap items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          <span>{project.category}</span>
          <span aria-hidden>·</span>
          <span>{project.year}</span>
          {contextLabel ? (
            <>
              <span aria-hidden>·</span>
              <span className="text-foreground/70">{contextLabel}</span>
            </>
          ) : null}
        </div>

        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-[clamp(1.35rem,2vw,1.9rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-foreground transition-colors group-hover:text-accent">
              {project.title}
            </h3>
            <p className="line-clamp-2 max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground md:text-base">
              {project.shortDescription}
            </p>
          </div>
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-all duration-300 group-hover:-rotate-45 group-hover:border-accent group-hover:text-accent">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
