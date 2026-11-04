import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * The visual language shared by every section, after the FixApi brand:
 * ring nodes and the hairline paths between them, pill buttons, framed
 * panels with hairline borders and no shadows.
 */

/** The one button shape: a full pill. Primary and secondary differ by fill only. */
export type PillVariant = "primary" | "secondary" | "ghost"
export type PillSize = "sm" | "md" | "lg"

const PILL_BASE =
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,border-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-progress disabled:opacity-70 [&_svg]:size-4 [&_svg]:shrink-0"

const PILL_VARIANTS: Record<PillVariant, string> = {
  primary: "border border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
  secondary:
    "border border-line-strong bg-foreground/[0.04] text-foreground hover:border-line-bold hover:bg-foreground/[0.08]",
  ghost: "border border-transparent text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground",
}

const PILL_SIZES: Record<PillSize, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
}

export function pillClass({
  variant = "primary",
  size = "md",
  className,
}: { variant?: PillVariant; size?: PillSize; className?: string } = {}) {
  return cn(PILL_BASE, PILL_VARIANTS[variant], PILL_SIZES[size], className)
}

/** The one size for every section heading below the hero (the hero's h1 is larger on purpose). */
export const SECTION_TITLE =
  "text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground sm:text-[2.5rem] lg:text-[3rem]"

/** Small mono label for meta: dates, counts, tags. */
export const META = "font-mono text-[12px] uppercase tracking-[0.08em] text-subtle"

/** A ring node, the motif's endpoint. `live` adds a slow breathing halo. */
export function RingNode({ className, live = false }: { className?: string; live?: boolean }) {
  return (
    <span aria-hidden="true" className={cn("relative inline-flex size-2.5 shrink-0", className)}>
      {live && <span className="fx-breathe absolute inset-0 rounded-full bg-foreground" />}
      <span className="relative size-full rounded-full border-[1.5px] border-current bg-background" />
    </span>
  )
}

/**
 * Section divider: two ring nodes joined by a hairline path, with a short
 * signal that travels along it now and then.
 */
export function PathDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>
      <div className="flex items-center gap-3 text-line-bold">
        <RingNode className="size-2" />
        <div className="relative h-px flex-1 overflow-hidden bg-gradient-to-r from-line-bold via-line to-line-bold">
          <span className="fx-travel absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-foreground/80 to-transparent" />
        </div>
        <RingNode className="size-2" />
      </div>
    </div>
  )
}

/** A framed surface: hairline border and card fill, no shadow. */
export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("relative rounded-xl border border-line bg-card", className)}>{children}</div>
}

/** A small mono pill for tags and labels. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  )
}

/** The status capsule: a live ring node and a short line of text. */
export function StatusPill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-line bg-card px-3.5 py-1.5 text-[13px] text-muted-foreground",
        className,
      )}
    >
      <RingNode live className="size-2 text-foreground" />
      {children}
    </span>
  )
}
