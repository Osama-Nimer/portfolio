import { Suspense } from "react"
import { ProjectsContent } from "@/src/components/pages/projects-content"
import { PageLoader } from "@/src/components/shared/loading-spinner"

export const metadata = {
  title: "Projects | Portfolio",
  description: "Browse my portfolio of projects showcasing my skills and experience.",
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ProjectsContent />
    </Suspense>
  )
}
