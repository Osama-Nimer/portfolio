"use client"

import Link from "next/link"
import { ArrowRight, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Container } from "@/src/components/ui/container"
import { ROUTES } from "@/src/utils/constants"
import { FadeIn, ScaleIn } from "@/src/components/shared/motion-wrapper"

export function ContactCta() {
  return (
    <section className="py-20 bg-main/10 relative overflow-hidden">
      {/* Animated background decorations */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-main/10"
        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
        transition={{
          rotate: { duration: 40, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-dashed border-main/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating dots */}
      <motion.div
        className="absolute top-10 left-[20%] w-3 h-3 rounded-full bg-main/20"
        animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-[25%] w-2 h-2 rounded-full bg-main/25"
        animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-[30%] right-[10%] w-4 h-4 rounded-full bg-main/15"
        animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <Container size="md">
        <div className="text-center relative z-10">
          <ScaleIn>
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-main text-foreground animate-glow-pulse">
              <Mail className="h-8 w-8" />
            </div>
          </ScaleIn>

          <FadeIn delay={0.15}>
            <h2 className="text-3xl font-bold sm:text-4xl">
              <span className="text-foreground">Let&apos;s </span>
              <span className="animate-gradient-text">Work Together</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              Have a project in mind? I&apos;d love to hear about it. Let&apos;s discuss how we can bring your ideas to
              life.
            </p>
          </FadeIn>

          <FadeIn delay={0.45}>
            <div className="mt-8">
              <Link href={ROUTES.CONTACT}>
                <Button size="lg" className="bg-main text-foreground hover:bg-main-dark group">
                  Get In Touch
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
