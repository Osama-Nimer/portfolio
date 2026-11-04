"use client"

import { useQuery } from "@tanstack/react-query"
import { projectsService } from "@/src/services/api/projects.service"
import { Container } from "@/src/components/ui/container"
import { SectionHeader } from "@/src/components/shared/section-header"
import { ProjectCard } from "@/src/components/ui/project-card"
import { ROUTES } from "@/src/utils/constants"
import { StaggerContainer, StaggerItem } from "@/src/components/shared/motion-wrapper"

export function ProjectsPreview() {
  const { data } = useQuery({
    queryKey: ["projects", { featured: true }],
    queryFn: () => projectsService.getAll({ featured: true }),
  })

  const projects = data?.data?.slice(0, 3) || []

  return (
    <section className="py-24 sm:py-28">
      <Container>
        <SectionHeader
          title="Selected work"
          muted="shipped and running"
          subtitle="A few recent projects, from first commit to production."
          href={ROUTES.PROJECTS}
          linkLabel="All projects"
        />

        <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <StaggerItem key={project.id} className="h-full">
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}
