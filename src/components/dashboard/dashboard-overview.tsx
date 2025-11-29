"use client"

import { useQuery } from "@tanstack/react-query"
import { FolderKanban, Wrench, Briefcase, MessageSquare, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { projectsService } from "@/src/services/api/projects.service"
import { skillsService } from "@/src/services/api/skills.service"
import { servicesService } from "@/src/services/api/services.service"
import { messagesService } from "@/src/services/api/messages.service"

export function DashboardOverview() {
  const { data: projectsData } = useQuery({
    queryKey: ["projects"],
    queryFn: () => projectsService.getAll(),
  })

  const { data: skillsData } = useQuery({
    queryKey: ["skills"],
    queryFn: () => skillsService.getAll(),
  })

  const { data: servicesData } = useQuery({
    queryKey: ["services"],
    queryFn: () => servicesService.getAll(),
  })

  const { data: messagesData } = useQuery({
    queryKey: ["messages"],
    queryFn: () => messagesService.getAll(),
  })

  const stats = [
    {
      title: "Total Projects",
      value: projectsData?.data?.length || 0,
      icon: FolderKanban,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Skills",
      value: skillsData?.data?.length || 0,
      icon: Wrench,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Services",
      value: servicesData?.data?.length || 0,
      icon: Briefcase,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Messages",
      value: messagesData?.data?.length || 0,
      icon: MessageSquare,
      color: "text-main",
      bgColor: "bg-main/10",
    },
  ]

  const unreadMessages = messagesData?.data?.filter((m) => !m.read).length || 0

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Welcome back!</h2>
        <p className="text-muted-foreground">Here&apos;s an overview of your portfolio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`rounded-full p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-main" />
              Unread Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-main">{unreadMessages}</div>
            <p className="text-sm text-muted-foreground mt-1">
              {unreadMessages === 0 ? "All caught up!" : "Waiting for your response"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Featured Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">
              {projectsData?.data?.filter((p) => p.featured).length || 0}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Projects highlighted on your portfolio</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Messages */}
      {messagesData?.data && messagesData.data.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {messagesData.data.slice(0, 5).map((message) => (
                <div key={message.id} className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{message.name}</p>
                      {!message.read && <span className="h-2 w-2 rounded-full bg-main" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{message.subject}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(message.createdAt!).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
