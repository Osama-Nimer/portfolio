"use client"

import type React from "react"

import { useState } from "react"
import { ArrowUpRight, Mail, MapPin, Phone, Send } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { messagesService } from "@/src/services/api/messages.service"
import { Container } from "@/src/components/ui/container"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useUIStore } from "@/src/stores/ui/ui.store"
import { validateEmail, validateRequired } from "@/src/utils/validators"
import type { MessageFormData } from "@/src/types/messages.types"
import { FadeIn } from "@/src/components/shared/motion-wrapper"
import { PageHeader } from "@/src/components/shared/page-header"
import { META, RingNode, pillClass } from "@/src/components/shared/motif"

const contactRows = [
  { icon: Mail, label: "Email", value: "osamanimer6@gmail.com", href: "mailto:osamanimer6@gmail.com" },
  { icon: Phone, label: "Phone", value: "+962 7 9698 3276", href: "tel:+962796983276" },
  { icon: MapPin, label: "Location", value: "Amman, Jordan" },
]

type Field = keyof MessageFormData

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
        title: "Message sent",
        description: "Thanks for reaching out. I'll get back to you soon.",
        type: "success",
      })
      setFormData({ name: "", email: "", subject: "", message: "" })
    },
    onError: (error: Error) => {
      addToast({
        title: "Couldn't send your message",
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

  const fieldProps = (name: Field) => ({
    id: name,
    name,
    value: formData[name],
    onChange: handleChange,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  })

  const fieldError = (name: Field) =>
    errors[name] ? (
      <p id={`${name}-error`} className="text-[13px] text-danger">
        {errors[name]}
      </p>
    ) : null

  return (
    <>
      <PageHeader
        path="contact"
        title="Let's talk"
        muted="about your project"
        lead="Have a question or something you want built? Send a message and I'll reply within a day."
      />

      <section className="pb-8">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
            {/* Direct details */}
            <FadeIn>
              <div className="flex h-full flex-col rounded-xl border border-line bg-card">
                <ul className="divide-y divide-line">
                  {contactRows.map((row) => (
                    <li key={row.label} className="flex items-center gap-4 px-6 py-5">
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-foreground/[0.03] text-foreground">
                        <row.icon className="size-[18px]" />
                      </span>
                      <div className="min-w-0">
                        <p className={META}>{row.label}</p>
                        {row.href ? (
                          <a
                            href={row.href}
                            className="group mt-1 inline-flex items-center gap-1 truncate text-[15px] text-foreground transition-opacity hover:opacity-70"
                          >
                            {row.value}
                            <ArrowUpRight className="size-3.5 text-subtle" />
                          </a>
                        ) : (
                          <p className="mt-1 text-[15px] text-foreground">{row.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="fx-dots mt-auto flex items-center gap-3 rounded-b-xl border-t border-line px-6 py-5">
                  <RingNode live className="size-2 text-foreground" />
                  <p className="text-sm text-muted-foreground">Currently taking on new projects.</p>
                </div>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn delay={0.1}>
              <form onSubmit={handleSubmit} noValidate className="rounded-xl border border-line bg-card p-6 sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input {...fieldProps("name")} autoComplete="name" placeholder="Jane Doe" />
                    {fieldError("name")}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input {...fieldProps("email")} type="email" autoComplete="email" placeholder="jane@company.com" />
                    {fieldError("email")}
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input {...fieldProps("subject")} placeholder="Project inquiry" />
                  {fieldError("subject")}
                </div>

                <div className="mt-5 space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea {...fieldProps("message")} placeholder="Tell me about your project…" rows={6} />
                  {fieldError("message")}
                </div>

                <div className="mt-7 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-mono text-[12px] text-subtle">All fields are required.</p>
                  <button type="submit" disabled={mutation.isPending} className={pillClass({ className: "group" })}>
                    {mutation.isPending ? (
                      "Sending…"
                    ) : (
                      <>
                        Send message
                        <Send className="transition-transform duration-200 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  )
}
