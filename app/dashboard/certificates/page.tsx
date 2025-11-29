import { Suspense } from "react"
import { ManageCertificates } from "@/src/components/dashboard/manage-certificates"
import { PageLoader } from "@/src/components/shared/loading-spinner"

export const metadata = {
  title: "Manage Certificates | Portfolio Admin",
  description: "Manage your certifications.",
}

export default function ManageCertificatesPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ManageCertificates />
    </Suspense>
  )
}
