import { cn } from "@/lib/utils"

/** The portfolio mark: two ring nodes joined by a path, beside the name. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={cn("size-6", className)}>
      <circle cx="6" cy="17" r="3.25" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="18" cy="7" r="3.25" stroke="currentColor" strokeWidth="1.75" />
      <path d="M8.6 15.1C12 13.5 12 10.5 15.4 8.9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

export function BrandWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-foreground", className)}>
      <BrandMark />
      <span className="text-[15px] font-semibold tracking-[-0.02em] sm:text-base">Osama Nimer</span>
    </span>
  )
}
