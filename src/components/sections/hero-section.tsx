"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/src/components/ui/container"
import { ROUTES } from "@/src/utils/constants"
import { FadeIn, Float } from "@/src/components/shared/motion-wrapper"
import { TypeWriter } from "@/src/components/shared/type-writer"
import { ParticleGrid, GeometricShapes, AnimatedCodeBlock, GradientOrb } from "@/src/components/shared/animated-graphics"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32 min-h-[90vh] flex items-center">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        {/* Particle grid */}
        <ParticleGrid className="absolute inset-0" particleCount={35} />

        {/* Gradient orbs */}
        <Float yRange={30} duration={8}>
          <GradientOrb className="absolute -top-20 -right-20" size="w-[500px] h-[500px]" />
        </Float>
        <Float yRange={20} duration={10}>
          <GradientOrb className="absolute -bottom-20 -left-20" size="w-[400px] h-[400px]" />
        </Float>

        {/* Geometric shapes */}
        <GeometricShapes className="absolute inset-0" />
      </div>

      <Container>
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <FadeIn delay={0.1}>
              <div className="mb-6 inline-flex items-center rounded-full border border-main/30 bg-main/10 px-4 py-1.5 animate-glow-pulse">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-main opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-main" />
                </span>
                <span className="text-sm font-medium text-main">Available for new projects</span>
              </div>
            </FadeIn>

            {/* Heading with gradient text */}
            <FadeIn delay={0.25}>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Building Digital{" "}
                <span className="animate-gradient-text">Experiences</span>{" "}
                That Matter
              </h1>
            </FadeIn>

            {/* Typewriter */}
            <FadeIn delay={0.4}>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                I&apos;m a passionate{" "}
                <TypeWriter
                  words={["Full-Stack Developer", "Problem Solver", "Creative Thinker", "Backend", "Frontend"]}
                  typingSpeed={80}
                  deletingSpeed={50}
                  pauseDuration={2000}
                  className="text-main font-semibold"
                />{" "}
              </p>
              <p className="mt-2 text-base text-muted-foreground/80">
                crafting beautiful, functional, and user-centered digital experiences.
                Let&apos;s turn your vision into reality.
              </p>
            </FadeIn>

            {/* CTAs */}
            <FadeIn delay={0.55}>
              <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link href={ROUTES.PROJECTS}>
                  <Button size="lg" className="bg-main text-foreground hover:bg-main-dark group">
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href={ROUTES.CONTACT}>
                  <Button size="lg" variant="outline" className="group">
                    Get In Touch
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Animated Code Block */}
          <FadeIn direction="right" delay={0.3}>
            <div className="hidden lg:block">
              <AnimatedCodeBlock />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
