"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { skillsService } from "@/src/services/api/skills.service"
import { Container } from "@/src/components/ui/container"
import { SectionTitle } from "@/src/components/shared/section-title"
import { SkillCard } from "@/src/components/ui/skill-card"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/src/utils/constants"
import { StaggerContainer, StaggerItem, FadeIn } from "@/src/components/shared/motion-wrapper"

export function SkillsPreview() {
  const { data: skillsData } = useQuery({
    queryKey: ["skills"],
    queryFn: () => skillsService.getAll(),
  })

  const { data: categoriesData } = useQuery({
    queryKey: ["skill-categories"],
    queryFn: () => skillsService.getAllCategories(),
  })

  const skills = skillsData?.data || []
  const categories = categoriesData?.data || []

  // Group skills by category
  const skillsByCategory = categories.map((category) => ({
    ...category,
    skills: skills.filter((skill) => skill.categoryId === category.id).slice(0, 4),
  }))

  return (
    <section className="py-20">
      <Container>
        <SectionTitle title="My Skills" subtitle="Technologies and tools I work with" />

        <StaggerContainer staggerDelay={0.15} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillsByCategory.slice(0, 3).map((category) => (
            <StaggerItem key={category.id}>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">{category.name}</h3>
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3}>
          <div className="mt-12 text-center">
            <Link href={ROUTES.SKILLS}>
              <Button variant="outline" size="lg">
                View All Skills
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
