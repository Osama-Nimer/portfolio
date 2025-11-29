"use client"

import type React from "react"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus, Pencil, Trash2, Award, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Modal } from "@/src/components/ui/modal"
import { experienceService } from "@/src/services/api/experience.service"
import { useUIStore } from "@/src/stores/ui/ui.store"
import { formatDate } from "@/src/utils/formatters"
import type { Certificate, CertificateFormData } from "@/src/types/experience.types"

export function ManageCertificates() {
  const queryClient = useQueryClient()
  const { addToast } = useUIStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Certificate | null>(null)
  const [formData, setFormData] = useState<CertificateFormData>({
    name: "",
    issuer: "",
    issueDate: "",
    expiryDate: "",
    credentialId: "",
    credentialUrl: "",
    imageUrl: "",
    order: 0,
  })

  const { data } = useQuery({
    queryKey: ["certificates"],
    queryFn: () => experienceService.getAllCertificates(),
  })

  const createMutation = useMutation({
    mutationFn: (data: CertificateFormData) => experienceService.createCertificate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] })
      addToast({ title: "Certificate added", type: "success" })
      closeModal()
    },
    onError: (error: Error) => {
      addToast({ title: "Failed to create", description: error.message, type: "error" })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CertificateFormData> }) =>
      experienceService.updateCertificate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] })
      addToast({ title: "Certificate updated", type: "success" })
      closeModal()
    },
    onError: (error: Error) => {
      addToast({ title: "Failed to update", description: error.message, type: "error" })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => experienceService.deleteCertificate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] })
      addToast({ title: "Certificate deleted", type: "success" })
    },
    onError: (error: Error) => {
      addToast({ title: "Failed to delete", description: error.message, type: "error" })
    },
  })

  const openModal = (item?: Certificate) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        name: item.name,
        issuer: item.issuer,
        issueDate: item.issueDate.split("T")[0],
        expiryDate: item.expiryDate?.split("T")[0] || "",
        credentialId: item.credentialId || "",
        credentialUrl: item.credentialUrl || "",
        imageUrl: item.imageUrl || "",
        order: item.order,
      })
    } else {
      setEditingItem(null)
      setFormData({
        name: "",
        issuer: "",
        issueDate: "",
        expiryDate: "",
        credentialId: "",
        credentialUrl: "",
        imageUrl: "",
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

  const certificates = data?.data || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Manage Certificates</h2>
          <p className="text-muted-foreground">Add and manage your certifications.</p>
        </div>
        <Button onClick={() => openModal()} className="bg-main text-foreground hover:bg-main-dark">
          <Plus className="mr-2 h-4 w-4" />
          Add Certificate
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert) => (
          <Card key={cert.id}>
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="flex items-start gap-3">
                <Award className="h-8 w-8 text-main flex-shrink-0" />
                <div>
                  <CardTitle className="text-base">{cert.name}</CardTitle>
                  <p className="text-sm text-main">{cert.issuer}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => openModal(cert)}>
                  <Pencil className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteMutation.mutate(cert.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Issued: {formatDate(cert.issueDate)}</p>
              {cert.expiryDate && (
                <p className="text-xs text-muted-foreground">Expires: {formatDate(cert.expiryDate)}</p>
              )}
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-sm text-main hover:underline"
                >
                  View Credential
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingItem ? "Edit Certificate" : "Add Certificate"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Certificate Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="AWS Certified Developer"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="issuer">Issuer</Label>
              <Input
                id="issuer"
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                placeholder="Amazon Web Services"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="issueDate">Issue Date</Label>
              <Input
                id="issueDate"
                type="date"
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date (optional)</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="credentialId">Credential ID (optional)</Label>
            <Input
              id="credentialId"
              value={formData.credentialId}
              onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
              placeholder="ABC123XYZ"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="credentialUrl">Credential URL (optional)</Label>
            <Input
              id="credentialUrl"
              value={formData.credentialUrl}
              onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
              placeholder="https://verify.example.com/credential"
            />
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
