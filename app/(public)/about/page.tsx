import { Suspense } from "react"
import { AboutContent } from "@/src/components/pages/about-content"
import { PageLoader } from "@/src/components/shared/loading-spinner"

export const metadata = {
  title: "About | Portfolio",
  description: "Learn more about my background, experience, and what drives me as a developer.",
}

export default function AboutPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <AboutContent />
    </Suspense>
  )
}
