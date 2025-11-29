import { Suspense } from "react"
import { ServicesContent } from "@/src/components/pages/services-content"
import { PageLoader } from "@/src/components/shared/loading-spinner"

export const metadata = {
  title: "Services | Portfolio",
  description: "Explore the services I offer to help bring your ideas to life.",
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ServicesContent />
    </Suspense>
  )
}
