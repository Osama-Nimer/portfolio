import { Suspense } from "react"
import { ManageMessages } from "@/src/components/dashboard/manage-messages"
import { PageLoader } from "@/src/components/shared/loading-spinner"

export const metadata = {
  title: "Manage Messages | Portfolio Admin",
  description: "View and manage contact messages.",
}

export default function ManageMessagesPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ManageMessages />
    </Suspense>
  )
}
