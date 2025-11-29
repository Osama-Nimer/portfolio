import { Suspense } from "react"
import { ManageServices } from "@/src/components/dashboard/manage-services"
import { PageLoader } from "@/src/components/shared/loading-spinner"

export const metadata = {
  title: "Manage Services | Portfolio Admin",
  description: "Manage your services.",
}

export default function ManageServicesPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ManageServices />
    </Suspense>
  )
}
