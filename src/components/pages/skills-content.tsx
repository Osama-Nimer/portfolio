"use client"

import { useQuery } from "@tanstack/react-query"
import { skillsService } from "@/src/services/api/skills.service"
import { Container } from "@/src/components/ui/container"
import { SectionTitle } from "@/src/components/shared/section-title"
import { SkillCard } from "@/src/components/ui/skill-card"
import { PageLoader } from "@/src/components/shared/loading-spinner"
import { FadeIn, StaggerContainer, StaggerItem } from "@/src/components/shared/motion-wrapper"

export function SkillsContent() {
  const { data: skillsData, isLoading: skillsLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: () => skillsService.getAll(),
  })

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["skill-categories"],
    queryFn: () => skillsService.getAllCategories(),
  })

  if (skillsLoading || categoriesLoading) return <PageLoader />

  const skills = skillsData?.data || []
  const categories = categoriesData?.data || []

  // Group skills by category
  const skillsByCategory = categories.map((category) => ({
    ...category,
    skills: skills.filter((skill) => skill.categoryId === category.id),
  }))

  return (
    <section className="py-20">
      <Container>
        <SectionTitle title="My Skills" subtitle="Technologies and tools I work with to build amazing products" />

        <div className="space-y-12">
          {skillsByCategory.map((category, index) => (
            <FadeIn key={category.id} delay={index * 0.1}>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{category.name}</h3>
                {category.description && <p className="text-muted-foreground mb-6">{category.description}</p>}

                <StaggerContainer staggerDelay={0.08} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {category.skills.map((skill) => (
                    <StaggerItem key={skill.id}>
                      <SkillCard skill={skill} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
