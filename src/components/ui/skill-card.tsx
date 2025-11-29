import { cn } from "@/lib/utils"
import { SKILL_LEVELS } from "@/src/utils/constants"
import type { Skill } from "@/src/types/skills.types"

interface SkillCardProps {
  skill: Skill
  className?: string
}

export function SkillCard({ skill, className }: SkillCardProps) {
  const levelInfo = SKILL_LEVELS[skill.level]

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md hover:border-main/50",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-foreground">{skill.name}</span>
        <span className="text-xs text-muted-foreground">{levelInfo.label}</span>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-main rounded-full transition-all duration-500"
          style={{ width: `${levelInfo.percentage}%` }}
        />
      </div>
    </div>
  )
}
