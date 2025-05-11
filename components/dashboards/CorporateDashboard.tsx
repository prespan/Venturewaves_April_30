'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Briefcase,
  FileText,
  Users,
  CalendarDays,
  MessageSquare
} from "lucide-react"
import { useState } from "react"

interface CorporateDashboardProps {
  corporate: {
    name: string
    challenges?: {
      id: number
      title: string
      description: string
      deadline: string
      proposals?: {
        id: number
        title: string
        status: string
      }[]
    }[]
    projects?: {
      id: number
      investment: number
      milestones?: {
        id: number
      }[]
    }[]
  }
}

export default function CorporateDashboard({ corporate }: CorporateDashboardProps) {
  const [tab, setTab] = useState("challenges")

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-blue-600" />
          {corporate?.name || "Corporate"} Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Welcome! Manage your corporate innovation activity below.
        </p>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="space-y-4">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="challenges"><FileText className="w-4 h-4 mr-1" />Challenges</TabsTrigger>
          <TabsTrigger value="proposals"><MessageSquare className="w-4 h-4 mr-1" />Proposals</TabsTrigger>
          <TabsTrigger value="projects"><Briefcase className="w-4 h-4 mr-1" />Projects</TabsTrigger>
          <TabsTrigger value="partners"><Users className="w-4 h-4 mr-1" />Partners</TabsTrigger>
          <TabsTrigger value="messages"><MessageSquare className="w-4 h-4 mr-1" />Messages</TabsTrigger>
          <TabsTrigger value="calendar"><CalendarDays className="w-4 h-4 mr-1" />Calendar</TabsTrigger>
        </TabsList>

        {/* Challenges */}
        <TabsContent value="challenges">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {corporate?.challenges?.length ? corporate.challenges.map(challenge => (
              <Card key={challenge.id}>
                <CardHeader>
                  <CardTitle>{challenge.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-2">Deadline: {new Date(challenge.deadline).toLocaleDateString()}</p>
                  <Button size="sm" variant="outline">View More</Button>
                </CardContent>
              </Card>
            )) : (
              <p className="text-sm text-muted-foreground">No challenges yet.</p>
            )}
          </div>
        </TabsContent>

        {/* Proposals */}
        <TabsContent value="proposals">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {corporate?.challenges?.flatMap(c => c.proposals || [])?.length ? corporate.challenges.flatMap(c => c.proposals || []).map(proposal => (
              <Card key={proposal.id}>
                <CardHeader>
                  <CardTitle>{proposal.title}</CardTitle>
                  <CardDescription>Status: {proposal.status}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size="sm" variant="outline">Review</Button>
                </CardContent>
              </Card>
            )) : (
              <p className="text-sm text-muted-foreground">No incoming proposals.</p>
            )}
          </div>
        </TabsContent>

        {/* Projects */}
        <TabsContent value="projects">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {corporate?.projects?.length ? corporate.projects.map(project => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>Project #{project.id}</CardTitle>
                  <CardDescription>Investment: ${project.investment}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-2">Milestones: {project.milestones?.length || 0}</p>
                  <Button size="sm" variant="outline">View Details</Button>
                </CardContent>
              </Card>
            )) : (
              <p className="text-sm text-muted-foreground">No projects available.</p>
            )}
          </div>
        </TabsContent>

        {/* Coming Soon */}
        <TabsContent value="partners">
          <Card><CardContent>🤝 Partner Matching coming soon</CardContent></Card>
        </TabsContent>

        <TabsContent value="messages">
          <Card><CardContent>💬 Messaging feature coming soon</CardContent></Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card><CardContent>📅 Corporate Calendar coming soon</CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
