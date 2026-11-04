import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SectionTitle } from "@/src/components/shared/section-title"
import { pillClass } from "@/src/components/shared/motif"

/** A section heading with an optional "see all" link that sits at its end on wide screens. */
export function SectionHeader({
  title,
  muted,
  subtitle,
  href,
  linkLabel,
}: {
  title: string
  muted?: string
  subtitle?: string
  href?: string
  linkLabel?: string
}) {
  return (
    <div className="mb-12 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between">
      <SectionTitle title={title} muted={muted} subtitle={subtitle} className="mb-0 sm:mb-0" />
      {href && linkLabel && (
        <Link href={href} className={pillClass({ variant: "secondary", size: "sm", className: "group self-start md:self-auto" })}>
          {linkLabel}
          <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  )
}
