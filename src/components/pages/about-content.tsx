"use client"

import Link from "next/link"
import { Download, MapPin, Calendar, Award } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { aboutService } from "@/src/services/api/about.service"
import { experienceService } from "@/src/services/api/experience.service"
import { Container } from "@/src/components/ui/container"
import { SectionTitle } from "@/src/components/shared/section-title"
import { Button } from "@/components/ui/button"
import { BadgeCustom } from "@/src/components/ui/badge-custom"
import { formatDateRange } from "@/src/utils/formatters"
import { PageLoader } from "@/src/components/shared/loading-spinner"

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
      {/* Hero Section */}
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                {about?.imageUrl ? (
                  <img
                    src={about.imageUrl || "/placeholder.svg"}
                    alt="About me"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img src="/professional-developer-working.png" alt="About me" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="absolute -bottom-6 -right-6 h-full w-full rounded-2xl border-2 border-main -z-10" />
            </div>

            {/* Content */}
            <div>
              <BadgeCustom variant="primary" className="mb-4">
                About Me
              </BadgeCustom>
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl mb-6">
                {about?.title || "Building the Future, One Line at a Time"}
              </h1>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {about?.description ||
                  `I'm a passionate full-stack developer with over 5 years of experience in building modern web applications. My journey in tech started with a curiosity about how things work on the internet, and it has evolved into a career where I get to solve complex problems and create meaningful digital experiences.

I specialize in JavaScript/TypeScript ecosystems, with expertise in React, Next.js, Node.js, and various databases. I believe in writing clean, maintainable code and following best practices in software development.

When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through blog posts and community meetups.`}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                {about?.resumeUrl && (
                  <Link href={about.resumeUrl} target="_blank">
                    <Button className="bg-main text-foreground hover:bg-main-dark">
                      <Download className="mr-2 h-4 w-4" />
                      Download Resume
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Experience Section */}
      {experiences.length > 0 && (
        <section className="py-20 bg-secondary/30">
          <Container>
            <SectionTitle title="Work Experience" subtitle="My professional journey" />

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:left-1/2" />

              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <div
                    key={exp.id}
                    className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 w-3 h-3 bg-main rounded-full -translate-x-1 md:left-1/2 md:-translate-x-1.5" />

                    {/* Content */}
                    <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                      <div className="rounded-xl border border-border bg-card p-6">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{exp.position}</h3>
                          {exp.current && (
                            <BadgeCustom variant="success" size="sm">
                              Current
                            </BadgeCustom>
                          )}
                        </div>
                        <p className="text-main font-medium">{exp.company}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                          </span>
                          {exp.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {exp.location}
                            </span>
                          )}
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground">{exp.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Certificates Section */}
      {certificates.length > 0 && (
        <section className="py-20">
          <Container>
            <SectionTitle title="Certifications" subtitle="Professional credentials and achievements" />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="rounded-xl border border-border bg-card p-6 hover:border-main/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Award className="h-10 w-10 text-main" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{cert.name}</h3>
                      <p className="text-sm text-main">{cert.issuer}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Issued: {new Date(cert.issueDate).toLocaleDateString()}
                      </p>
                      {cert.credentialUrl && (
                        <Link
                          href={cert.credentialUrl}
                          target="_blank"
                          className="mt-2 inline-block text-sm text-main hover:underline"
                        >
                          View Credential
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
