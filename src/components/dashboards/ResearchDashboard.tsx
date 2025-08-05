"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  CalendarDays,
  MessageSquare,
  DollarSign,
  Clock,
  TrendingUp,
  ExternalLink,
  CheckCircle,
  Microscope,
  GraduationCap,
} from "lucide-react";

import { useResearchChallenges } from "@/hooks/useResearchChallenges";
import { useResearchProposals } from "@/hooks/useResearchProposals";
import { useResearchProjects } from "@/hooks/useResearchProjects";
import { useResearchPartners } from "@/hooks/useResearchPartners";

interface ResearchDashboardProps {
  organizationName?: string;
  researchOrgId: number;
}

// Demo data for Research Organization
const demoChallenges = [
  {
    id: 1,
    title: "AI-Powered Medical Diagnosis System",
    description: "Develop machine learning algorithms for early disease detection using medical imaging and patient data analysis.",
    deadline: "2025-09-30",
    phase1Budget: 1800000,
    equityOffered: 10,
    researchArea: "Healthcare AI",
    status: "Active"
  },
  {
    id: 2,
    title: "Sustainable Energy Storage Solutions",
    description: "Research next-generation battery technologies for renewable energy grid storage and electric vehicle applications.",
    deadline: "2025-10-15",
    phase1Budget: 2500000,
    equityOffered: 15,
    researchArea: "Clean Energy",
    status: "Active"
  },
  {
    id: 3,
    title: "Quantum Computing Applications",
    description: "Explore practical quantum computing solutions for cryptography, optimization, and scientific simulation.",
    deadline: "2025-11-01",
    phase1Budget: 3500000,
    equityOffered: 20,
    researchArea: "Quantum Tech",
    status: "Active"
  }
];

const demoProposals = [
  {
    id: 1,
    title: "MedAI Diagnostics by DeepMind Ventures",
    challenge: { title: "AI-Powered Medical Diagnosis System" },
    status: "UNDER_REVIEW",
    submittedBy: "DeepMind Ventures",
    score: 4.8,
    submittedAt: "2025-01-20"
  },
  {
    id: 2,
    title: "GridBattery by Tesla Research",
    challenge: { title: "Sustainable Energy Storage Solutions" },
    status: "PENDING",
    submittedBy: "Tesla Research",
    score: 4.6,
    submittedAt: "2025-01-18"
  },
  {
    id: 3,
    title: "QuantumSolve by IBM Quantum",
    challenge: { title: "Quantum Computing Applications" },
    status: "APPROVED",
    submittedBy: "IBM Quantum",
    score: 4.9,
    submittedAt: "2025-01-16"
  }
];

const demoProjects = [
  {
    id: 1,
    investment: 1800000,
    milestones: ["Literature Review", "Algorithm Development", "Clinical Testing", "Validation"],
    challenge: { title: "AI-Powered Medical Diagnosis System" },
    progress: 45,
    status: "In Progress",
    researchPhase: "Development"
  },
  {
    id: 2,
    investment: 3500000,
    milestones: ["Theoretical Framework", "Proof of Concept", "Implementation", "Testing"],
    challenge: { title: "Quantum Computing Applications" },
    progress: 25,
    status: "Early Stage",
    researchPhase: "Research"
  }
];

const demoPartners = {
  partners: [
    {
      id: 1,
      name: "Cambridge Innovation",
      description: "Leading university research commercialization and technology transfer organization.",
      website: "https://cambridge-innovation.com",
      location: "Cambridge, UK",
      rating: 4.9,
      specialization: "Research Commercialization"
    },
    {
      id: 2,
      name: "MIT Technology Licensing",
      description: "Pioneering technology transfer and startup incubation for breakthrough research.",
      website: "https://tlo.mit.edu",
      location: "Boston, USA",
      rating: 4.8,
      specialization: "Deep Tech Transfer"
    }
  ]
};

export default function ResearchDashboard(props: ResearchDashboardProps) {
  const { researchOrgId, organizationName } = props;
  const [activeTab, setActiveTab] = useState("challenges");
  
  const { data: challenges } = useResearchChallenges(researchOrgId);
  const { data: proposals } = useResearchProposals(researchOrgId);
  const { data: projects } = useResearchProjects(researchOrgId);
  const { data: partners } = useResearchPartners(researchOrgId);

  // Use demo data if database is empty
  const displayChallenges = challenges?.length ? challenges : demoChallenges;
  const displayProposals = proposals?.length ? proposals : demoProposals;
  const displayProjects = projects?.length ? projects : demoProjects;
  const displayPartners = partners?.partners?.length ? partners : demoPartners;

  const tabs = [
    { id: "challenges", label: "Research Challenges", icon: Microscope, count: displayChallenges.length },
    { id: "proposals", label: "Proposals", icon: MessageSquare, count: displayProposals.length },
    { id: "projects", label: "Projects", icon: GraduationCap, count: displayProjects.length },
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
      case 'early stage': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalFunding = displayProjects.reduce((sum, p) => sum + (p.investment || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 -mx-16 -my-16 px-16 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-600 rounded-lg">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {organizationName || "Research Organization"} Dashboard
            </h1>
          </div>
          <p className="text-gray-600">
            Advancing scientific research through innovative partnerships and breakthrough technologies.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Research Challenges</p>
                <p className="text-2xl font-bold text-gray-900">{displayChallenges.length}</p>
              </div>
              <Microscope className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">{displayProjects.length}</p>
              </div>
              <GraduationCap className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Research Funding</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalFunding.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Research Partners</p>
                <p className="text-2xl font-bold text-gray-900">{displayPartners.partners.length}</p>
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
                      ? "border-green-500 text-green-600 bg-green-50"
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
                          Funding: ${challenge.phase1Budget.toLocaleString()}
                        </div>
                      )}
                      {challenge.researchArea && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Microscope className="w-4 h-4" />
                          Area: {challenge.researchArea}
                        </div>
                      )}
                      {challenge.equityOffered && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <TrendingUp className="w-4 h-4" />
                          Equity: {challenge.equityOffered}%
                        </div>
                      )}
                    </div>
                    
                    <button className="w-full px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
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
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${getStatusColor(proposal.status)}`}>
                        {proposal.status.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Challenge:</span> {proposal.challenge?.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Research Partner:</span> {proposal.submittedBy}
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
                      <h3 className="text-xl font-semibold text-gray-900">Research Project #{project.id}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status || 'active')}`}>
                        {project.status || 'Active'}
                      </span>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-medium text-gray-600">Funding:</span>
                        <span className="text-lg font-bold text-emerald-600">${(project.investment || 0).toLocaleString()}</span>
                      </div>
                      
                      {project.researchPhase && (
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium text-gray-600">Phase:</span>
                          <span className="text-sm font-bold text-purple-600">{project.researchPhase}</span>
                        </div>
                      )}
                      
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Research Area:</span> {project.challenge?.title}
                      </p>
                      
                      {project.progress && (
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-gray-600">Progress</span>
                            <span className="text-gray-600">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full transition-all" 
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
                      View Research Details
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
                        <p className="text-sm text-gray-500">🧪 {partner.specialization}</p>
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
                          className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Visit Website
                        </a>
                      )}
                      <button
                        className="w-full px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                        onClick={() => alert(`Research collaboration request sent to ${partner.name}`)}
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Research Messaging Coming Soon</h3>
              <p className="text-gray-500">Collaborate with research partners and academic institutions.</p>
            </div>
          )}

          {activeTab === "calendar" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <CalendarDays className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Research Calendar Coming Soon</h3>
              <p className="text-gray-500">Track research milestones, conferences, and collaboration meetings.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}