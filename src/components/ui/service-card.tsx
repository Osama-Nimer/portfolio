"use client"

import { Code, Smartphone, Palette, Database, Cloud, Shield, BrainCircuit, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { Service } from "@/src/types/services.types"

const iconMap: Record<string, typeof Code> = {
  code: Code,
  mobile: Smartphone,
  design: Palette,
  database: Database,
  cloud: Cloud,
  security: Shield,
  ai: BrainCircuit,
  analytics: BarChart3,
}

interface ServiceCardProps {
  service: Service
  className?: string
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  const Icon = service.icon ? iconMap[service.icon] || Code : Code

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-main/50",
        className,
      )}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {/* Animated background circle on hover */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-main/5 transition-transform duration-500 group-hover:scale-150" />

      {/* Icon */}
      <div className="relative mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-main/10 text-main group-hover:bg-main group-hover:text-foreground transition-colors">
        <Icon className="h-6 w-6" />
      </div>

      {/* Content */}
      <h3 className="relative text-lg font-semibold text-foreground group-hover:text-main transition-colors">{service.title}</h3>
      <p className="relative mt-2 text-sm text-muted-foreground">{service.description}</p>

      {/* Hover accent */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-main transition-all duration-500 group-hover:w-full" />
    </motion.div>
  )
}
