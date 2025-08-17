"use client";
import { useState } from "react";
import { useRouter } from 'next/router';
import {
  Rocket,
  FileText,
  Users,
  CalendarDays,
  MessageSquare,
  DollarSign,
  Clock,
  TrendingUp,
  ExternalLink,
  CheckCircle,
  Plus,
  Target,
  Calendar,
  Mail,
  Lightbulb,
  Search,
  Eye,
} from "lucide-react";

import { useStudioChallenges } from "@/hooks/useStudioChallenges";
import { useStudioProposals } from "@/hooks/useStudioProposals";
import { useStudioProjects } from "@/hooks/useStudioProjects";
import { useStudioPartners } from "@/hooks/useStudioPartners";

interface StudioDashboardProps {
  organizationName?: string;
  organizationId?: number;
  studioId: number;
}

export default function StudioDashboard(props: StudioDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("challenges");
  
  // Get studioId from URL query parameter if not provided as prop
  const studioIdFromUrl = router.query.id ? parseInt(router.query.id as string) : null;
  const studioId = props.studioId || studioIdFromUrl;
  
  const { organizationName, organizationId } = props;
  
  const { data: challenges, loading: challengesLoading, error: challengesError } = useStudioChallenges(studioId!);
  const { data: proposals, error: proposalsError } = useStudioProposals(studioId!);
  const { data: projects, error: projectsError } = useStudioProjects(studioId!);
  const { data: partners, error: partnersError } = useStudioPartners(studioId!);

  // Debug logging
  console.log('🔍 Studio Dashboard Data:', {
    studioId,
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

  // Calculate total investment from projects
  const totalInvestment = displayProjects.reduce((sum: number, project: any) => sum + (project.investment || 0), 0);

  const handleViewChallenge = (challengeId: number) => {
    // Store current studioId for the challenge page
    if (studioId) {
      localStorage.setItem('studioId', studioId.toString());
    }
    router.push(`/studio/challenge/${challengeId}`);
  };

  const handleManageProposal = (proposalId: number) => {
    // Store current studioId for the proposal page
    if (studioId) {
      localStorage.setItem('studioId', studioId.toString());
    }
    router.push(`/studio/proposal/${proposalId}`);
  };

  const handleViewProject = (projectId: number) => {
    router.push(`/projects/${projectId}`);
  };

  const handleRequestPartnership = (partnerId: number, partnerType: string) => {
    router.push(`/partners/${partnerId}/request`);
  };

  const tabs = [
    { id: "challenges", label: "Challenges", icon: Search, count: displayChallenges.length },
    { id: "proposals", label: "My Proposals", icon: Lightbulb, count: displayProposals.length },
    { id: "projects", label: "Projects", icon: Rocket, count: displayProjects.length },
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
      case 'starting': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'submitted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'saved': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getChallengeStatusText = (challenge: any) => {
    if (challenge.hasSubmittedProposal) {
      return challenge.proposalStatus === 'APPROVED' ? 'Approved' :
             challenge.proposalStatus === 'UNDER_REVIEW' ? 'Under Review' :
             challenge.proposalStatus === 'PENDING' ? 'Pending' : 
             challenge.proposalStatus === 'REJECTED' ? 'Rejected' : 'Submitted';
    }
    return new Date(challenge.deadline) < new Date() ? 'Expired' : 'Open';
  };

  // Show loading state if we don't have a studioId yet
  if (!studioId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 -mx-16 -my-16 px-16 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading studio dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 -mx-16 -my-16 px-16 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-600 rounded-lg">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                {organizationName || "Studio"} Dashboard
              </h1>
            </div>
            
            <button 
              onClick={() => router.push(`/opportunities`)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              Browse New Opportunities
            </button>
          </div>
          <p className="text-gray-600">
            Discover innovation challenges, manage your proposals, and track active projects.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Challenges</p>
                <p className="text-2xl font-bold text-gray-900">{displayChallenges.filter((c: any) => !c.hasSubmittedProposal && new Date(c.deadline) > new Date()).length}</p>
              </div>
              <Search className="w-8 h-8 text-slate-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Proposals</p>
                <p className="text-2xl font-bold text-gray-900">{displayProposals.filter((p: any) => p.status !== 'REJECTED').length}</p>
              </div>
              <Lightbulb className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Projects</p>
                <p className="text-2xl font-bold text-gray-900">{displayProjects.length}</p>
              </div>
              <Rocket className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Project Value</p>
                <p className="text-2xl font-bold text-gray-900">${(totalInvestment / 100).toLocaleString()}</p>
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
        {activeTab === "challenges" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {displayChallenges.length > 0 ? displayChallenges.map((challenge: any) => (
              <div key={challenge.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">{challenge.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(challenge.hasSubmittedProposal ? challenge.proposalStatus?.toLowerCase() : (new Date(challenge.deadline) < new Date() ? 'expired' : 'open'))}`}>
                      {getChallengeStatusText(challenge)}
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
                      Budget: ${(challenge.phase1Budget / 100)?.toLocaleString() || 'N/A'}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <TrendingUp className="w-4 h-4" />
                      Equity: {challenge.equityOffered || 0}%
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      From: {challenge.owner?.name || challenge.submittedBy || 'Unknown'}
                    </div>
                  </div>
                  
                  {challenge.hasSubmittedProposal ? (
                    <button 
                      onClick={() => handleViewChallenge(challenge.id)}
                      className="w-full px-4 py-2 bg-slate-600 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      Review Challenge
                    </button>
                  ) : new Date(challenge.deadline) < new Date() ? (
                    <button 
                      disabled
                      className="w-full px-4 py-2 bg-gray-300 text-gray-500 text-sm font-medium rounded-lg cursor-not-allowed"
                    >
                      Challenge Expired
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleViewChallenge(challenge.id)}
                      className="w-full px-4 py-2 bg-slate-600 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      Review Challenge
                    </button>
                  )}
                </div>
              </div>
            )) : (
              <div className="col-span-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Challenges Available</h3>
                <p className="text-gray-500">Browse available challenges and find opportunities that match your expertise.</p>
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
                  
                  <p className="text-gray-600 text-sm mb-4">{proposal.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Challenge:</span> {proposal.challenge?.title || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Submitted to:</span> {proposal.challenge?.owner || 'Unknown'}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Submitted:</span> {new Date(proposal.submittedAt).toLocaleDateString()}
                    </p>
                    {proposal.score && (
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-gray-600">Score:</span>
                        <span className="text-sm font-bold text-emerald-600">{proposal.score}/5.0</span>
                      </div>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => handleManageProposal(proposal.id)}
                    className="w-full px-4 py-2 bg-slate-600 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    Manage Proposal
                  </button>
                </div>
              </div>
            )) : (
              <div className="col-span-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Proposals Yet</h3>
                <p className="text-gray-500">Submit your first proposal to an interesting challenge to get started.</p>
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
                    <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status || 'active')}`}>
                      {project.status || 'Active'}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-medium text-gray-600">Investment:</span>
                      <span className="text-lg font-bold text-emerald-600">${((project.investment || 0) / 100).toLocaleString()}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Challenge:</span> {project.challenge?.title || 'N/A'}
                    </p>
                    
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Partner:</span> {project.challenge?.owner || 'Unknown'}
                    </p>
                    
                    {project.progress !== undefined && (
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
                    
                    {project.collaborators && project.collaborators.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Collaborators</p>
                        <p className="text-sm text-gray-600">{project.collaborators.join(', ')}</p>
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
                    View Project Details
                  </button>
                </div>
              </div>
            )) : (
              <div className="col-span-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <Rocket className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Projects</h3>
                <p className="text-gray-500">Active projects will appear here when your proposals are approved and funded.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "partners" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPartners && displayPartners.length > 0 ? displayPartners.map((partner: any) => (
              <div key={`${partner.type}_${partner.id}`} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {partner.logo && (
                      <img src={partner.logo} alt={partner.name} className="w-12 h-12 rounded-lg mr-4" />
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{partner.name}</h3>
                      <p className="text-sm text-gray-600">{partner.type}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Relationship:</span> {partner.relationship}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Projects:</span> {partner.projectsCount} collaboration{partner.projectsCount !== 1 ? 's' : ''}
                    </p>
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
                      onClick={() => handleRequestPartnership(partner.id, partner.type)}
                      className="w-full px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors"
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
                <p className="text-gray-500">Partner organizations will appear here as you collaborate on challenges and projects.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "messages" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Messages</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    T
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">Tesla Inc.</span>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-600">We are impressed with your AI-VisionGuard proposal. Would you like to schedule a technical review meeting?</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    D
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">US Department of Energy</span>
                      <span className="text-xs text-gray-500">1 day ago</span>
                    </div>
                    <p className="text-sm text-gray-600">Thank you for the opportunity. We have submitted our proposal for the Smart Grid project and are available for any questions.</p>
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
                    <p className="text-sm text-gray-600">Your QuantumBridge proposal aligns perfectly with our research goals. Let's discuss potential collaboration.</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                View All Messages
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Mail className="w-5 h-5 text-slate-600" />
                  <span className="text-gray-900">Compose Message</span>
                </button>
                
                <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-900">Contact Challenge Owners</span>
                </button>
                
                <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-900">Send Proposal Update</span>
                </button>
              </div>

              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <h4 className="font-medium text-slate-900 mb-2">Communication Guidelines</h4>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Keep messages professional and clear</li>
                  <li>• Include relevant proposal/project references</li>
                  <li>• Respond to partner inquiries promptly</li>
                  <li>• Maintain confidentiality when required</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "calendar" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 border-l-4 border-slate-500 bg-slate-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-slate-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">Autonomous Vehicle Safety - Proposal Deadline</span>
                      <span className="text-xs text-gray-500">Tomorrow</span>
                    </div>
                    <p className="text-sm text-gray-600">Final submissions due by 5:00 PM EST</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">AI-VisionGuard Project Review</span>
                      <span className="text-xs text-gray-500">Dec 15</span>
                    </div>
                    <p className="text-sm text-gray-600">Technical review meeting with Tesla engineering team</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 border-l-4 border-purple-500 bg-purple-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">QuantumBridge Demo Day</span>
                      <span className="text-xs text-gray-500">Dec 20</span>
                    </div>
                    <p className="text-sm text-gray-600">Present prototype to Stanford Research Institute</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                View Full Calendar
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Calendar Management</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Plus className="w-5 h-5 text-slate-600" />
                  <span className="text-gray-900">Schedule Meeting</span>
                </button>
                
                <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-900">Set Proposal Deadline</span>
                </button>
                
                <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Target className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-900">Add Project Milestone</span>
                </button>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">This Month's Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-slate-600">3</div>
                    <div className="text-xs text-gray-600">Deadlines</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">5</div>
                    <div className="text-xs text-gray-600">Meetings</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">2</div>
                    <div className="text-xs text-gray-600">Reviews</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">1</div>
                    <div className="text-xs text-gray-600">Demo</div>
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