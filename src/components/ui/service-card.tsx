import { BarChart3, BrainCircuit, Cloud, Code, Database, Palette, Shield, Smartphone } from "lucide-react"
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
  index?: number
  className?: string
}

export function ServiceCard({ service, index, className }: ServiceCardProps) {
  const Icon = service.icon ? iconMap[service.icon] || Code : Code

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col rounded-xl border border-line bg-card p-6 transition-colors duration-300 hover:border-line-bold",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex size-10 items-center justify-center rounded-lg border border-line-strong bg-foreground/[0.03] text-foreground transition-colors group-hover:border-line-bold">
          <Icon className="size-[18px]" />
        </span>
        {index !== undefined && (
          <span className="font-mono text-xs text-subtle">{String(index + 1).padStart(2, "0")}</span>
        )}
      </div>

      <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em] text-foreground">{service.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.description}</p>
    </div>
  )
}
