"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { aboutService } from "@/src/services/api/about.service"
import { Container } from "@/src/components/ui/container"
import { SectionTitle } from "@/src/components/shared/section-title"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/src/utils/constants"

export function AboutPreview() {
  const { data } = useQuery({
    queryKey: ["about"],
    queryFn: () => aboutService.getAll(),
  })

  const aboutData = data?.data?.[0]

  return (
    <section className="py-20 bg-secondary/30">
      <Container>
        <SectionTitle title="About Me" subtitle="Get to know me better" />

        <div className="grid gap-12 md:grid-cols-2 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              {aboutData?.imageUrl ? (
                <img
                  src={aboutData.imageUrl || "/placeholder.svg"}
                  alt="About me"
                  className="h-full w-full object-cover"
                />
              ) : (
                <img src="/professional-developer-portrait.png" alt="About me" className="h-full w-full object-cover" />
              )}
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border-2 border-main -z-10" />
          </div>

          {/* Content */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {aboutData?.title || "Passionate Developer & Creative Problem Solver"}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {aboutData?.description ||
                `With a deep passion for creating seamless digital experiences, I bring ideas to life through clean code and thoughtful design. I specialize in building modern web applications that are not only visually appealing but also highly performant and accessible.`}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={ROUTES.ABOUT}>
                <Button className="bg-main text-foreground hover:bg-main-dark">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              {aboutData?.resumeUrl && (
                <Link href={aboutData.resumeUrl} target="_blank">
                  <Button variant="outline">Download Resume</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
