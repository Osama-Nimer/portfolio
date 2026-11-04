import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface BadgeProps {
  children: ReactNode
  variant?: "default" | "primary" | "secondary" | "outline" | "success" | "warning" | "destructive"
  size?: "sm" | "md" | "lg"
  className?: string
}

const variantClasses = {
  default: "border-line bg-muted text-muted-foreground",
  primary: "border-transparent bg-primary text-primary-foreground",
  secondary: "border-line bg-secondary text-secondary-foreground",
  outline: "border-line text-muted-foreground bg-transparent",
  success: "border-transparent bg-success-muted text-success",
  warning: "border-transparent bg-warning-muted text-warning",
  destructive: "border-transparent bg-danger-muted text-danger",
}

const sizeClasses = {
  sm: "px-2 py-0.5 text-[11px]",
  md: "px-2.5 py-0.5 text-xs",
  lg: "px-3 py-1 text-[13px]",
}

export function BadgeCustom({ children, variant = "default", size = "md", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-mono font-medium",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </span>
  )
}
