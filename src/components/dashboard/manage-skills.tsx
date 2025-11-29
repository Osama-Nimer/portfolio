"use client"

import type React from "react"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Modal } from "@/src/components/ui/modal"
import { TabsCustom } from "@/src/components/ui/tabs-custom"
import { SkillCard } from "@/src/components/ui/skill-card"
import { skillsService } from "@/src/services/api/skills.service"
import { useUIStore } from "@/src/stores/ui/ui.store"
import { SKILL_LEVELS } from "@/src/utils/constants"
import type { Skill, SkillFormData, SkillCategory, SkillCategoryFormData, SkillLevel } from "@/src/types/skills.types"

export function ManageSkills() {
  const queryClient = useQueryClient()
  const { addToast } = useUIStore()

  // Skills state
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [skillFormData, setSkillFormData] = useState<SkillFormData>({
    name: "",
    level: "intermediate",
    categoryId: 0,
    icon: "",
    order: 0,
  })

  // Categories state
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(null)
  const [categoryFormData, setCategoryFormData] = useState<SkillCategoryFormData>({
    name: "",
    description: "",
    order: 0,
  })

  // Queries
  const { data: skillsData } = useQuery({
    queryKey: ["skills"],
    queryFn: () => skillsService.getAll(),
  })

  const { data: categoriesData } = useQuery({
    queryKey: ["skill-categories"],
    queryFn: () => skillsService.getAllCategories(),
  })

  // Skill mutations
  const createSkillMutation = useMutation({
    mutationFn: (data: SkillFormData) => skillsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] })
      addToast({ title: "Skill created", type: "success" })
      closeSkillModal()
    },
    onError: (error: Error) => {
      addToast({ title: "Failed to create skill", description: error.message, type: "error" })
    },
  })

  const updateSkillMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<SkillFormData> }) => skillsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] })
      addToast({ title: "Skill updated", type: "success" })
      closeSkillModal()
    },
    onError: (error: Error) => {
      addToast({ title: "Failed to update skill", description: error.message, type: "error" })
    },
  })

  const deleteSkillMutation = useMutation({
    mutationFn: (id: number) => skillsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] })
      addToast({ title: "Skill deleted", type: "success" })
    },
    onError: (error: Error) => {
      addToast({ title: "Failed to delete skill", description: error.message, type: "error" })
    },
  })

  // Category mutations
  const createCategoryMutation = useMutation({
    mutationFn: (data: SkillCategoryFormData) => skillsService.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skill-categories"] })
      addToast({ title: "Category created", type: "success" })
      closeCategoryModal()
    },
    onError: (error: Error) => {
      addToast({ title: "Failed to create category", description: error.message, type: "error" })
    },
  })

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<SkillCategoryFormData> }) =>
      skillsService.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skill-categories"] })
      addToast({ title: "Category updated", type: "success" })
      closeCategoryModal()
    },
    onError: (error: Error) => {
      addToast({ title: "Failed to update category", description: error.message, type: "error" })
    },
  })

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: number) => skillsService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skill-categories"] })
      addToast({ title: "Category deleted", type: "success" })
    },
    onError: (error: Error) => {
      addToast({ title: "Failed to delete category", description: error.message, type: "error" })
    },
  })

  // Modal handlers
  const openSkillModal = (skill?: Skill) => {
    if (skill) {
      setEditingSkill(skill)
      setSkillFormData({
        name: skill.name,
        level: skill.level,
        categoryId: skill.categoryId,
        icon: skill.icon || "",
        order: skill.order,
      })
    } else {
      setEditingSkill(null)
      setSkillFormData({
        name: "",
        level: "intermediate",
        categoryId: categories[0]?.id || 0,
        icon: "",
        order: 0,
      })
    }
    setIsSkillModalOpen(true)
  }

  const closeSkillModal = () => {
    setIsSkillModalOpen(false)
    setEditingSkill(null)
  }

  const openCategoryModal = (category?: SkillCategory) => {
    if (category) {
      setEditingCategory(category)
      setCategoryFormData({
        name: category.name,
        description: category.description || "",
        order: category.order,
      })
    } else {
      setEditingCategory(null)
      setCategoryFormData({ name: "", description: "", order: 0 })
    }
    setIsCategoryModalOpen(true)
  }

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false)
    setEditingCategory(null)
  }

  const handleSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingSkill) {
      updateSkillMutation.mutate({ id: editingSkill.id, data: skillFormData })
    } else {
      createSkillMutation.mutate(skillFormData)
    }
  }

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCategory) {
      updateCategoryMutation.mutate({ id: editingCategory.id, data: categoryFormData })
    } else {
      createCategoryMutation.mutate(categoryFormData)
    }
  }

  const skills = skillsData?.data || []
  const categories = categoriesData?.data || []

  const tabs = [
    {
      id: "skills",
      label: "Skills",
      content: (
        <div className="space-y-6">
          <div className="flex justify-end">
            <Button onClick={() => openSkillModal()} className="bg-main text-foreground hover:bg-main-dark">
              <Plus className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          </div>

          {categories.map((category) => {
            const categorySkills = skills.filter((s) => s.categoryId === category.id)
            return (
              <div key={category.id}>
                <h3 className="text-lg font-semibold text-foreground mb-4">{category.name}</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="relative group">
                      <SkillCard skill={skill} />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => openSkillModal(skill)}>
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteSkillMutation.mutate(skill.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ),
    },
    {
      id: "categories",
      label: "Categories",
      content: (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => openCategoryModal()} className="bg-main text-foreground hover:bg-main-dark">
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </div>

          <div className="grid gap-4">
            {categories.map((category) => (
              <Card key={category.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{category.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => openCategoryModal(category)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteCategoryMutation.mutate(category.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                {category.description && (
                  <CardContent>
                    <p className="text-muted-foreground">{category.description}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Manage Skills</h2>
        <p className="text-muted-foreground">Add and organize your skills by category.</p>
      </div>

      <TabsCustom tabs={tabs} />

      {/* Skill Modal */}
      <Modal isOpen={isSkillModalOpen} onClose={closeSkillModal} title={editingSkill ? "Edit Skill" : "Add Skill"}>
        <form onSubmit={handleSkillSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="skillName">Name</Label>
            <Input
              id="skillName"
              value={skillFormData.name}
              onChange={(e) => setSkillFormData({ ...skillFormData, name: e.target.value })}
              placeholder="JavaScript"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skillLevel">Level</Label>
            <Select
              value={skillFormData.level}
              onValueChange={(value: SkillLevel) => setSkillFormData({ ...skillFormData, level: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(SKILL_LEVELS).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skillCategory">Category</Label>
            <Select
              value={skillFormData.categoryId.toString()}
              onValueChange={(value) => setSkillFormData({ ...skillFormData, categoryId: Number.parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={closeSkillModal}>
              Cancel
            </Button>
            <Button type="submit" className="bg-main text-foreground hover:bg-main-dark">
              Save
            </Button>
          </div>
        </form>
      </Modal>

      {/* Category Modal */}
      <Modal
        isOpen={isCategoryModalOpen}
        onClose={closeCategoryModal}
        title={editingCategory ? "Edit Category" : "Add Category"}
      >
        <form onSubmit={handleCategorySubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="categoryName">Name</Label>
            <Input
              id="categoryName"
              value={categoryFormData.name}
              onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
              placeholder="Frontend"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoryDescription">Description</Label>
            <Input
              id="categoryDescription"
              value={categoryFormData.description}
              onChange={(e) => setCategoryFormData({ ...categoryFormData, description: e.target.value })}
              placeholder="Frontend technologies"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={closeCategoryModal}>
              Cancel
            </Button>
            <Button type="submit" className="bg-main text-foreground hover:bg-main-dark">
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
