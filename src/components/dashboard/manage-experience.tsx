"use client"

import type React from "react"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus, Pencil, Trash2, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Modal } from "@/src/components/ui/modal"
import { BadgeCustom } from "@/src/components/ui/badge-custom"
import { experienceService } from "@/src/services/api/experience.service"
import { useUIStore } from "@/src/stores/ui/ui.store"
import { formatDateRange } from "@/src/utils/formatters"
import type { Experience, ExperienceFormData } from "@/src/types/experience.types"

export function ManageExperience() {
  const queryClient = useQueryClient()
  const { addToast } = useUIStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Experience | null>(null)
  const [formData, setFormData] = useState<ExperienceFormData>({
    company: "",
    position: "",
    description: "",
    startDate: "",
    endDate: "",
    current: false,
    location: "",
    order: 0,
  })

  const { data } = useQuery({
    queryKey: ["experience"],
    queryFn: () => experienceService.getAll(),
  })

  const createMutation = useMutation({
    mutationFn: (data: ExperienceFormData) => experienceService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experience"] })
      addToast({ title: "Experience added", type: "success" })
      closeModal()
    },
    onError: (error: Error) => {
      addToast({ title: "Failed to create", description: error.message, type: "error" })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ExperienceFormData> }) => experienceService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experience"] })
      addToast({ title: "Experience updated", type: "success" })
      closeModal()
    },
    onError: (error: Error) => {
      addToast({ title: "Failed to update", description: error.message, type: "error" })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => experienceService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experience"] })
      addToast({ title: "Experience deleted", type: "success" })
    },
    onError: (error: Error) => {
      addToast({ title: "Failed to delete", description: error.message, type: "error" })
    },
  })

  const openModal = (item?: Experience) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        company: item.company,
        position: item.position,
        description: item.description,
        startDate: item.startDate.split("T")[0],
        endDate: item.endDate?.split("T")[0] || "",
        current: item.current,
        location: item.location || "",
        order: item.order,
      })
    } else {
      setEditingItem(null)
      setFormData({
        company: "",
        position: "",
        description: "",
        startDate: "",
        endDate: "",
        current: false,
        location: "",
        order: 0,
      })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingItem(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: formData })
    } else {
      createMutation.mutate(formData)
    }
  }

  const experiences = data?.data || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Manage Experience</h2>
          <p className="text-muted-foreground">Add and manage your work experience.</p>
        </div>
        <Button onClick={() => openModal()} className="bg-main text-foreground hover:bg-main-dark">
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <Card key={exp.id}>
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-main/10">
                  <Building2 className="h-6 w-6 text-main" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle>{exp.position}</CardTitle>
                    {exp.current && (
                      <BadgeCustom variant="success" size="sm">
                        Current
                      </BadgeCustom>
                    )}
                  </div>
                  <p className="text-main font-medium">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    {exp.location && ` • ${exp.location}`}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => openModal(exp)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteMutation.mutate(exp.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{exp.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingItem ? "Edit Experience" : "Add Experience"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Company Name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                placeholder="Job Title"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your role and achievements..."
              rows={4}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                disabled={formData.current}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="San Francisco, CA"
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="current"
              checked={formData.current}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, current: checked, endDate: checked ? "" : formData.endDate })
              }
            />
            <Label htmlFor="current">I currently work here</Label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={closeModal}>
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
