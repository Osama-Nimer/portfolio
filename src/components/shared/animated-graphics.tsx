"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * A framed editor window that writes itself out line by line: the hero's
 * mock-UI surface. Monochrome like the rest of the brand; syntax is told
 * apart by weight of tone (foreground, muted, subtle), not by hue.
 */

type Token = { t: string; c?: "kw" | "str" | "key" | "dim" }

const lines: Token[][] = [
  [{ t: "export const ", c: "kw" }, { t: "developer" }, { t: " = {", c: "dim" }],
  [{ t: "  name", c: "key" }, { t: ": ", c: "dim" }, { t: '"Osama Nimer"', c: "str" }, { t: ",", c: "dim" }],
  [{ t: "  role", c: "key" }, { t: ": ", c: "dim" }, { t: '"Full-Stack Developer"', c: "str" }, { t: ",", c: "dim" }],
  [{ t: "  based", c: "key" }, { t: ": ", c: "dim" }, { t: '"Amman, Jordan"', c: "str" }, { t: ",", c: "dim" }],
  [{ t: "  stack", c: "key" }, { t: ": [", c: "dim" }],
  [{ t: '    "React"', c: "str" }, { t: ", ", c: "dim" }, { t: '"Next.js"', c: "str" }, { t: ", ", c: "dim" }, { t: '"TypeScript"', c: "str" }, { t: ",", c: "dim" }],
  [{ t: '    "Node.js"', c: "str" }, { t: ", ", c: "dim" }, { t: '"PostgreSQL"', c: "str" }, { t: ",", c: "dim" }],
  [{ t: "  ],", c: "dim" }],
  [{ t: "  available", c: "key" }, { t: ": ", c: "dim" }, { t: "true", c: "kw" }, { t: ",", c: "dim" }],
  [{ t: "}", c: "dim" }],
]

const tone = {
  kw: "text-foreground font-medium",
  str: "text-muted-foreground",
  key: "text-foreground/85",
  dim: "text-subtle",
} as const

export function AnimatedCodeBlock({ className }: { className?: string }) {
  const reduce = useReducedMotion()

  return (
    <div className={cn("overflow-hidden rounded-xl border border-line bg-card", className)}>
      {/* Title bar */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full border border-line-bold" />
          <span className="size-2.5 rounded-full border border-line-bold" />
          <span className="size-2.5 rounded-full border border-line-bold" />
        </div>
        <span className="font-mono text-xs text-subtle">developer.ts</span>
        <span className="ml-auto inline-flex items-center gap-2 font-mono text-[11px] text-subtle">
          <span className="relative inline-flex size-1.5">
            <span className="fx-breathe absolute inset-0 rounded-full bg-success" />
            <span className="relative size-full rounded-full bg-success" />
          </span>
          compiled
        </span>
      </div>

      {/* Code */}
      <div className="fx-dots px-4 py-5 font-mono text-[12.5px] leading-6 sm:text-[13px]">
        {lines.map((tokens, i) => (
          <motion.div
            key={i}
            className="flex whitespace-pre"
            initial={reduce ? false : { opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <span aria-hidden="true" className="mr-5 w-5 shrink-0 select-none text-right text-line-bold">
              {i + 1}
            </span>
            <span>
              {tokens.map((tok, j) => (
                <span key={j} className={tok.c ? tone[tok.c] : "text-foreground"}>
                  {tok.t}
                </span>
              ))}
              {i === lines.length - 1 && (
                <span aria-hidden="true" className="fx-caret ml-0.5 inline-block h-[1.1em] w-[7px] translate-y-[3px] bg-foreground/80" />
              )}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
