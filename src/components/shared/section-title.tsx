import { cn } from "@/lib/utils"

interface SectionTitleProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionTitle({ title, subtitle, centered = true, className }: SectionTitleProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        <span className="text-main">{title.split(" ")[0]}</span> {title.split(" ").slice(1).join(" ")}
      </h2>
      {subtitle && <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
      <div className={cn("mt-4 h-1 w-20 bg-main rounded-full", centered && "mx-auto")} />
    </div>
  )
}
