import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface BadgeProps {
  children: ReactNode
  variant?: "default" | "primary" | "secondary" | "outline" | "success" | "warning" | "destructive"
  size?: "sm" | "md" | "lg"
  className?: string
}

const variantClasses = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-main text-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  outline: "border border-main text-main bg-transparent",
  success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  destructive: "bg-destructive/10 text-destructive",
}

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-0.5 text-sm",
  lg: "px-3 py-1 text-sm",
}

export function BadgeCustom({ children, variant = "default", size = "md", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </span>
  )
}
