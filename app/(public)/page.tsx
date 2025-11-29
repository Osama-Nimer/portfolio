import { Suspense } from "react"
import { HeroSection } from "@/src/components/sections/hero-section"
import { AboutPreview } from "@/src/components/sections/about-preview"
import { SkillsPreview } from "@/src/components/sections/skills-preview"
import { ProjectsPreview } from "@/src/components/sections/projects-preview"
import { ServicesPreview } from "@/src/components/sections/services-preview"
import { ContactCta } from "@/src/components/sections/contact-cta"
import { PageLoader } from "@/src/components/shared/loading-spinner"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<PageLoader />}>
        <AboutPreview />
      </Suspense>
      <Suspense fallback={<PageLoader />}>
        <SkillsPreview />
      </Suspense>
      <Suspense fallback={<PageLoader />}>
        <ProjectsPreview />
      </Suspense>
      <Suspense fallback={<PageLoader />}>
        <ServicesPreview />
      </Suspense>
      <ContactCta />
    </>
  )
}
