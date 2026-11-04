"use client"

import Link from "next/link"
import { ArrowUpRight, ExternalLink, Github } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tag } from "@/src/components/shared/motif"
import type { Project } from "@/src/types/projects.types"

interface ProjectCardProps {
  project: Project
  className?: string
}

/**
 * A project as a framed panel: the image (or a dot field with the initial)
 * above, title and tags below. The whole card links to the project; the live
 * and code links sit outside that link so they stay real, separate links.
 */
export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card transition-colors duration-300 hover:border-line-bold",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-muted">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt=""
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="fx-dots flex h-full items-center justify-center">
            <span className="text-6xl font-semibold tracking-[-0.04em] text-foreground/15">{project.title[0]}</span>
          </div>
        )}

        {project.featured && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-background/90 px-2.5 py-1 font-mono text-[11px] text-foreground">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-foreground" />
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="flex items-start justify-between gap-3 text-lg font-semibold tracking-[-0.02em] text-foreground">
          <Link
            href={`/projects/${project.id}`}
            className="outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:ring-2 focus-visible:after:ring-ring/70"
          >
            {project.title}
          </Link>
          <ArrowUpRight
            aria-hidden="true"
            className="mt-1 size-4 shrink-0 text-subtle transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
          />
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{project.description}</p>

        {project.tags && project.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <Tag key={tag.id}>{tag.name}</Tag>
            ))}
            {project.tags.length > 3 && <Tag>+{project.tags.length - 3}</Tag>}
          </div>
        )}

        {(project.liveUrl || project.githubUrl) && (
          <div className="relative z-10 mt-auto flex items-center gap-4 pt-5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground transition-opacity hover:opacity-70"
              >
                <ExternalLink className="size-3.5" />
                Live demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="size-3.5" />
                Code
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
