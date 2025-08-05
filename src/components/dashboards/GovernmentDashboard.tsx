"use client";

import { useState } from "react";
import {
  Building2,
  FileText,
  Users,
  CalendarDays,
  MessageSquare,
  DollarSign,
  Clock,
  TrendingUp,
  ExternalLink,
  CheckCircle,
  Target,
} from "lucide-react";

import { useGovernmentChallenges } from "@/hooks/useGovernmentChallenges";
import { useGovernmentProposals } from "@/hooks/useGovernmentProposals";
import { useGovernmentProjects } from "@/hooks/useGovernmentProjects";
import { useGovernmentPartners } from "@/hooks/useGovernmentPartners";

interface GovernmentDashboardProps {
  organizationName?: string;
  governmentId: number;
}

// Demo data for Government
const demoChallenges = [
  {
    id: 1,
    title: "Smart City Infrastructure Development",
    description: "Develop intelligent urban systems for traffic management, waste collection, and public safety using IoT and AI technologies.",
    deadline: "2025-08-30",
    phase1Budget: 2000000,
    publicBenefit: "Urban Efficiency",
    status: "Active"
  },
  {
    id: 2,
    title: "Digital Health Records Integration",
    description: "Create a unified digital health platform for secure patient data sharing across healthcare providers.",
    deadline: "2025-09-15",
    phase1Budget: 1500000,
    publicBenefit: "Healthcare Access",
    status: "Active"
  },
  {
    id: 3,
    title: "Climate Change Monitoring System",
    description: "Deploy advanced sensors and analytics for real-time environmental monitoring and climate impact assessment.",
    deadline: "2025-10-01",
    phase1Budget: 3000000,
    publicBenefit: "Environmental Protection",
    status: "Active"
  }
];

const demoProposals = [
  {
    id: 1,
    title: "SmartCity Hub by Rocket Internet",
    challenge: { title: "Smart City Infrastructure Development" },
    status: "UNDER_REVIEW",
    submittedBy: "Rocket Internet",
    score: 4.7,
    submittedAt: "2025-01-18"
  },
  {
    id: 2,
    title: "HealthLink Platform by eFounders",
    challenge: { title: "Digital Health Records Integration" },
    status: "PENDING",
    submittedBy: "eFounders",
    score: 4.5,
    submittedAt: "2025-01-16"
  },
  {
    id: 3,
    title: "ClimateWatch by Founders Factory",
    challenge: { title: "Climate Change Monitoring System" },
    status: "APPROVED",
    submittedBy: "Founders Factory",
    score: 4.9,
    submittedAt: "2025-01-14"
  }
];

const demoProjects = [
  {
    id: 1,
    investment: 2000000,
    milestones: ["System Design", "Pilot Deployment", "City-wide Rollout"],
    challenge: { title: "Smart City Infrastructure Development" },
    progress: 35,
    status: "In Progress",
    citizensImpacted: 500000
  },
  {
    id: 2,
    investment: 3000000,
    milestones: ["Sensor Network", "Data Analytics", "Public Dashboard"],
    challenge: { title: "Climate Change Monitoring System" },
    progress: 60,
    status: "On Track",
    citizensImpacted: 1200000
  }
];

const demoPartners = {
  partners: [
    {
      id: 1,
      name: "Founders Factory",
      description: "Corporate-backed startup studio building solutions for societal challenges.",
      website: "https://foundersfactory.com",
      location: "London, UK",
      rating: 4.8,
      specialization: "GovTech Solutions"
    },
    {
      id: 2,
      name: "Public Digital",
      description: "Specialized in digital transformation for public sector organizations.",
      website: "https://public.digital",
      location: "Global",
      rating: 4.9,
      specialization: "Digital Government"
    }
  ]
};

export default function GovernmentDashboard(props: GovernmentDashboardProps) {
  const { governmentId, organizationName } = props;
  const [activeTab, setActiveTab] = useState("challenges");
  
  const { data: challenges } = useGovernmentChallenges(governmentId);
  const { data: proposals } = useGovernmentProposals(governmentId);
  const { data: projects } = useGovernmentProjects(governmentId);
  const { data: partners } = useGovernmentPartners(governmentId);

  // Use demo data if database is empty
  const displayChallenges = challenges?.length ? challenges : demoChallenges;
  const displayProposals = proposals?.length ? proposals : demoProposals;
  const displayProjects = projects?.length ? projects : demoProjects;
  const displayPartners = partners?.partners?.length ? partners : demoPartners;

  const tabs = [
    { id: "challenges", label: "Public Challenges", icon: Target, count: displayChallenges.length },
    { id: "proposals", label: "Proposals", icon: MessageSquare, count: displayProposals.length },
    { id: "projects", label: "Projects", icon: Building2, count: displayProjects.length },
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
      case 'in progress': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'on track': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalBudget = displayProjects.reduce((sum, p) => sum + (p.investment || 0), 0);
  const totalCitizensImpacted = displayProjects.reduce((sum, p) => sum + (p.citizensImpacted || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 -mx-16 -my-16 px-16 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {organizationName || "Government"} Dashboard
            </h1>
          </div>
          <p className="text-gray-600">
            Manage public innovation initiatives and partnerships for citizen benefit.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Public Challenges</p>
                <p className="text-2xl font-bold text-gray-900">{displayChallenges.length}</p>
              </div>
              <Target className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">{displayProjects.length}</p>
              </div>
              <Building2 className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Public Investment</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalBudget.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Citizens Impacted</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalCitizensImpacted.toLocaleString()}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
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
                      ? "border-indigo-500 text-indigo-600 bg-indigo-50"
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
                      {challenge.publicBenefit && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Target className="w-4 h-4" />
                          Focus: {challenge.publicBenefit}
                        </div>
                      )}
                    </div>
                    
                    <button className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
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
                        <span className="font-medium">Partner:</span> {proposal.submittedBy}
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
                      <h3 className="text-xl font-semibold text-gray-900">Public Project #{project.id}</h3>
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
                      
                      {project.citizensImpacted && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-gray-600">Citizens Impacted:</span>
                          <span className="text-sm font-bold text-blue-600">{project.citizensImpacted.toLocaleString()}</span>
                        </div>
                      )}
                      
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
                              className="bg-indigo-600 h-2 rounded-full transition-all" 
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
              {displayPartners.partners.map((partner: any) => (
                <div key={partner.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{partner.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      {partner.location && (
                        <p className="text-sm text-gray-500">📍 {partner.location}</p>
                      )}
                      {partner.specialization && (
                        <p className="text-sm text-gray-500">🎯 {partner.specialization}</p>
                      )}
                      {partner.rating && (
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-gray-600">Rating:</span>
                          <span className="text-sm font-bold text-emerald-600">{partner.rating}/5.0</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      {partner.website && (
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Visit Website
                        </a>
                      )}
                      <button
                        className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                        onClick={() => alert(`Partnership request sent to ${partner.name}`)}
                      >
                        Request Partnership
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
              <p className="text-gray-500">Secure communication with innovation partners and citizens.</p>
            </div>
          )}

          {activeTab === "calendar" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <CalendarDays className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Calendar Integration Coming Soon</h3>
              <p className="text-gray-500">Schedule public consultations and project milestones.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}