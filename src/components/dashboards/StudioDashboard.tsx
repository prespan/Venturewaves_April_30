"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Bookmark,
  FileText,
  Users,
  CalendarDays,
  MessageSquare,
  DollarSign,
  Clock,
  TrendingUp,
  ExternalLink,
  CheckCircle,
  Rocket,
  Lightbulb,
} from "lucide-react";

import { useStudioChallenges } from "@/hooks/useStudioChallenges";
import { useStudioProposals } from "@/hooks/useStudioProposals";
import { useStudioProjects } from "@/hooks/useStudioProjects";
import { useStudioPartners } from "@/hooks/useStudioPartners";

interface StudioDashboardProps {
  organizationName?: string;
  studioId: number;
}

// Demo data for Studio
const demoSavedChallenges = [
  {
    id: 1,
    title: "AI-Powered Financial Analytics",
    description: "Build intelligent analytics platform for real-time financial data processing and automated investment insights.",
    deadline: "2025-08-15",
    phase1Budget: 800000,
    equityOffered: 12,
    organization: "Goldman Sachs",
    status: "Saved"
  },
  {
    id: 2,
    title: "Sustainable Supply Chain Optimization",
    description: "Create blockchain-based supply chain tracking system for carbon footprint reduction and transparency.",
    deadline: "2025-09-01",
    phase1Budget: 1200000,
    equityOffered: 18,
    organization: "Unilever",
    status: "Saved"
  },
  {
    id: 3,
    title: "Healthcare Data Interoperability",
    description: "Develop secure platform for seamless healthcare data exchange between medical institutions.",
    deadline: "2025-07-20",
    phase1Budget: 950000,
    equityOffered: 15,
    organization: "NHS Digital",
    status: "Saved"
  }
];

const demoProposals = [
  {
    id: 1,
    title: "FinAI Analytics Suite",
    challenge: { title: "AI-Powered Financial Analytics" },
    status: "SUBMITTED",
    submittedAt: "2025-01-20",
    organization: "Goldman Sachs",
    stage: "Under Review"
  },
  {
    id: 2,
    title: "GreenChain Tracker",
    challenge: { title: "Sustainable Supply Chain Optimization" },
    status: "DRAFT",
    submittedAt: "2025-01-18",
    organization: "Unilever",
    stage: "In Progress"
  },
  {
    id: 3,
    title: "MedLink Platform",
    challenge: { title: "Healthcare Data Interoperability" },
    status: "ACCEPTED",
    submittedAt: "2025-01-15",
    organization: "NHS Digital",
    stage: "Project Phase"
  }
];

const demoProjects = [
  {
    id: 1,
    title: "MedLink Platform",
    investment: 950000,
    milestones: ["MVP Development", "Pilot Testing", "Integration", "Launch"],
    challenge: { title: "Healthcare Data Interoperability" },
    progress: 75,
    status: "Active",
    organization: "NHS Digital"
  },
  {
    id: 2,
    title: "FinAI Analytics Suite",
    investment: 800000,
    milestones: ["Research", "Prototype", "Testing", "Deployment"],
    challenge: { title: "AI-Powered Financial Analytics" },
    progress: 45,
    status: "Development",
    organization: "Goldman Sachs"
  }
];

const demoPartners = {
  partners: [
    {
      id: 1,
      name: "Goldman Sachs Innovation Lab",
      description: "Leading financial innovation hub for next-generation fintech solutions.",
      website: "https://gs.com/innovation",
      location: "New York, USA",
      type: "Corporate Partner",
      collaborations: 3
    },
    {
      id: 2,
      name: "Unilever Foundry",
      description: "Sustainable innovation platform connecting startups with global FMCG challenges.",
      website: "https://unilever.com/foundry",
      location: "London, UK",
      type: "Corporate Partner",
      collaborations: 2
    }
  ]
};

