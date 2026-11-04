import { cn } from "@/lib/utils"
import type { Skill } from "@/src/types/skills.types"

interface SkillCardProps {
  skill: Skill
  className?: string
}

/** One skill: a hairlined row with a ring node, like a node on the motif's path. */
export function SkillCard({ skill, className }: SkillCardProps) {
  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-lg border border-line bg-card px-4 py-3 transition-colors duration-200 hover:border-line-bold",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="size-2 shrink-0 rounded-full border-[1.5px] border-node transition-colors group-hover:border-foreground group-hover:bg-foreground"
      />
      <span className="text-sm font-medium text-foreground">{skill.name}</span>
    </div>
  )
}
