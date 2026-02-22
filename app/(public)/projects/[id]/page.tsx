import { Suspense } from "react"
import { ProjectDetailContent } from "@/src/components/pages/project-detail-content"
import { PageLoader } from "@/src/components/shared/loading-spinner"

export const metadata = {
  title: "Project Details | Portfolio",
  description: "View detailed information about this project.",
}

export default function ProjectDetailPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ProjectDetailContent />
    </Suspense>
  )
}
