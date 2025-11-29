import { Suspense } from "react"
import { ManageExperience } from "@/src/components/dashboard/manage-experience"
import { PageLoader } from "@/src/components/shared/loading-spinner"

export const metadata = {
  title: "Manage Experience | Portfolio Admin",
  description: "Manage your work experience.",
}

export default function ManageExperiencePage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ManageExperience />
    </Suspense>
  )
}
