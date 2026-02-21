"use client"

import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { BadgeCustom } from "./badge-custom"
import type { Project } from "@/src/types/projects.types"

interface ProjectCardProps {
  project: Project
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg hover:border-main/50",
        className,
      )}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image */}
      <div className="aspect-video overflow-hidden bg-muted relative">
        {project.imageUrl ? (
          <img
            src={project.imageUrl || "/placeholder.svg"}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-4xl font-bold text-main/30">{project.title[0]}</span>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 left-3">
            <BadgeCustom variant="primary" size="sm">
              Featured
            </BadgeCustom>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-main transition-colors">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{project.description}</p>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <BadgeCustom key={tag.id} variant="outline" size="sm">
                {tag.name}
              </BadgeCustom>
            ))}
            {project.tags.length > 3 && (
              <BadgeCustom variant="secondary" size="sm">
                +{project.tags.length - 3}
              </BadgeCustom>
            )}
          </div>
        )}

        {/* Links */}
        <div className="mt-4 flex items-center gap-3">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-main hover:text-main-dark transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </Link>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
              Code
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  )
}
