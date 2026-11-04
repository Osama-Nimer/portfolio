"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { projectsService } from "@/src/services/api/projects.service"
import { Container } from "@/src/components/ui/container"
import { PageHeader } from "@/src/components/shared/page-header"
import { ProjectCard } from "@/src/components/ui/project-card"
import { PageLoader } from "@/src/components/shared/loading-spinner"
import { cn } from "@/lib/utils"
import { StaggerContainer, StaggerItem } from "@/src/components/shared/motion-wrapper"
import { EmptyState } from "@/src/components/shared/empty-state"

const FILTER =
  "rounded-full border px-3.5 py-1.5 font-mono text-[12px] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"

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

  const projects = projectsData?.data || []
  const tags = tagsData?.data || []
  const filters = [{ id: null as number | null, name: "All" }, ...tags.map((t) => ({ id: t.id as number | null, name: t.name }))]

  return (
    <>
      <PageHeader
        path="projects"
        title="Selected work"
        muted="and side projects"
        lead="Products, tools and experiments I've designed and built, from first commit to production."
      >
        {tags.length > 0 && (
          <div role="group" aria-label="Filter by technology" className="mt-10 flex flex-wrap gap-2">
            {filters.map((f) => {
              const active = selectedTag === f.id
              return (
                <button
                  key={f.id ?? "all"}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedTag(f.id)}
                  className={cn(
                    FILTER,
                    active
                      ? "border-transparent bg-primary text-primary-foreground"
                      : "border-line text-muted-foreground hover:border-line-bold hover:text-foreground",
                  )}
                >
                  {f.name}
                </button>
              )
            })}
          </div>
        )}
      </PageHeader>

      <section>
        <Container>
          {projectsLoading ? (
            <PageLoader />
          ) : projects.length > 0 ? (
            <StaggerContainer key={selectedTag ?? "all"} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <StaggerItem key={project.id} className="h-full">
                  <ProjectCard project={project} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <EmptyState>No projects match this filter.</EmptyState>
          )}
        </Container>
      </section>
    </>
  )
}
