import { cn } from "@/lib/utils"
import type { Skill } from "@/src/types/skills.types"

/**
 * A skill category as a panel: its skills hang off one hairline path, each a
 * ring node on it (the brand motif, vertical).
 */
export function SkillPath({
  name,
  description,
  skills,
  className,
}: {
  name: string
  description?: string
  skills: Skill[]
  className?: string
}) {
  return (
    <div className={cn("h-full rounded-xl border border-line bg-card p-6 transition-colors duration-300 hover:border-line-strong", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">{name}</h3>
        <span className="font-mono text-xs text-subtle">{String(skills.length).padStart(2, "0")}</span>
      </div>
      {description && <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>}

      <ul className="relative mt-6 space-y-3.5 pl-6">
        <span aria-hidden="true" className="absolute bottom-2 left-[4px] top-2 w-px bg-line-strong" />
        {skills.map((skill) => (
          <li key={skill.id} className="group relative text-sm text-muted-foreground transition-colors hover:text-foreground">
            <span
              aria-hidden="true"
              className="absolute -left-6 top-1/2 size-[9px] -translate-y-1/2 rounded-full border-[1.5px] border-node bg-card transition-colors group-hover:border-foreground group-hover:bg-foreground"
            />
            {skill.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
