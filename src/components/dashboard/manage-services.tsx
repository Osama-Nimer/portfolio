"use client"

import type React from "react"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Modal } from "@/src/components/ui/modal"
import { ServiceCard } from "@/src/components/ui/service-card"
import { servicesService } from "@/src/services/api/services.service"
import { useUIStore } from "@/src/stores/ui/ui.store"
import { SERVICE_ICONS } from "@/src/utils/constants"
import type { Service, ServiceFormData } from "@/src/types/services.types"

export function ManageServices() {
  const queryClient = useQueryClient()
  const { addToast } = useUIStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Service | null>(null)
  const [formData, setFormData] = useState<ServiceFormData>({
    title: "",
    description: "",
    icon: "code",
    order: 0,
  })

  const { data } = useQuery({
    queryKey: ["services"],
    queryFn: () => servicesService.getAll(),
  })

  const createMutation = useMutation({
    mutationFn: (data: ServiceFormData) => servicesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] })
      addToast({ title: "Service created", type: "success" })
      closeModal()
    },
    onError: (error: Error) => {
      addToast({ title: "Failed to create", description: error.message, type: "error" })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ServiceFormData> }) => servicesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] })
      addToast({ title: "Service updated", type: "success" })
      closeModal()
    },
    onError: (error: Error) => {
      addToast({ title: "Failed to update", description: error.message, type: "error" })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => servicesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] })
      addToast({ title: "Service deleted", type: "success" })
    },
    onError: (error: Error) => {
      addToast({ title: "Failed to delete", description: error.message, type: "error" })
    },
  })

  const openModal = (item?: Service) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        title: item.title,
        description: item.description,
        icon: item.icon || "code",
        order: item.order,
      })
    } else {
      setEditingItem(null)
      setFormData({ title: "", description: "", icon: "code", order: 0 })
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

  const services = data?.data || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Manage Services</h2>
          <p className="text-muted-foreground">Add and manage your services.</p>
        </div>
        <Button onClick={() => openModal()} className="bg-main text-foreground hover:bg-main-dark">
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div key={service.id} className="relative group">
            <ServiceCard service={service} />
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <Button variant="secondary" size="sm" onClick={() => openModal(service)}>
                <Pencil className="h-3 w-3" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => deleteMutation.mutate(service.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingItem ? "Edit Service" : "Add Service"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Web Development"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your service..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_ICONS.map((icon) => (
                  <SelectItem key={icon} value={icon}>
                    {icon.charAt(0).toUpperCase() + icon.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
