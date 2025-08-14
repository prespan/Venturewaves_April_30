"use client";

import { useState } from "react";
import { useRouter } from 'next/router';
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
  Plus,
  Target,
  Calendar,
  Mail,
} from "lucide-react";

import { useResearchChallenges } from "@/hooks/useResearchChallenges";
import { useResearchProposals } from "@/hooks/useResearchProposals";
import { useResearchProjects } from "@/hooks/useResearchProjects";
import { useResearchPartners } from "@/hooks/useResearchPartners";

interface ResearchDashboardProps {
  organizationName?: string;
  organizationId?: number;
  researchOrgId: number;
}

export default function ResearchDashboard(props: ResearchDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("challenges");
  
  // Get researchOrgId from URL query parameter if not provided as prop
  const researchOrgIdFromUrl = router.query.id ? parseInt(router.query.id as string) : null;
  const researchOrgId = props.researchOrgId || researchOrgIdFromUrl;
  
  const { organizationName, organizationId } = props;
  
  const { data: challenges, loading: challengesLoading, error: challengesError } = useResearchChallenges(researchOrgId!);
  const { data: proposals, error: proposalsError } = useResearchProposals(researchOrgId!);
  const { data: projects, error: projectsError } = useResearchProjects(researchOrgId!);
  const { data: partners, error: partnersError } = useResearchPartners(researchOrgId!);

  // Debug logging
  console.log('🔍 Research Dashboard Data:', {
    researchOrgId,
    challenges,
    proposals,
    projects,
    partners
  });

  // Use only real database data - no demo data fallback
  const displayChallenges = challenges || [];
  const displayProposals = proposals || [];
  const displayProjects = projects || [];
  // Fix partners data structure - handle both array and object with partners property
  const displayPartners = Array.isArray(partners) 
    ? partners 
    : (partners && typeof partners === 'object' && 'partners' in partners) 
      ? (partners as any).partners || []
      : [];

  // Calculate total funding from projects
  const totalFunding = displayProjects.reduce((sum: number, project: any) => sum + (project.investment || 0), 0);

  const handleManageChallenge = (challengeId: number) => {
    router.push(`/challenges/${challengeId}/manage`);
  };

  const handleReviewProposal = (proposalId: number) => {
    router.push(`/proposals/${proposalId}/review`);
  };

  const handleViewProject = (projectId: number) => {
    router.push(`/projects/${projectId}`);
  };

  const handleRequestPartnership = (partnerId: number) => {
    router.push(`/partners/${partnerId}/request`);
  };

  const tabs = [
    { id: "challenges", label: "Research Challenges", icon: Microscope, count: displayChallenges.length },
    { id: "proposals", label: "Proposals", icon: MessageSquare, count: displayProposals.length },
    { id: "projects", label: "Projects", icon: GraduationCap, count: displayProjects.length },
    { id: "partners", label: "Partners", icon: Users, count: displayPartners ? displayPartners.length : 0 },
    { id: "messages", label: "Messages", icon: Mail, count: 0 },
    { id: "calendar", label: "Calendar", icon: Calendar, count: 0 },
  ];

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'under_review': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'active': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'in progress': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'early stage': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'on track': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Show loading state if we don't have a researchOrgId yet
  if (!researchOrgId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 -mx-16 -my-16 px-16 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading research dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 -mx-16 -my-16 px-16 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-600 rounded-lg">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                {organizationName || "Research Organization"} Dashboard
              </h1>
            </div>
            
            <button 
              onClick={() => router.push(`/challenges/create?orgType=RESEARCH&orgId=${researchOrgId}&orgName=${organizationName || 'Research Organization'}`)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              Create Challenge
            </button>
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
                <p className="text-sm font-medium text-gray-600">Total Proposals</p>
                <p className="text-2xl font-bold text-gray-900">{displayProposals.length}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-600" />
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
                <p className="text-2xl font-bold text-gray-900">${totalFunding.toLocaleString()}</p>
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
        {activeTab === "challenges" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {displayChallenges.length > 0 ? displayChallenges.map((challenge: any) => (
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
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <DollarSign className="w-4 h-4" />
                      Funding: ${challenge.phase1Budget?.toLocaleString() || 'N/A'}
                    </div>
                    {challenge.researchArea && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Microscope className="w-4 h-4" />
                        Area: {challenge.researchArea}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <TrendingUp className="w-4 h-4" />
                      Equity: {challenge.equityOffered || 0}%
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleManageChallenge(challenge.id)}
                    className="w-full px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Manage Challenge
                  </button>
                </div>
              </div>
            )) : (
              <div className="col-span-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <Microscope className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Research Challenges Yet</h3>
                <p className="text-gray-500">Create your first research challenge to get started.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "proposals" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {displayProposals.length > 0 ? displayProposals.map((proposal: any) => (
              <div key={proposal.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{proposal.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(proposal.status)}`}>
                      {proposal.status?.replace('_', ' ') || 'Pending'}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Challenge:</span> {proposal.challenge?.title || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Research Partner:</span> {proposal.submittedBy || 'Unknown'}
                    </p>
                    {proposal.score && (
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-gray-600">Score:</span>
                        <span className="text-sm font-bold text-emerald-600">{proposal.score}/5.0</span>
                      </div>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => handleReviewProposal(proposal.id)}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Review Proposal
                  </button>
                </div>
              </div>
            )) : (
              <div className="col-span-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Proposals Yet</h3>
                <p className="text-gray-500">Proposals from research partners will appear here once you have active challenges.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "projects" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {displayProjects.length > 0 ? displayProjects.map((project: any) => (
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
                      <span className="font-medium">Challenge:</span> {project.challenge?.title || 'N/A'}
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
                    
                    {project.milestones && (
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
                    )}
                  </div>
                  
                  <button 
                    onClick={() => handleViewProject(project.id)}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            )) : (
              <div className="col-span-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Projects Yet</h3>
                <p className="text-gray-500">Active research projects will appear here when proposals are approved and funded.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "partners" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPartners && displayPartners.length > 0 ? displayPartners.map((partner: any) => (
              <div key={partner.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{partner.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {partner.address && (
                      <p className="text-sm text-gray-500">📍 {partner.address}</p>
                    )}
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
                      onClick={() => handleRequestPartnership(partner.id)}
                      className="w-full px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Request Partnership
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Partners Yet</h3>
                <p className="text-gray-500">Research partners will appear here as you collaborate on challenges and projects.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "messages" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Messages */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Messages</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    C
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">Cambridge Innovation</span>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-600">Research proposal for AI Medical Diagnosis challenge</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    M
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">MIT Technology Licensing</span>
                      <span className="text-xs text-gray-500">1 day ago</span>
                    </div>
                    <p className="text-sm text-gray-600">Update on Quantum Computing research project</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    S
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">Stanford Research Institute</span>
                      <span className="text-xs text-gray-500">3 days ago</span>
                    </div>
                    <p className="text-sm text-gray-600">Collaboration proposal for Energy Storage project</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                View All Messages
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Mail className="w-5 h-5 text-green-600" />
                  <span className="text-gray-900">Compose Message</span>
                </button>
                
                <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-900">Broadcast to Research Partners</span>
                </button>
                
                <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Microscope className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-900">Send Challenge Update</span>
                </button>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Research Communication Guidelines</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Include relevant research area and methodology</li>
                  <li>• Reference challenge specifications clearly</li>
                  <li>• Respond to partner inquiries within 24 hours</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "calendar" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 border-l-4 border-green-500 bg-green-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">AI Medical Diagnosis - Proposal Deadline</span>
                      <span className="text-xs text-gray-500">Tomorrow</span>
                    </div>
                    <p className="text-sm text-gray-600">Final research proposals due by 5:00 PM EST</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">Quarterly Research Review</span>
                      <span className="text-xs text-gray-500">Dec 15</span>
                    </div>
                    <p className="text-sm text-gray-600">Review all active research projects and partnerships</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 border-l-4 border-purple-500 bg-purple-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">Research Partnership Meeting</span>
                      <span className="text-xs text-gray-500">Dec 20</span>
                    </div>
                    <p className="text-sm text-gray-600">Monthly sync with Cambridge Innovation and MIT</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                View Full Calendar
              </button>
            </div>

            {/* Calendar Management */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Calendar Management</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Plus className="w-5 h-5 text-green-600" />
                  <span className="text-gray-900">Schedule Meeting</span>
                </button>
                
                <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-900">Set Challenge Deadline</span>
                </button>
                
                <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Target className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-900">Add Research Milestone</span>
                </button>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">This Month's Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">3</div>
                    <div className="text-xs text-gray-600">Deadlines</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">2</div>
                    <div className="text-xs text-gray-600">Meetings</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">1</div>
                    <div className="text-xs text-gray-600">Reviews</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">1</div>
                    <div className="text-xs text-gray-600">Launch</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}