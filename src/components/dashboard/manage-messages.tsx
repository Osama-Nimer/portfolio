"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Mail, MailOpen, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Modal } from "@/src/components/ui/modal"
import { BadgeCustom } from "@/src/components/ui/badge-custom"
import { messagesService } from "@/src/services/api/messages.service"
import { useUIStore } from "@/src/stores/ui/ui.store"
import { formatRelativeTime } from "@/src/utils/formatters"
import type { Message } from "@/src/types/messages.types"

export function ManageMessages() {
  const queryClient = useQueryClient()
  const { addToast } = useUIStore()
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const { data } = useQuery({
    queryKey: ["messages", filter],
    queryFn: () => messagesService.getAll(filter === "unread" ? true : undefined),
  })

  const markAsReadMutation = useMutation({
    mutationFn: (id: number) => messagesService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => messagesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] })
      addToast({ title: "Message deleted", type: "success" })
      setSelectedMessage(null)
    },
    onError: (error: Error) => {
      addToast({ title: "Failed to delete", description: error.message, type: "error" })
    },
  })

  const openMessage = (message: Message) => {
    setSelectedMessage(message)
    if (!message.read) {
      markAsReadMutation.mutate(message.id)
    }
  }

  const messages = data?.data || []
  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Messages</h2>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
            All
          </Button>
          <Button variant={filter === "unread" ? "default" : "outline"} size="sm" onClick={() => setFilter("unread")}>
            Unread
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {messages.map((message) => (
          <Card
            key={message.id}
            className={`cursor-pointer transition-colors hover:border-main/50 ${!message.read ? "border-main/30 bg-main/5" : ""}`}
            onClick={() => openMessage(message)}
          >
            <CardContent className="flex items-start gap-4 p-4">
              <div className="flex-shrink-0">
                {message.read ? (
                  <MailOpen className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Mail className="h-5 w-5 text-main" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`font-medium ${!message.read ? "text-foreground" : "text-muted-foreground"}`}>
                    {message.name}
                  </p>
                  {!message.read && (
                    <BadgeCustom variant="primary" size="sm">
                      New
                    </BadgeCustom>
                  )}
                </div>
                <p className="text-sm text-foreground truncate">{message.subject}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {message.email} • {formatRelativeTime(message.createdAt!)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  deleteMutation.mutate(message.id)
                }}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}

        {messages.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No messages yet.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Message Detail Modal */}
      <Modal isOpen={!!selectedMessage} onClose={() => setSelectedMessage(null)} title="Message Details" size="lg">
        {selectedMessage && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">From</p>
                <p className="font-medium text-foreground">{selectedMessage.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <a href={`mailto:${selectedMessage.email}`} className="font-medium text-main hover:underline">
                  {selectedMessage.email}
                </a>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Subject</p>
              <p className="font-medium text-foreground">{selectedMessage.subject}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Message</p>
              <div className="rounded-lg bg-muted p-4">
                <p className="text-foreground whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                Received: {new Date(selectedMessage.createdAt!).toLocaleString()}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => deleteMutation.mutate(selectedMessage.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
                <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}>
                  <Button className="bg-main text-foreground hover:bg-main-dark">Reply</Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
