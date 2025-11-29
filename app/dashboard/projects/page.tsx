import { Suspense } from "react"
import { ManageProjects } from "@/src/components/dashboard/manage-projects"
import { PageLoader } from "@/src/components/shared/loading-spinner"

export const metadata = {
  title: "Manage Projects | Portfolio Admin",
  description: "Manage your portfolio projects.",
}

export default function ManageProjectsPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ManageProjects />
    </Suspense>
  )
}
