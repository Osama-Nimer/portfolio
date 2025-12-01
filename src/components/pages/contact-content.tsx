"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { messagesService } from "@/src/services/api/messages.service"
import { Container } from "@/src/components/ui/container"
import { SectionTitle } from "@/src/components/shared/section-title"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useUIStore } from "@/src/stores/ui/ui.store"
import { validateEmail, validateRequired } from "@/src/utils/validators"
import type { MessageFormData } from "@/src/types/messages.types"

export function ContactContent() {
  const { addToast } = useUIStore()
  const [formData, setFormData] = useState<MessageFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const mutation = useMutation({
    mutationFn: (data: MessageFormData) => messagesService.create(data),
    onSuccess: () => {
      addToast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
        type: "success",
      })
      setFormData({ name: "", email: "", subject: "", message: "" })
    },
    onError: (error: Error) => {
      addToast({
        title: "Failed to send message",
        description: error.message,
        type: "error",
      })
    },
  })

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    const nameError = validateRequired(formData.name, "Name")
    if (nameError) newErrors.name = nameError

    const emailError = validateRequired(formData.email, "Email")
    if (emailError) {
      newErrors.email = emailError
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    const subjectError = validateRequired(formData.subject, "Subject")
    if (subjectError) newErrors.subject = subjectError

    const messageError = validateRequired(formData.message, "Message")
    if (messageError) newErrors.message = messageError

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      mutation.mutate(formData)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <section className="py-20">
      <Container>
        <SectionTitle title="Get In Touch" subtitle="Have a question or want to work together? Drop me a message!" />

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-6">Contact Information</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-main/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-main" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <a href="mailto:hello@example.com" className="text-muted-foreground hover:text-main">
                    osamanimer6@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-main/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-main" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Phone</p>
                  <a href="tel:+1234567890" className="text-muted-foreground hover:text-main">
                    +962 7 9698 3276
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-main/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-main" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Location</p>
                  <p className="text-muted-foreground">Amman Jordan</p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-8 aspect-video rounded-xl overflow-hidden bg-muted">
              <img src="/san-francisco-map.png" alt="Location map" className="h-full w-full object-cover" />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  className={errors.subject ? "border-destructive" : ""}
                />
                {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={6}
                  className={errors.message ? "border-destructive" : ""}
                />
                {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-main text-foreground hover:bg-main-dark"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}
