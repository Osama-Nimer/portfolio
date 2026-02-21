"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { aboutService } from "@/src/services/api/about.service"
import { Container } from "@/src/components/ui/container"
import { SectionTitle } from "@/src/components/shared/section-title"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/src/utils/constants"
import { FadeIn } from "@/src/components/shared/motion-wrapper"

export function AboutPreview() {
  const { data } = useQuery({
    queryKey: ["about"],
    queryFn: () => aboutService.getAll(),
  })

  const aboutData = data?.data?.[0]

  return (
    <section className="py-20 bg-secondary/30 relative overflow-hidden">
      {/* Decorative background graphics */}
      <motion.div
        className="absolute top-10 right-10 w-40 h-40 rounded-full border-2 border-dashed border-main/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-24 h-24 rounded-full border border-main/10"
        animate={{ rotate: -360, scale: [1, 1.1, 1] }}
        transition={{
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      <Container>
        <SectionTitle title="About Me" subtitle="Get to know me better" />

        <div className="grid gap-12 md:grid-cols-2 items-center">
          {/* Image */}
          <FadeIn direction="left">
            <div className="relative group">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                {aboutData?.imageUrl ? (
                  <img
                    src={aboutData.imageUrl || "/placeholder.svg"}
                    alt="About me"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <img
                    src="/professional-developer-portrait.png"
                    alt="About me"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>
              {/* Decorative element with glow */}
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border-2 border-main -z-10" />
              {/* Corner accent dots */}
              <motion.div
                className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-main/30"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-3 -left-3 w-4 h-4 rounded-full bg-main/20"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </div>
          </FadeIn>

          {/* Content */}
          <FadeIn direction="right" delay={0.2}>
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
                  <Button className="bg-main text-foreground hover:bg-main-dark group">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                {aboutData?.resumeUrl && (
                  <Link href={aboutData.resumeUrl} target="_blank">
                    <Button variant="outline">Download Resume</Button>
                  </Link>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
