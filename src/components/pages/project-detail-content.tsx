"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { ArrowLeft, ExternalLink, Github, Calendar, Star } from "lucide-react"
import { motion } from "framer-motion"
import { projectsService } from "@/src/services/api/projects.service"
import { Container } from "@/src/components/ui/container"
import { BadgeCustom } from "@/src/components/ui/badge-custom"
import { Button } from "@/components/ui/button"
import { PageLoader } from "@/src/components/shared/loading-spinner"
import { FadeIn, StaggerContainer, StaggerItem } from "@/src/components/shared/motion-wrapper"
import { ROUTES } from "@/src/utils/constants"

export function ProjectDetailContent() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id)

  const {
    data: projectData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["project", id],
    queryFn: () => projectsService.getById(id),
    enabled: !isNaN(id),
  })

  if (isLoading) return <PageLoader />

  if (isError || !projectData?.data) {
    return (
      <section className="py-20">
        <Container>
          <FadeIn>
            <div className="flex flex-col items-center justify-center text-center py-20">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                <span className="text-3xl">🔍</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Project Not Found</h2>
              <p className="text-muted-foreground mb-8 max-w-md">
                The project you're looking for doesn't exist or may have been removed.
              </p>
              <Button
                onClick={() => router.push(ROUTES.PROJECTS)}
                className="bg-main text-foreground hover:bg-main-dark"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    )
  }

  const project = projectData.data

  return (
    <section className="py-10">
      <Container>
        {/* Back Button */}
        <FadeIn>
          <Button
            variant="ghost"
            onClick={() => router.push(ROUTES.PROJECTS)}
            className="mb-8 text-muted-foreground hover:text-foreground group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Projects
          </Button>
        </FadeIn>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Hero Image — takes 3 columns */}
          <FadeIn className="lg:col-span-3">
            <motion.div
              className="relative overflow-hidden rounded-xl border border-border bg-muted aspect-video"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-main/10 to-main/5">
                  <span className="text-7xl font-bold text-main/30">{project.title[0]}</span>
                </div>
              )}

              {/* Featured badge overlay */}
              {project.featured && (
                <div className="absolute top-4 left-4">
                  <BadgeCustom variant="primary" size="sm">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Featured
                  </BadgeCustom>
                </div>
              )}
            </motion.div>
          </FadeIn>

          {/* Project Info — takes 2 columns */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <FadeIn delay={0.1}>
              <h1 className="text-3xl font-bold text-foreground lg:text-4xl">
                {project.title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-muted-foreground leading-relaxed text-base">
                {project.description}
              </p>
            </FadeIn>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <FadeIn delay={0.2}>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <BadgeCustom key={tag.id} variant="outline" size="sm">
                      {tag.name}
                    </BadgeCustom>
                  ))}
                </div>
              </FadeIn>
            )}

            {/* Meta info */}
            {project.createdAt && (
              <FadeIn delay={0.25}>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(project.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </FadeIn>
            )}

            {/* Action buttons */}
            <FadeIn delay={0.3}>
              <div className="flex flex-wrap gap-3 pt-2">
                {project.liveUrl && (
                  <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-main text-foreground hover:bg-main-dark" size="lg">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                  </Link>
                )}
                {project.githubUrl && (
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg">
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </Button>
                  </Link>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  )
}
