"use client"

import type React from "react"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus, Pencil, Trash2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Modal } from "@/src/components/ui/modal"
import { BadgeCustom } from "@/src/components/ui/badge-custom"
import { projectsService } from "@/src/services/api/projects.service"
import { useUIStore } from "@/src/stores/ui/ui.store"
import type { Project, ProjectFormData } from "@/src/types/projects.types"

export function ManageProjects() {
  const queryClient = useQueryClient()
  const { addToast } = useUIStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Project | null>(null)
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    imageUrl: "",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    order: 0,
    tags: [],
  })
  const [tagsInput, setTagsInput] = useState("")

  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: () => projectsService.getAll(),
  })

  const createMutation = useMutation({
    mutationFn: (data: ProjectFormData) => projectsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      addToast({ title: "Project created", type: "success" })
      closeModal()
    },
    onError: (error: Error) => {
      addToast({ title: "Failed to create", description: error.message, type: "error" })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ProjectFormData> }) => projectsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      addToast({ title: "Project updated", type: "success" })
      closeModal()
    },
    onError: (error: Error) => {
      addToast({ title: "Failed to update", description: error.message, type: "error" })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => projectsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      addToast({ title: "Project deleted", type: "success" })
    },
    onError: (error: Error) => {
      addToast({ title: "Failed to delete", description: error.message, type: "error" })
    },
  })

  const openModal = (item?: Project) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        title: item.title,
        description: item.description,
        imageUrl: item.imageUrl || "",
        liveUrl: item.liveUrl || "",
        githubUrl: item.githubUrl || "",
        featured: item.featured,
        order: item.order,
        tags: item.tags?.map((t) => t.name) || [],
      })
      setTagsInput(item.tags?.map((t) => t.name).join(", ") || "")
    } else {
      setEditingItem(null)
      setFormData({
        title: "",
        description: "",
        imageUrl: "",
        liveUrl: "",
        githubUrl: "",
        featured: false,
        order: 0,
        tags: [],
      })
      setTagsInput("")
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingItem(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
    const submitData = { ...formData, tags }

    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: submitData })
    } else {
      createMutation.mutate(submitData)
    }
  }

  const projects = data?.data || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Manage Projects</h2>
          <p className="text-muted-foreground">Add and manage your portfolio projects.</p>
        </div>
        <Button onClick={() => openModal()} className="bg-main text-foreground hover:bg-main-dark">
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <div className="aspect-video bg-muted relative">
              {project.imageUrl ? (
                <img
                  src={project.imageUrl || "/placeholder.svg"}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-4xl font-bold text-main/30">{project.title[0]}</span>
                </div>
              )}
              {project.featured && (
                <div className="absolute top-2 left-2">
                  <BadgeCustom variant="primary" size="sm">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </BadgeCustom>
                </div>
              )}
            </div>
            <CardHeader className="flex flex-row items-start justify-between">
              <CardTitle className="text-lg">{project.title}</CardTitle>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => openModal(project)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteMutation.mutate(project.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
              {project.tags && project.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {project.tags.slice(0, 3).map((tag) => (
                    <BadgeCustom key={tag.id} variant="outline" size="sm">
                      {tag.name}
                    </BadgeCustom>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingItem ? "Edit Project" : "Add Project"} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Project Name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your project..."
              rows={4}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="liveUrl">Live URL</Label>
              <Input
                id="liveUrl"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                placeholder="https://project.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input
              id="githubUrl"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              placeholder="https://github.com/user/repo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="React, TypeScript, Node.js"
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
            />
            <Label htmlFor="featured">Featured Project</Label>
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
