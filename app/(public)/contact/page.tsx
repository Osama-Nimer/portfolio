import { Suspense } from "react"
import { ContactContent } from "@/src/components/pages/contact-content"
import { PageLoader } from "@/src/components/shared/loading-spinner"

export const metadata = {
  title: "Contact | Portfolio",
  description: "Get in touch with me for project inquiries, collaborations, or just to say hello.",
}

export default function ContactPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ContactContent />
    </Suspense>
  )
}
