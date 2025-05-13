"use client"

import useSWR from "swr";
import { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, FileText, Users, CalendarDays, MessageSquare } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface CorporateDashboardProps {
  organizationName?: string;
  corporateId: number;
}

export default function CorporateDashboard({ corporateId, organizationName }: CorporateDashboardProps) {
  const { data: challenges, error: challengesError } = useSWR(`/api/corporates/${corporateId}/challenges`, fetcher);
  const { data: proposals, error: proposalsError } = useSWR(`/api/corporates/${corporateId}/proposals`, fetcher);
  const { data: projects, error: projectsError } = useSWR(`/api/corporates/${corporateId}/projects`, fetcher);

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-blue-600" /> {organizationName || "Corporate"} Dashboard
        </h1>
        <p className="text-sm text-gray-500">Welcome! Manage your corporate innovation activity below.</p>
      </div>

      <Tabs defaultValue="challenges" className="w-full">
        <TabsList className="grid grid-cols-6 w-full mb-4">
          <TabsTrigger value="challenges"><FileText className="inline-block w-4 h-4 mr-1" /> Challenges</TabsTrigger>
          <TabsTrigger value="proposals"><MessageSquare className="inline-block w-4 h-4 mr-1" /> Proposals</TabsTrigger>
          <TabsTrigger value="projects"><Briefcase className="inline-block w-4 h-4 mr-1" /> Projects</TabsTrigger>
          <TabsTrigger value="partners"><Users className="inline-block w-4 h-4 mr-1" /> Partners</TabsTrigger>
          <TabsTrigger value="messages"><MessageSquare className="inline-block w-4 h-4 mr-1" /> Messages</TabsTrigger>
          <TabsTrigger value="calendar"><CalendarDays className="inline-block w-4 h-4 mr-1" /> Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="challenges">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {challenges?.length ? (
              challenges.map((challenge: any) => (
                <Card key={challenge.id}>
                  <CardHeader>
                    <CardTitle>{challenge.title}</CardTitle>
                    <CardDescription>{challenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-2">Deadline: {new Date(challenge.deadline).toLocaleDateString()}</p>
                    <Button variant="outline" size="sm">Manage</Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-sm text-gray-500">No challenges yet.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="proposals">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {proposals?.length ? (
              proposals.map((proposal: any) => (
                <Card key={proposal.id}>
                  <CardHeader>
                    <CardTitle>{proposal.title}</CardTitle>
                    <CardDescription>Challenge: {proposal.challenge?.title || "N/A"}<br />Status: {proposal.status}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm">Review</Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-sm text-gray-500">No proposals yet.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects?.length ? (
              projects.map((project: any) => (
                <Card key={project.id}>
                  <CardHeader>
                    <CardTitle>Project #{project.id}</CardTitle>
                    <CardDescription>
                      Investment: ${project.investment}<br />
                      Milestones: {project.milestones?.length || 0}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm">View</Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-sm text-gray-500">No projects yet.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="partners">
          <p className="text-sm text-gray-500">🤝 Partner Matching coming soon...</p>
        </TabsContent>

        <TabsContent value="messages">
          <p className="text-sm text-gray-500">💬 Messaging coming soon...</p>
        </TabsContent>

        <TabsContent value="calendar">
          <p className="text-sm text-gray-500">📅 Calendar integration coming soon...</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
