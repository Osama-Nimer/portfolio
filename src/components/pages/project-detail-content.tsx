"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { projectsService } from "@/src/services/api/projects.service"
import { Container } from "@/src/components/ui/container"
import { PageLoader } from "@/src/components/shared/loading-spinner"
import { FadeIn } from "@/src/components/shared/motion-wrapper"
import { META, Tag, pillClass } from "@/src/components/shared/motif"
import { ROUTES } from "@/src/utils/constants"
import { ContactCta } from "@/src/components/sections/contact-cta"

const BACK_LINK =
  "group inline-flex items-center gap-2 rounded-full text-sm text-muted-foreground transition-colors hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export function ProjectDetailContent() {
  const params = useParams()
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
      <section className="relative isolate py-28">
        <div aria-hidden="true" className="fx-glow pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[480px]" />
        <Container size="sm">
          <FadeIn>
            <div className="text-center">
              <p className="font-mono text-[13px] text-subtle">404</p>
              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
                Project not found
              </h1>
              <p className="mx-auto mt-5 max-w-md text-muted-foreground">
                The project you&apos;re looking for doesn&apos;t exist or may have been removed.
              </p>
              <Link href={ROUTES.PROJECTS} className={pillClass({ className: "mt-10" })}>
                <ArrowLeft />
                Back to projects
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
    )
  }

  const project = projectData.data

  return (
    <>
      <section className="relative isolate pb-8 pt-14 sm:pt-20">
        <div aria-hidden="true" className="fx-glow pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[560px]" />
        <Container>
          <FadeIn>
            <Link href={ROUTES.PROJECTS} className={BACK_LINK}>
              <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
              All projects
            </Link>
          </FadeIn>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-16">
            <FadeIn delay={0.05}>
              <div>
                {project.featured && (
                  <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-foreground">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-foreground" />
                    Featured
                  </span>
                )}
                <h1 className="text-balance text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.04em] text-foreground sm:text-[3.5rem]">
                  {project.title}
                </h1>
                <p className="mt-6 max-w-[62ch] whitespace-pre-line text-pretty text-[17px] leading-8 text-muted-foreground">
                  {project.description}
                </p>
              </div>
            </FadeIn>

            {/* Details: label / value rows, like a spec sheet. */}
            <FadeIn delay={0.1}>
              <dl className="divide-y divide-line rounded-xl border border-line bg-card">
                {project.createdAt && (
                  <div className="flex items-center justify-between gap-4 px-5 py-4">
                    <dt className={META}>Date</dt>
                    <dd className="text-sm text-foreground">
                      {new Date(project.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                    </dd>
                  </div>
                )}
                {project.tags && project.tags.length > 0 && (
                  <div className="px-5 py-4">
                    <dt className={META}>Stack</dt>
                    <dd className="mt-3 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <Tag key={tag.id}>{tag.name}</Tag>
                      ))}
                    </dd>
                  </div>
                )}
                {(project.liveUrl || project.githubUrl) && (
                  <div className="flex flex-col gap-2 p-4">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={pillClass({ className: "w-full" })}>
                        <ExternalLink />
                        Live demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={pillClass({ variant: "secondary", className: "w-full" })}
                      >
                        <Github />
                        View code
                      </a>
                    )}
                  </div>
                )}
              </dl>
            </FadeIn>
          </div>

          <FadeIn delay={0.15}>
            <div className="mt-14 overflow-hidden rounded-2xl border border-line bg-muted">
              {project.imageUrl ? (
                <img src={project.imageUrl} alt={project.title} className="aspect-video h-full w-full object-cover" />
              ) : (
                <div className="fx-dots flex aspect-video items-center justify-center">
                  <span className="text-8xl font-semibold tracking-[-0.04em] text-foreground/15">{project.title[0]}</span>
                </div>
              )}
            </div>
          </FadeIn>
        </Container>
      </section>

      <ContactCta title="Like what you see?" muted="Let's build yours" />
    </>
  )
}
