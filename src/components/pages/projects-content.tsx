"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { projectsService } from "@/src/services/api/projects.service"
import { Container } from "@/src/components/ui/container"
import { SectionTitle } from "@/src/components/shared/section-title"
import { ProjectCard } from "@/src/components/ui/project-card"
import { PageLoader } from "@/src/components/shared/loading-spinner"
import { cn } from "@/lib/utils"

export function ProjectsContent() {
  const [selectedTag, setSelectedTag] = useState<number | null>(null)

  const { data: projectsData, isLoading: projectsLoading } = useQuery({
    queryKey: ["projects", { tagId: selectedTag }],
    queryFn: () => projectsService.getAll(selectedTag ? { tagId: selectedTag } : undefined),
  })

  const { data: tagsData } = useQuery({
    queryKey: ["tags"],
    queryFn: () => projectsService.getAllTags(),
  })

  if (projectsLoading) return <PageLoader />

  const projects = projectsData?.data || []
  const tags = tagsData?.data || []

  return (
    <section className="py-20">
      <Container>
        <SectionTitle title="My Projects" subtitle="A collection of my work and side projects" />

        {/* Filter by tags */}
        {tags.length > 0 && (
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                selectedTag === null ? "bg-main text-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80",
              )}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setSelectedTag(tag.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  selectedTag === tag.id
                    ? "bg-main text-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80",
                )}
              >
                {tag.name}
              </button>
            ))}
          </div>
        )}

        {/* Projects grid */}
        {projects.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found.</p>
          </div>
        )}
      </Container>
    </section>
  )
}
