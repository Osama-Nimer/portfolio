import { Suspense } from "react"
import { ManageSkills } from "@/src/components/dashboard/manage-skills"
import { PageLoader } from "@/src/components/shared/loading-spinner"

export const metadata = {
  title: "Manage Skills | Portfolio Admin",
  description: "Manage your skills and categories.",
}

export default function ManageSkillsPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ManageSkills />
    </Suspense>
  )
}
