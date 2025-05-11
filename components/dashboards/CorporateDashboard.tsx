'use client'

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, FileText, Users, CalendarDays, MessageSquare } from "lucide-react";

export default function CorporateDashboard({ organizationName = "Siemens" }) {
  const [activeTab, setActiveTab] = useState("challenges");

  const EmptyState = ({ title, description }: { title: string; description: string }) => (
    <div className="text-center py-12 text-gray-500">
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-sm mt-2">{description}</p>
    </div>
  );

  const SectionCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
    <Card className="w-full sm:max-w-md">
      <CardHeader className="flex flex-row items-center gap-3">
        <Icon className="text-muted-foreground" />
        <div>
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Button variant="outline" size="sm">View More</Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{organizationName} Dashboard</h1>
      <Tabs defaultValue="challenges" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="challenges">My Challenges</TabsTrigger>
          <TabsTrigger value="proposals">Incoming Proposals</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="partners">Partner Matching</TabsTrigger>
          <TabsTrigger value="messages">Messaging</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="challenges">
          <EmptyState title="No Challenges" description="Create or manage innovation challenges." />
        </TabsContent>

        <TabsContent value="proposals">
          <EmptyState title="No Proposals" description="Incoming proposals from innovators will appear here." />
        </TabsContent>

        <TabsContent value="projects">
          <EmptyState title="No Projects" description="Track projects initiated through collaborations." />
        </TabsContent>

        <TabsContent value="partners">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SectionCard icon={Users} title="Find Research Partners" description="Connect with leading universities." />
            <SectionCard icon={Briefcase} title="Engage Studios" description="Partner with venture studios." />
            <SectionCard icon={FileText} title="Investor Matching" description="Collaborate with strategic investors." />
          </div>
        </TabsContent>

        <TabsContent value="messages">
          <EmptyState title="No Conversations" description="Your messages will appear here." />
        </TabsContent>

        <TabsContent value="calendar">
          <EmptyState title="No Events Scheduled" description="Upcoming meetings and events will be shown here." />
        </TabsContent>
      </Tabs>
    </div>
  );
}