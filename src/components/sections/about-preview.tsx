"use client"

import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { aboutService } from "@/src/services/api/about.service"
import { Container } from "@/src/components/ui/container"
import { ROUTES } from "@/src/utils/constants"
import { FadeIn } from "@/src/components/shared/motion-wrapper"
import { META, SECTION_TITLE, pillClass } from "@/src/components/shared/motif"

export function AboutPreview() {
  const { data } = useQuery({
    queryKey: ["about"],
    queryFn: () => aboutService.getAll(),
  })

  const aboutData = data?.data?.[0]

  return (
    <section aria-labelledby="about-heading" className="py-24 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <FadeIn>
            <figure className="relative">
              <div className="overflow-hidden rounded-2xl border border-line bg-muted">
                <img
                  src={aboutData?.imageUrl || "/professional-developer-portrait.png"}
                  alt="Osama Nimer"
                  className="aspect-[4/5] h-full w-full object-cover"
                />
              </div>
              <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-full border border-line bg-background/90 px-4 py-2 backdrop-blur">
                <span className="text-[13px] font-medium text-foreground">Osama Nimer</span>
                <span className="font-mono text-[11px] text-subtle">Amman, JO</span>
              </figcaption>
            </figure>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div>
              <p className={META}>About</p>
              <h2 id="about-heading" className={`mt-4 ${SECTION_TITLE}`}>
                {aboutData?.title || (
                  <>
                    Developer by trade, <span className="text-foreground/40">problem solver by habit</span>
                  </>
                )}
              </h2>
              <p className="mt-6 max-w-[58ch] whitespace-pre-line text-pretty text-base leading-7 text-muted-foreground sm:text-[17px]">
                {aboutData?.description ||
                  "I bring ideas to life through clean code and thoughtful design, building modern web applications that are fast, accessible and easy to maintain."}
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link href={ROUTES.ABOUT} className={pillClass({ className: "group" })}>
                  More about me
                  <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
                {aboutData?.resumeUrl && (
                  <a href={aboutData.resumeUrl} target="_blank" rel="noopener noreferrer" className={pillClass({ variant: "secondary" })}>
                    <Download />
                    Resume
                  </a>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
