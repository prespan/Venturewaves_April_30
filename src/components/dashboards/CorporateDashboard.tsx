"use client";

import { useState } from "react";
import {
  Briefcase,
  FileText,
  Users,
  CalendarDays,
  MessageSquare,
  DollarSign,
  Clock,
  TrendingUp,
  ExternalLink,
  CheckCircle,
} from "lucide-react";

import { useCorporateChallenges } from "@/hooks/useCorporateChallenges";
import { useCorporateProposals } from "@/hooks/useCorporateProposals";
import { useCorporateProjects } from "@/hooks/useCorporateProjects";
import { useCorporatePartners } from "@/hooks/useCorporatePartners";

interface CorporateDashboardProps {
  organizationName?: string;
  corporateId: number;
}

// Demo data
const demoChallenges = [
  {
    id: 1,
    title: "Smart Energy Grid Optimization",
    description: "Enhance grid efficiency using AI and IoT. Looking for innovative solutions to optimize energy distribution and reduce carbon footprint.",
    deadline: "2025-07-30",
    phase1Budget: 500000,
    equityOffered: 15,
    status: "Active"
  },
  {
    id: 2,
    title: "Predictive Maintenance for Industrial Equipment", 
    description: "Predict failures using machine learning models. Reduce downtime and maintenance costs through advanced analytics.",
    deadline: "2025-08-15",
    phase1Budget: 700000,
    equityOffered: 12,
    status: "Active"
  },
  {
    id: 3,
    title: "Green Building Energy Management",
    description: "Optimize building energy consumption. Develop smart systems for sustainable urban development.",
    deadline: "2025-09-01", 
    phase1Budget: 900000,
    equityOffered: 20,
    status: "Active"
  }
];

const demoProposals = [
  {
    id: 1,
    title: "GridIQ by Antler",
    challenge: { title: "Smart Energy Grid Optimization" },
    status: "PENDING",
    submittedBy: "Antler",
    score: 4.8,
    submittedAt: "2025-01-15"
  },
  {
    id: 2,
    title: "SmartGridX by Founders Factory",
    challenge: { title: "Smart Energy Grid Optimization" },
    status: "UNDER_REVIEW", 
    submittedBy: "Founders Factory",
    score: 4.6,
    submittedAt: "2025-01-12"
  },
  {
    id: 3,
    title: "EquipPredict by eFounders",
    challenge: { title: "Predictive Maintenance for Industrial Equipment" },
    status: "APPROVED",
    submittedBy: "eFounders",
    score: 4.9,
    submittedAt: "2025-01-10"
  }
];

const demoProjects = [
  {
    id: 1,
    investment: 500000,
    milestones: ["Prototype Development", "Pilot Testing", "Market Validation"],
    challenge: { title: "Smart Energy Grid Optimization" },
    progress: 65,
    status: "On Track"
  },
  {
    id: 2,
    investment: 700000,
    milestones: ["MVP Development", "Customer Validation", "Scale Preparation"],
    challenge: { title: "Predictive Maintenance for Industrial Equipment" },
    progress: 40,
    status: "On Track"
  }
];

const demoPartners = {
  partners: [
    {
      id: 1,
      name: "Betaworks",
      description: "Product-focused studio for consumer apps and emerging technologies.",
      website: "https://betaworks.com",
      location: "New York, USA",
      rating: 4.8
    },
    {
      id: 2,
      name: "Zinc VC", 
      description: "Mission-driven startup studio solving society's biggest challenges.",
      website: "https://zinc.vc",
      location: "London, UK",
      rating: 4.6
    }
  ]
};

export default function CorporateDashboard(props: CorporateDashboardProps) {
  const { corporateId, organizationName } = props;
  const [activeTab, setActiveTab] = useState("challenges");
  
  const { data: challenges } = useCorporateChallenges(corporateId);
  const { data: proposals } = useCorporateProposals(corporateId);
  const { data: projects } = useCorporateProjects(corporateId);
  const { data: partners } = useCorporatePartners(corporateId);

  // Use demo data if database is empty
  const displayChallenges = challenges?.length ? challenges : demoChallenges;
  const displayProposals = proposals?.length ? proposals : demoProposals;
  const displayProjects = projects?.length ? projects : demoProjects;
  const displayPartners = partners?.partners?.length ? partners : demoPartners;

  const tabs = [
    { id: "challenges", label: "Challenges", icon: FileText, count: displayChallenges.length },
    { id: "proposals", label: "Proposals", icon: MessageSquare, count: displayProposals.length },
    { id: "projects", label: "Projects", icon: Briefcase, count: displayProjects.length },
    { id: "partners", label: "Partners", icon: Users, count: displayPartners.partners.length },
    { id: "messages", label: "Messages", icon: MessageSquare, count: 0 },
    { id: "calendar", label: "Calendar", icon: CalendarDays, count: 0 },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'under_review': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'active': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 -mx-16 -my-16 px-16 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {organizationName || "Corporate"} Dashboard
            </h1>
          </div>
          <p className="text-gray-600">
            Welcome! Manage your corporate innovation activity and partnerships below.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Challenges</p>
                <p className="text-2xl font-bold text-gray-900">{displayChallenges.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Proposals</p>
                <p className="text-2xl font-bold text-gray-900">{displayProposals.length}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">{displayProjects.length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Investment</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${displayProjects.reduce((sum, p) => sum + (p.investment || 0), 0).toLocaleString()}
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
                      ? "border-blue-500 text-blue-600 bg-blue-50"
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
          {activeTab === "challenges" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayChallenges.map((challenge: any) => (
                <div key={challenge.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 leading-tight">{challenge.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(challenge.status || 'active')}`}>
                        {challenge.status || 'Active'}
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
                    </div>
                    
                    <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                      Manage Challenge
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
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(proposal.status)}`}>
                        {proposal.status.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Challenge:</span> {proposal.challenge?.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Studio:</span> {proposal.submittedBy}
                      </p>
                      {proposal.score && (
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-gray-600">Score:</span>
                          <span className="text-sm font-bold text-emerald-600">{proposal.score}/5.0</span>
                        </div>
                      )}
                    </div>
                    
                    <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                      Review Proposal
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
                      <h3 className="text-xl font-semibold text-gray-900">Project #{project.id}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status || 'active')}`}>
                        {project.status || 'Active'}
                      </span>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-medium text-gray-600">Investment:</span>
                        <span className="text-lg font-bold text-emerald-600">${(project.investment || 0).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Challenge:</span> {project.challenge?.title}
                      </p>
                      
                      {project.progress && (
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-gray-600">Progress</span>
                            <span className="text-gray-600">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all" 
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
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "partners" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayPartners.partners.map((studio: any) => (
                <div key={studio.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{studio.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{studio.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      {studio.location && (
                        <p className="text-sm text-gray-500">📍 {studio.location}</p>
                      )}
                      {studio.rating && (
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-gray-600">Rating:</span>
                          <span className="text-sm font-bold text-emerald-600">{studio.rating}/5.0</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      {studio.website && (
                        <a
                          href={studio.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Visit Website
                        </a>
                      )}
                      <button
                        className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={() => alert(`Collaboration request sent to ${studio.name}`)}
                      >
                        Request Collaboration
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Messaging Coming Soon</h3>
              <p className="text-gray-500">Real-time communication with partners and studios will be available soon.</p>
            </div>
          )}

          {activeTab === "calendar" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <CalendarDays className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Calendar Integration Coming Soon</h3>
              <p className="text-gray-500">Schedule meetings and track important deadlines with integrated calendar functionality.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}