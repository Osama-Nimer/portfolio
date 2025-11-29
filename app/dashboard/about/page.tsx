import { Suspense } from "react"
import { ManageAbout } from "@/src/components/dashboard/manage-about"
import { PageLoader } from "@/src/components/shared/loading-spinner"

export const metadata = {
  title: "Manage About | Portfolio Admin",
  description: "Manage your about section.",
}

export default function ManageAboutPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ManageAbout />
    </Suspense>
  )
}
