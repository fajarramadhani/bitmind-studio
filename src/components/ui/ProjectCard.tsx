import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/Badge"
import type { Project } from "@/types"
import { cn } from "@/lib/utils"
import { projectKindLabels } from "@/lib/content/labels"

type ProjectCardProps = {
  project: Project
  variant?: "default" | "large"
}

export function ProjectCard({ project, variant = "default" }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        "group flex flex-col gap-6",
        variant === "large" ? "w-full" : "w-full"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl bg-muted border border-border/50",
          variant === "large" ? "aspect-[16/9]" : "aspect-[4/3]"
        )}
      >
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes={variant === "large" ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center transition-colors group-hover:border-accent/20">
            <span className="text-sm font-medium tracking-wide text-muted-foreground">
              {project.title}
            </span>
            <span className="mt-1 text-xs text-muted-foreground/60">
              {project.category}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 px-1">
        <div className="flex items-center gap-2">
          <Badge>{project.category}</Badge>
          {project.kind && project.kind !== "client" ? (
            <Badge variant="outline">{projectKindLabels[project.kind]}</Badge>
          ) : null}
          <span className="text-sm text-muted-foreground">{project.year}</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent md:text-2xl">
              {project.title}
            </h3>
            <p className="line-clamp-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {project.shortDescription}
            </p>
          </div>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-all duration-300 group-hover:-rotate-45 group-hover:border-accent group-hover:text-accent">
            →
          </span>
        </div>
      </div>
    </Link>
  )
}
