"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { SKILL_LEVELS } from "@/src/utils/constants"
import type { Skill } from "@/src/types/skills.types"

interface SkillCardProps {
  skill: Skill
  className?: string
}

export function SkillCard({ skill, className }: SkillCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md hover:border-main/50",
        className,
      )}
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-foreground">{skill.name}</span>
      </div>
    </motion.div>
  )
}
