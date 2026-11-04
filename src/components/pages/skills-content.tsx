"use client"

import { useQuery } from "@tanstack/react-query"
import { skillsService } from "@/src/services/api/skills.service"
import { Container } from "@/src/components/ui/container"
import { PageHeader } from "@/src/components/shared/page-header"
import { PageLoader } from "@/src/components/shared/loading-spinner"
import { StaggerContainer, StaggerItem } from "@/src/components/shared/motion-wrapper"
import { SkillPath } from "@/src/components/ui/skill-path"
import { ContactCta } from "@/src/components/sections/contact-cta"
import { EmptyState } from "@/src/components/shared/empty-state"

export function SkillsContent() {
  const { data: skillsData, isLoading: skillsLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: () => skillsService.getAll(),
  })

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["skill-categories"],
    queryFn: () => skillsService.getAllCategories(),
  })

  const skills = skillsData?.data || []
  const categories = categoriesData?.data || []

  const skillsByCategory = categories.map((category) => ({
    ...category,
    skills: skills.filter((skill) => skill.categoryId === category.id),
  }))

  return (
    <>
      <PageHeader
        path="skills"
        title="The stack"
        muted="behind the work"
        lead="Technologies and tools I use to design, build and ship products, grouped by where they sit in the stack."
      />

      <section className="pb-8">
        <Container>
          {skillsLoading || categoriesLoading ? (
            <PageLoader />
          ) : skillsByCategory.length > 0 ? (
            <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {skillsByCategory.map((category) => (
                <StaggerItem key={category.id} className="h-full">
                  <SkillPath name={category.name} description={category.description} skills={category.skills} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <EmptyState>No skills listed yet.</EmptyState>
          )}
        </Container>
      </section>

      <ContactCta />
    </>
  )
}

