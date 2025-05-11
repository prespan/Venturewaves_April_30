'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  Briefcase,
  FileText,
  Users,
  CalendarDays,
  MessageSquare,
} from 'lucide-react';

interface CorporateDashboardProps {
  corporate: {
    name: string;
    challenges: {
      id: number;
      title: string;
      description: string;
      deadline: string;
      proposals: {
        id: number;
        title: string;
        status: string;
      }[];
    }[];
    projects: {
      id: number;
      investment: number;
      milestones: any[];
    }[];
  };
}

export default function CorporateDashboard({ corporate }: CorporateDashboardProps) {
  return (
    <div className="p-6 space-y-6">
      <div className="text-3xl font-bold text-gray-800 dark:text-white">
        <Briefcase className="inline-block w-7 h-7 mr-2 text-blue-600" />
        {corporate.name} Dashboard
      </div>

      <Tabs defaultValue="challenges" className="w-full">
        <TabsList className="grid grid-cols-6 w-full mb-6">
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="challenges">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {corporate.challenges.length > 0 ? (
              corporate.challenges.map((challenge) => (
                <Card key={challenge.id}>
                  <CardHeader>
                    <CardTitle>{challenge.title}</CardTitle>
                    <CardDescription>{challenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Badge variant="outline">
                      Deadline: {new Date(challenge.deadline).toLocaleDateString()}
                    </Badge>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/challenges/${challenge.id}`}>View More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-gray-500">No challenges found.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="proposals">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {corporate.challenges.flatMap((c) => c.proposals).length > 0 ? (
              corporate.challenges.flatMap((c) => c.proposals).map((proposal) => (
                <Card key={proposal.id}>
                  <CardHeader>
                    <CardTitle>{proposal.title}</CardTitle>
                    <CardDescription>Status: {proposal.status}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/proposals/${proposal.id}`}>Review Proposal</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-gray-500">No proposals received.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {corporate.projects.length > 0 ? (
              corporate.projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <CardTitle>Project #{project.id}</CardTitle>
                    <CardDescription>
                      Investment: ${project.investment} | Milestones: {project.milestones.length}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/projects/${project.id}`}>View Project</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-gray-500">No projects currently.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="partners">
          <div className="text-gray-500 italic flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-400" /> Partner Matching coming soon...
          </div>
        </TabsContent>

        <TabsContent value="messages">
          <div className="text-gray-500 italic flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-gray-400" /> Messaging feature coming soon...
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <div className="text-gray-500 italic flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-gray-400" /> Calendar view coming soon...
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
