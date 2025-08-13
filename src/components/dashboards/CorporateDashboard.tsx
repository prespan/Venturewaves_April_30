"use client";
import { useState } from "react";
import { useRouter } from 'next/router';
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
  Plus,
} from "lucide-react";

import { useCorporateChallenges } from "@/hooks/useCorporateChallenges";
import { useCorporateProposals } from "@/hooks/useCorporateProposals";
import { useCorporateProjects } from "@/hooks/useCorporateProjects";
import { useCorporatePartners } from "@/hooks/useCorporatePartners";

interface CorporateDashboardProps {
  organizationName?: string;
  organizationId?: number;
  corporateId?: number;
}

export default function CorporateDashboard(props: CorporateDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("challenges");
  
  // Get corporateId from URL query parameter if not provided as prop
  const corporateIdFromUrl = router.query.id ? parseInt(router.query.id as string) : null;
  const corporateId = props.corporateId || corporateIdFromUrl;
  
  const { organizationName, organizationId } = props;
  
  const { data: challenges, loading: challengesLoading, error: challengesError } = useCorporateChallenges(corporateId!);
  const { data: proposals, error: proposalsError } = useCorporateProposals(corporateId!);
  const { data: projects, error: projectsError } = useCorporateProjects(corporateId!);
  const { data: partners, error: partnersError } = useCorporatePartners(corporateId!);

  // Use only real database data - no demo data fallback
  const displayChallenges = challenges || [];
  const displayProposals = proposals || [];
  const displayProjects = projects || [];
  const displayPartners = partners || { partners: [] };

  const handleManageChallenge = (challengeId: number) => {
    router.push(`/challenges/${challengeId}/manage`);
  };

  const tabs = [
    { id: "challenges", label: "Challenges", icon: FileText, count: displayChallenges.length },
    { id: "proposals", label: "Proposals", icon: MessageSquare, count: displayProposals.length },
    { id: "projects", label: "Projects", icon: Briefcase, count: displayProjects.length },
    { id: "partners", label: "Partners", icon: Users, count: displayPartners.partners.length },
  ];

  // Show loading state if we don't have a corporateId yet
  if (!corporateId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 -mx-16 -my-16 px-16 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading corporate dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 -mx-16 -my-16 px-16 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                {organizationName || "Corporate"} Dashboard
              </h1>
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <Plus className="w-5 h-5" />
              Create Challenge
            </button>
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
                <p className="text-2xl font-bold text-gray-900">$0</p>
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

        {/* Challenges Tab Content */}
        {activeTab === "challenges" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {displayChallenges.map((challenge: any) => (
              <div key={challenge.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">{challenge.title}</h3>
                    <span className="px-2 py-1 rounded-full text-xs font-medium border bg-emerald-100 text-emerald-800 border-emerald-200">
                      Active
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
                      Budget: ${challenge.phase1Budget?.toLocaleString() || 'N/A'}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <TrendingUp className="w-4 h-4" />
                      Equity: {challenge.equityOffered || 0}%
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleManageChallenge(challenge.id)}
                    className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Manage Challenge
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Other tabs content */}
        {activeTab === "proposals" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Proposals Yet</h3>
            <p className="text-gray-500">Proposals from studios will appear here once you have active challenges.</p>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Projects Yet</h3>
            <p className="text-gray-500">Active projects will appear here when proposals are approved and funded.</p>
          </div>
        )}

        {activeTab === "partners" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Partners Yet</h3>
            <p className="text-gray-500">Studio partners will appear here as you collaborate on challenges and projects.</p>
          </div>
        )}
      </div>
    </div>
  );
}