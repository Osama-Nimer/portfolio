"use client"

import { useQuery } from "@tanstack/react-query"
import { skillsService } from "@/src/services/api/skills.service"
import { Container } from "@/src/components/ui/container"
import { SectionHeader } from "@/src/components/shared/section-header"
import { ROUTES } from "@/src/utils/constants"
import { StaggerContainer, StaggerItem } from "@/src/components/shared/motion-wrapper"
import { SkillPath } from "@/src/components/ui/skill-path"

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

  const skillsByCategory = categories.map((category) => ({
    ...category,
    skills: skills.filter((skill) => skill.categoryId === category.id).slice(0, 5),
  }))

  return (
    <section className="py-24 sm:py-28">
      <Container>
        <SectionHeader
          title="The stack"
          muted="I work in"
          subtitle="Technologies and tools I reach for to ship reliable products, end to end."
          href={ROUTES.SKILLS}
          linkLabel="All skills"
        />

        <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillsByCategory.slice(0, 3).map((category) => (
            <StaggerItem key={category.id}>
              <SkillPath name={category.name} skills={category.skills} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}