export default function StudioDashboard(props: StudioDashboardProps) {
  const { studioId, organizationName } = props;
  const [activeTab, setActiveTab] = useState("saved");
  
  const { data: savedChallenges } = useStudioChallenges(studioId);
  const { data: proposals } = useStudioProposals(studioId);
  const { data: projects } = useStudioProjects(studioId);
  const { data: partners } = useStudioPartners(studioId);

  // Use demo data if database is empty
  const displaySavedChallenges = savedChallenges?.length ? savedChallenges : demoSavedChallenges;
  const displayProposals = proposals?.length ? proposals : demoProposals;
  const displayProjects = projects?.length ? projects : demoProjects;
  const displayPartners = partners?.partners?.length ? partners : demoPartners;

  const tabs = [
    { id: "saved", label: "Saved Challenges", icon: Bookmark, count: displaySavedChallenges.length },
    { id: "proposals", label: "My Proposals", icon: Lightbulb, count: displayProposals.length },
    { id: "projects", label: "Projects", icon: Rocket, count: displayProjects.length },
    { id: "partners", label: "Partners", icon: Users, count: displayPartners.partners.length },
    { id: "messages", label: "Messages", icon: MessageSquare, count: 0 },
    { id: "calendar", label: "Calendar", icon: CalendarDays, count: 0 },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'saved': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'submitted': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'active': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'development': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalValue = displayProjects.reduce((sum, p) => sum + (p.investment || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 -mx-16 -my-16 px-16 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-slate-600 rounded-lg">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {organizationName || "Studio"} Dashboard
            </h1>
          </div>
          <p className="text-gray-600">
            Discover opportunities, manage proposals, and track your innovation projects.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Saved Challenges</p>
                <p className="text-2xl font-bold text-gray-900">{displaySavedChallenges.length}</p>
              </div>
              <Bookmark className="w-8 h-8 text-slate-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Proposals</p>
                <p className="text-2xl font-bold text-gray-900">{displayProposals.length}</p>
              </div>
              <Lightbulb className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Running Projects</p>
                <p className="text-2xl font-bold text-gray-900">{displayProjects.length}</p>
              </div>
              <Rocket className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Project Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalValue.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-slate-500 text-slate-600 bg-slate-50"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "saved" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {displaySavedChallenges.map((challenge: any) => (
                <div key={challenge.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 leading-tight">{challenge.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${getStatusColor(challenge.status || 'saved')}`}>
                        {challenge.status || 'Saved'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        Deadline: {new Date(challenge.deadline).toLocaleDateString()}
                      </div>
                      {challenge.phase1Budget && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <DollarSign className="w-4 h-4" />
                          Budget: ${challenge.phase1Budget.toLocaleString()}
                        </div>
                      )}
                      {challenge.equityOffered && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <TrendingUp className="w-4 h-4" />
                          Equity: {challenge.equityOffered}%
                        </div>
                      )}
                      {challenge.organization && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Users className="w-4 h-4" />
                          From: {challenge.organization}
                        </div>
                      )}
                    </div>
                    
                    <button className="w-full px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-colors">
                      Submit Proposal
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "proposals" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayProposals.map((proposal: any) => (
                <div key={proposal.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{proposal.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${getStatusColor(proposal.status)}`}>
                        {proposal.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Challenge:</span> {proposal.challenge?.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Organization:</span> {proposal.organization}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Stage:</span> {proposal.stage}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Submitted:</span> {new Date(proposal.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                      {proposal.status === 'DRAFT' ? 'Continue Editing' : 'View Details'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "projects" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {displayProjects.map((project: any) => (
                <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${getStatusColor(project.status || 'active')}`}>
                        {project.status || 'Active'}
                      </span>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-medium text-gray-600">Value:</span>
                        <span className="text-lg font-bold text-emerald-600">${(project.investment || 0).toLocaleString()}</span>
                      </div>
                      
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Challenge:</span> {project.challenge?.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Partner:</span> {project.organization}
                      </p>
                      
                      {project.progress && (
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-gray-600">Progress</span>
                            <span className="text-gray-600">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-slate-600 h-2 rounded-full transition-all" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Milestones ({project.milestones?.length || 0})</p>
                        <div className="space-y-1">
                          {project.milestones?.slice(0, 3).map((milestone: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              {milestone}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                      View Project Dossier
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "partners" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayPartners.partners.map((partner: any) => (
                <div key={partner.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{partner.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      {partner.location && (
                        <p className="text-sm text-gray-500">📍 {partner.location}</p>
                      )}
                      {partner.type && (
                        <p className="text-sm text-gray-500">🏢 {partner.type}</p>
                      )}
                      {partner.collaborations && (
                        <p className="text-sm text-gray-500">🤝 {partner.collaborations} collaborations</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      {partner.website && (
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-slate-600 hover:text-slate-700 text-sm font-medium"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Visit Website
                        </a>
                      )}
                      <button
                        className="w-full px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors"
                        onClick={() => alert(`Initiating partnership with ${partner.name}`)}
                      >
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "messages" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Messaging Coming Soon</h3>
              <p className="text-gray-500">Real-time communication with partners and challenge owners.</p>
            </div>
          )}

          {activeTab === "calendar" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <CalendarDays className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Calendar Integration Coming Soon</h3>
              <p className="text-gray-500">Track deadlines, meetings, and project milestones.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}