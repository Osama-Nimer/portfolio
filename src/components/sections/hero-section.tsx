import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/src/components/ui/container"
import { ROUTES } from "@/src/utils/constants"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-main/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-main/5 rounded-full blur-3xl" />
      </div>

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border border-main/30 bg-main/10 px-4 py-1.5">
            <span className="text-sm font-medium text-main">Available for new projects</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Building Digital <span className="text-main">Experiences</span> That Matter
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            I&apos;m a passionate developer crafting beautiful, functional, and user-centered digital experiences.
            Let&apos;s turn your vision into reality.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href={ROUTES.PROJECTS}>
              <Button size="lg" className="bg-main text-foreground hover:bg-main-dark">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href={ROUTES.CONTACT}>
              <Button size="lg" variant="outline">
                Get In Touch
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-border pt-8">
            <div>
              <div className="text-3xl font-bold text-main">5+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-main">50+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-main">30+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
