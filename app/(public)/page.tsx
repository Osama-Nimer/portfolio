import { Suspense } from "react"
import { HeroSection } from "@/src/components/sections/hero-section"
import { AboutPreview } from "@/src/components/sections/about-preview"
import { SkillsPreview } from "@/src/components/sections/skills-preview"
import { ProjectsPreview } from "@/src/components/sections/projects-preview"
import { ServicesPreview } from "@/src/components/sections/services-preview"
import { ContactCta } from "@/src/components/sections/contact-cta"
import { PageLoader } from "@/src/components/shared/loading-spinner"
import { PathDivider } from "@/src/components/shared/motif"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PathDivider />
      <Suspense fallback={<PageLoader />}>
        <AboutPreview />
      </Suspense>
      <PathDivider />
      <Suspense fallback={<PageLoader />}>
        <SkillsPreview />
      </Suspense>
      <PathDivider />
      <Suspense fallback={<PageLoader />}>
        <ProjectsPreview />
      </Suspense>
      <PathDivider />
      <Suspense fallback={<PageLoader />}>
        <ServicesPreview />
      </Suspense>
      <ContactCta />
    </>
  )
}
