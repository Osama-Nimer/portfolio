"use client"

import type React from "react"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Modal } from "@/src/components/ui/modal"
import { aboutService } from "@/src/services/api/about.service"
import { useUIStore } from "@/src/stores/ui/ui.store"
import type { About, AboutFormData } from "@/src/types/about.types"

export function ManageAbout() {
  const queryClient = useQueryClient()
  const { addToast } = useUIStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<About | null>(null)
  const [formData, setFormData] = useState<AboutFormData>({
    title: "",
    description: "",
    imageUrl: "",
    resumeUrl: "",
  })

  const { data, isLoading } = useQuery({
    queryKey: ["about"],
    queryFn: () => aboutService.getAll(),
  })

  const createMutation = useMutation({
    mutationFn: (data: AboutFormData) => aboutService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] })
      addToast({ title: "About entry created", type: "success" })
      closeModal()
    },
    onError: (error: Error) => {
      addToast({ title: "Failed to create", description: error.message, type: "error" })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<AboutFormData> }) => aboutService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] })
      addToast({ title: "About entry updated", type: "success" })
      closeModal()
    },
    onError: (error: Error) => {
      addToast({ title: "Failed to update", description: error.message, type: "error" })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => aboutService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] })
      addToast({ title: "About entry deleted", type: "success" })
    },
    onError: (error: Error) => {
      addToast({ title: "Failed to delete", description: error.message, type: "error" })
    },
  })

  const openModal = (item?: About) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        title: item.title,
        description: item.description,
        imageUrl: item.imageUrl || "",
        resumeUrl: item.resumeUrl || "",
      })
    } else {
      setEditingItem(null)
      setFormData({ title: "", description: "", imageUrl: "", resumeUrl: "" })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingItem(null)
    setFormData({ title: "", description: "", imageUrl: "", resumeUrl: "" })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: formData })
    } else {
      createMutation.mutate(formData)
    }
  }

  const aboutItems = data?.data || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Manage About</h2>
          <p className="text-muted-foreground">Update your about section information.</p>
        </div>
        <Button onClick={() => openModal()} className="bg-main text-foreground hover:bg-main-dark">
          <Plus className="mr-2 h-4 w-4" />
          Add Entry
        </Button>
      </div>

      {/* About entries list */}
      <div className="grid gap-4">
        {aboutItems.map((item) => (
          <Card key={item.id}>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>{item.title}</CardTitle>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => openModal(item)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteMutation.mutate(item.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">{item.description}</p>
            </CardContent>
          </Card>
        ))}

        {aboutItems.length === 0 && !isLoading && (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No about entries yet. Add your first one!</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingItem ? "Edit About Entry" : "Add About Entry"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="About Me"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Tell your story..."
              rows={6}
              required
            />
          </div>

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
            <Label htmlFor="resumeUrl">Resume URL</Label>
            <Input
              id="resumeUrl"
              value={formData.resumeUrl}
              onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
              placeholder="https://example.com/resume.pdf"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-main text-foreground hover:bg-main-dark"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {createMutation.isPending || updateMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
