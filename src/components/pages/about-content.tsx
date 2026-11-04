"use client"

import { ArrowUpRight, Award, Download, MapPin } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { aboutService } from "@/src/services/api/about.service"
import { experienceService } from "@/src/services/api/experience.service"
import { Container } from "@/src/components/ui/container"
import { SectionTitle } from "@/src/components/shared/section-title"
import { formatDateRange } from "@/src/utils/formatters"
import { PageLoader } from "@/src/components/shared/loading-spinner"
import { FadeIn, StaggerContainer, StaggerItem } from "@/src/components/shared/motion-wrapper"
import { PathDivider, RingNode, pillClass } from "@/src/components/shared/motif"
import { ContactCta } from "@/src/components/sections/contact-cta"

const FALLBACK_DESCRIPTION = `I'm a full-stack developer who builds modern web applications, from the database to the last pixel. My journey started with curiosity about how the web works and grew into a career solving real problems with clean, maintainable code.

I work mostly in the JavaScript and TypeScript ecosystem: React, Next.js, Node.js and relational databases, and I care about performance, accessibility and code that the next person can read.`

export function AboutContent() {
  const { data: aboutData, isLoading: aboutLoading } = useQuery({
    queryKey: ["about"],
    queryFn: () => aboutService.getAll(),
  })

  const { data: socialData } = useQuery({
    queryKey: ["social-links"],
    queryFn: () => aboutService.getAllSocialLinks(),
  })

  const { data: experienceData } = useQuery({
    queryKey: ["experience"],
    queryFn: () => experienceService.getAll(),
  })

  const { data: certificatesData } = useQuery({
    queryKey: ["certificates"],
    queryFn: () => experienceService.getAllCertificates(),
  })

  if (aboutLoading) return <PageLoader />

  const about = aboutData?.data?.[0]
  const socialLinks = socialData?.data || []
  const experiences = experienceData?.data || []
  const certificates = certificatesData?.data || []

  return (
    <>
      {/* Intro */}
      <section className="relative isolate pb-20 pt-20 sm:pb-24 sm:pt-28">
        <div aria-hidden="true" className="fx-glow pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[560px]" />
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
            <FadeIn>
              <p className="font-mono text-[13px] text-subtle">
                <span className="text-foreground/60">~</span>/about
              </p>
              <h1 className="mt-5 text-balance text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.04em] text-foreground sm:text-[3.5rem]">
                {about?.title || (
                  <>
                    Building the future, <span className="text-foreground/40">one line at a time</span>
                  </>
                )}
              </h1>
              <p className="mt-8 max-w-[62ch] whitespace-pre-line text-pretty text-[17px] leading-8 text-muted-foreground">
                {about?.description || FALLBACK_DESCRIPTION}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                {about?.resumeUrl && (
                  <a href={about.resumeUrl} target="_blank" rel="noopener noreferrer" className={pillClass()}>
                    <Download />
                    Download resume
                  </a>
                )}
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={pillClass({ variant: "secondary", size: "sm", className: "group" })}
                  >
                    {link.platform}
                    <ArrowUpRight className="text-subtle transition-colors group-hover:text-foreground" />
                  </a>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <figure className="relative mx-auto max-w-sm lg:max-w-none">
                <div className="overflow-hidden rounded-2xl border border-line bg-muted">
                  <img
                    src={about?.imageUrl || "/professional-developer-working.png"}
                    alt="Osama Nimer"
                    className="aspect-[4/5] h-full w-full object-cover"
                  />
                </div>
                <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-full border border-line bg-background/90 px-4 py-2 backdrop-blur">
                  <span className="inline-flex items-center gap-2 text-[13px] text-foreground">
                    <RingNode live className="size-2" />
                    Open to work
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-subtle">
                    <MapPin className="size-3" />
                    Amman, JO
                  </span>
                </figcaption>
              </figure>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Experience: one path, a ring node per role (the current one breathes). */}
      {experiences.length > 0 && (
        <>
          <PathDivider />
          <section className="py-24 sm:py-28">
            <Container>
              <SectionTitle title="Experience" muted="so far" subtitle="Where I've worked and what I've built along the way." />

              <ol className="relative space-y-8">
                <span aria-hidden="true" className="absolute bottom-3 left-[4px] top-3 w-px bg-line-strong md:left-[calc(12rem+4px)]" />
                {experiences.map((exp, index) => (
                  <li key={exp.id}>
                    <FadeIn delay={index * 0.05} className="relative grid gap-3 pl-8 md:grid-cols-[12rem_1fr] md:gap-0 md:pl-0">
                      <span className="font-mono text-[12px] text-subtle md:pr-10 md:pt-1 md:text-right">
                        {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-1.5 md:left-[12rem]"
                      >
                        <RingNode live={exp.current} className={`size-[9px] ${exp.current ? "text-foreground" : "text-node"}`} />
                      </span>
                      <div className="md:pl-10">
                        <div className="rounded-xl border border-line bg-card p-6 transition-colors hover:border-line-strong">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">{exp.position}</h3>
                              <p className="mt-0.5 text-sm text-muted-foreground">
                                {exp.company}
                                {exp.location && <span className="text-subtle"> · {exp.location}</span>}
                              </p>
                            </div>
                            {exp.current && (
                              <span className="rounded-full border border-line-strong px-2.5 py-0.5 font-mono text-[11px] text-foreground">
                                Current
                              </span>
                            )}
                          </div>
                          {exp.description && (
                            <p className="mt-4 whitespace-pre-line text-sm leading-6 text-muted-foreground">{exp.description}</p>
                          )}
                        </div>
                      </div>
                    </FadeIn>
                  </li>
                ))}
              </ol>
            </Container>
          </section>
        </>
      )}

      {/* Certifications */}
      {certificates.length > 0 && (
        <>
          <PathDivider />
          <section className="py-24 sm:py-28">
            <Container>
              <SectionTitle title="Certifications" muted="and credentials" />

              <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {certificates.map((cert) => (
                  <StaggerItem key={cert.id} className="h-full">
                    <div className="flex h-full flex-col rounded-xl border border-line bg-card p-6 transition-colors hover:border-line-bold">
                      <span className="inline-flex size-10 items-center justify-center rounded-lg border border-line-strong bg-foreground/[0.03] text-foreground">
                        <Award className="size-[18px]" />
                      </span>
                      <h3 className="mt-5 font-semibold tracking-[-0.01em] text-foreground">{cert.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{cert.issuer}</p>
                      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                        <span className="font-mono text-[12px] text-subtle">
                          {new Date(cert.issueDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                        </span>
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1 text-[13px] font-medium text-foreground transition-opacity hover:opacity-70"
                          >
                            Credential
                            <ArrowUpRight className="size-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </Container>
          </section>
        </>
      )}

      <ContactCta />
    </>
  )
}
