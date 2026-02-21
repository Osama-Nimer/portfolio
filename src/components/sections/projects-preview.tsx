"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { projectsService } from "@/src/services/api/projects.service"
import { Container } from "@/src/components/ui/container"
import { SectionTitle } from "@/src/components/shared/section-title"
import { ProjectCard } from "@/src/components/ui/project-card"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/src/utils/constants"
import { StaggerContainer, StaggerItem, FadeIn } from "@/src/components/shared/motion-wrapper"

export function ProjectsPreview() {
  const { data } = useQuery({
    queryKey: ["projects", { featured: true }],
    queryFn: () => projectsService.getAll({ featured: true }),
  })

  const projects = data?.data?.slice(0, 3) || []

  return (
    <section className="py-20 bg-secondary/30">
      <Container>
        <SectionTitle title="Featured Projects" subtitle="Some of my recent work" />

        <StaggerContainer staggerDelay={0.15} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3}>
          <div className="mt-12 text-center">
            <Link href={ROUTES.PROJECTS}>
              <Button className="bg-main text-foreground hover:bg-main-dark" size="lg">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
