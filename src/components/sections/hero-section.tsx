"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/src/components/ui/container"
import { ROUTES } from "@/src/utils/constants"
import { FadeIn } from "@/src/components/shared/motion-wrapper"
import { TypeWriter } from "@/src/components/shared/type-writer"
import { AnimatedCodeBlock } from "@/src/components/shared/animated-graphics"
import { StatusPill, pillClass } from "@/src/components/shared/motif"

export function HeroSection() {
  // Fills the screen below the floating nav on load; grows if the content needs more.
  return (
    <section aria-labelledby="hero-heading" className="relative isolate flex min-h-[calc(100svh-4.5rem)] flex-col justify-center">
      <div aria-hidden="true" className="fx-glow pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[720px]" />

      <Container>
        <div className="grid items-center gap-14 py-16 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-20">
          <div className="text-center lg:text-left">
            <FadeIn delay={0.05}>
              <StatusPill>Available for new projects</StatusPill>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h1
                id="hero-heading"
                className="mt-8 text-balance text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-[4.25rem]"
              >
                <span className="block">Building products</span>
                <span className="block text-foreground/40">that just work</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="mx-auto mt-7 max-w-[34rem] text-pretty text-[17px] leading-7 text-muted-foreground sm:text-lg sm:leading-8 lg:mx-0">
                I&apos;m Osama, a{" "}
                <TypeWriter
                  words={["full-stack developer", "backend engineer", "frontend engineer", "problem solver"]}
                  typingSpeed={70}
                  deletingSpeed={40}
                  pauseDuration={2000}
                  className="font-medium text-foreground"
                />
                <br className="hidden sm:block" /> crafting fast, reliable and user-centred web experiences.
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <Link href={ROUTES.PROJECTS} className={pillClass({ size: "lg", className: "group" })}>
                  View my work
                  <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
                <Link href={ROUTES.CONTACT} className={pillClass({ variant: "secondary", size: "lg" })}>
                  Get in touch
                </Link>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.3} className="mx-auto w-full max-w-xl lg:max-w-none">
            <AnimatedCodeBlock />
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
