"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface SectionTitleProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

const viewport = { once: true, amount: 0.5 }

export function SectionTitle({ title, subtitle, centered = true, className }: SectionTitleProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      <motion.h2
        className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <span className="text-main">{title.split(" ")[0]}</span> {title.split(" ").slice(1).join(" ")}
      </motion.h2>

      {subtitle && (
        <motion.p
          className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        className={cn("mt-4 h-1 w-20 bg-main rounded-full", centered && "mx-auto")}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewport}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        style={{ originX: centered ? 0.5 : 0 }}
      />
    </div>
  )
}
