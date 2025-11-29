import { Suspense } from "react"
import { SkillsContent } from "@/src/components/pages/skills-content"
import { PageLoader } from "@/src/components/shared/loading-spinner"

export const metadata = {
  title: "Skills | Portfolio",
  description: "Explore my technical skills and expertise in various technologies and tools.",
}

export default function SkillsPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <SkillsContent />
    </Suspense>
  )
}
