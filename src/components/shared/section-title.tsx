"use client"

import { cn } from "@/lib/utils"
import { motion, useReducedMotion } from "framer-motion"
import { SECTION_TITLE } from "@/src/components/shared/motif"

interface SectionTitleProps {
  title: string
  /** A second part of the heading, shown dimmed after the title (the brand's two-tone heading). */
  muted?: string
  subtitle?: string
  centered?: boolean
  /** Renders the heading as the page's h1 (page headers), else an h2. */
  as?: "h1" | "h2"
  className?: string
}

const viewport = { once: true, amount: 0.5 }

/**
 * A section's one heading, with an optional lead. No eyebrow or underline:
 * the heading carries the section on its own.
 */
export function SectionTitle({ title, muted, subtitle, centered = false, as = "h2", className }: SectionTitleProps) {
  const reduce = useReducedMotion()
  const Heading = as === "h1" ? motion.h1 : motion.h2
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <div className={cn("mb-12 max-w-2xl sm:mb-14", centered && "mx-auto text-center", className)}>
      <Heading className={SECTION_TITLE} {...rise(0)}>
        {title}
        {muted && <span className="text-foreground/40"> {muted}</span>}
      </Heading>

      {subtitle && (
        <motion.p
          className={cn(
            "mt-5 max-w-[58ch] text-pretty text-base leading-7 text-muted-foreground sm:text-[17px]",
            centered && "mx-auto",
          )}
          {...rise(0.08)}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
