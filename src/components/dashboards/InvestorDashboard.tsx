"use client";

import { useState } from "react";
import {
  TrendingUp,
  FileText,
  Users,
  CalendarDays,
  MessageSquare,
  DollarSign,
  Clock,
  Target,
  ExternalLink,
  CheckCircle,
  PieChart,
  BarChart3,
  Briefcase,
} from "lucide-react";

import { useInvestorChallenges } from "@/hooks/useInvestorChallenges";
import { useInvestorInvestments } from "@/hooks/useInvestorInvestments";
import { useInvestorPortfolio } from "@/hooks/useInvestorPortfolio";
import { useInvestorOpportunities } from "@/hooks/useInvestorOpportunities";

interface InvestorDashboardProps {
  organizationName?: string;
  investorId: number;
}

// Demo data for Investor
const demoOpportunities = [
  {
    id: 1,
    title: "FinTech AI Analytics Platform",
    description: "Revolutionary AI-powered financial analytics platform targeting institutional investors and trading firms.",
    stage: "Series A",
    valuation: 15000000,
    seeking: 3000000,
    equity: 20,
    sector: "FinTech",
    team: "Ex-Goldman Sachs, MIT PhDs",
    traction: "$500K ARR, 15% MoM growth"
  },
  {
    id: 2,
    title: "GreenTech Carbon Capture",
    description: "Scalable carbon capture technology for industrial applications with proven environmental impact.",
    stage: "Seed",
    valuation: 8000000,
    seeking: 2000000,
    equity: 25,
    sector: "CleanTech",
    team: "Stanford Engineers, Industry Veterans",
    traction: "3 pilot programs, $200K revenue"
  },
  {
    id: 3,
    title: "HealthTech Diagnostics",
    description: "AI-powered diagnostic platform reducing healthcare costs and improving patient outcomes.",
    stage: "Pre-Series A",
    valuation: 12000000,
    seeking: 2500000,
    equity: 20,
    sector: "HealthTech",
    team: "Medical researchers, Top-tier VCs",
    traction: "FDA approval pending, 50+ hospitals"
  }
];

const demoInvestments = [
  {
    id: 1,
    company: "DataFlow Analytics",
    sector: "FinTech",
    stage: "Series A",
    invested: 500000,
    equity: 5,
    valuation: 10000000,
    currentValue: 750000,
    roi: 50,
    status: "Active"
  },
  {
    id: 2,
    company: "CleanEnergy Solutions",
    sector: "CleanTech",
    stage: "Seed",
    invested: 250000,
    equity: 8,
    valuation: 3000000,
    currentValue: 400000,
    roi: 60,
    status: "Growing"
  },
  {
    id: 3,
    company: "MedTech Innovations",
    sector: "HealthTech",
    stage: "Series B",
    invested: 1000000,
    equity: 3,
    valuation: 30000000,
    currentValue: 1200000,
    roi: 20,
    status: "Mature"
  }
];

const demoPortfolio = [
  {
    id: 1,
    company: "TechFlow Corp",
    sector: "SaaS",
    invested: 800000,
    currentValue: 1200000,
    equity: 6,
    lastUpdate: "2025-01-15",
    performance: "Exceeding"
  },
  {
    id: 2,
    company: "BioInnovate",
    sector: "Biotech",
    invested: 1500000,
    currentValue: 2100000,
    equity: 4,
    lastUpdate: "2025-01-10",
    performance: "Strong"
  }
];

const demoChallenges = [
  {
    id: 1,
    title: "Next-Gen Battery Technology",
    description: "Seeking breakthrough battery solutions for electric vehicles and renewable energy storage.",
    budget: 5000000,
    deadline: "2025-10-01",
    applicants: 12,
    status: "Open"
  },
  {
    id: 2,
    title: "AI-Driven Supply Chain",
    description: "Revolutionary AI solutions for global supply chain optimization and predictive logistics.",
    budget: 3000000,
    deadline: "2025-09-15",
    applicants: 8,
    status: "Reviewing"
  }
];

export default function InvestorDashboard(props: InvestorDashboardProps) {
  const { investorId, organizationName } = props;
  const [activeTab, setActiveTab] = useState("opportunities");
  
  const { data: challenges } = useInvestorChallenges(investorId);
  const { data: investments } = useInvestorInvestments(investorId);
  const { data: portfolio } = useInvestorPortfolio(investorId);
  const { data: opportunities } = useInvestorOpportunities(investorId);

  // Use demo data if database is empty
  const displayChallenges = challenges?.length ? challenges : demoChallenges;
  const displayInvestments = investments?.length ? investments : demoInvestments;
  const displayPortfolio = portfolio?.length ? portfolio : demoPortfolio;
  const displayOpportunities = opportunities?.length ? opportunities : demoOpportunities;

  const tabs = [
    { id: "opportunities", label: "Deal Flow", icon: Target, count: displayOpportunities.length },
    { id: "investments", label: "Recent Investments", icon: TrendingUp, count: displayInvestments.length },
    { id: "portfolio", label: "Portfolio", icon: PieChart, count: displayPortfolio.length },
    { id: "challenges", label: "Investment Challenges", icon: Briefcase, count: displayChallenges.length },
    { id: "messages", label: "Messages", icon: MessageSquare, count: 0 },
    { id: "calendar", label: "Calendar", icon: CalendarDays, count: 0 },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-green-100 text-green-800 border-green-200';
      case 'reviewing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'active': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'growing': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'mature': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'exceeding': return 'bg-green-100 text-green-800 border-green-200';
      case 'strong': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalInvested = displayInvestments.reduce((sum, inv) => sum + (inv.invested || 0), 0);
  const totalValue = displayInvestments.reduce((sum, inv) => sum + (inv.currentValue || 0), 0);
  const avgROI = displayInvestments.length > 0 
    ? displayInvestments.reduce((sum, inv) => sum + (inv.roi || 0), 0) / displayInvestments.length 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 -mx-16 -my-16 px-16 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-600 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {organizationName || "Investor"} Dashboard
            </h1>
          </div>
          <p className="text-gray-600">
            Track investments, discover opportunities, and manage your innovation portfolio.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Invested</p>
                <p className="text-2xl font-bold text-gray-900">${totalInvested.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Portfolio Value</p>
                <p className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
              </div>
              <PieChart className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average ROI</p>
                <p className="text-2xl font-bold text-gray-900">{avgROI.toFixed(1)}%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Deals</p>
                <p className="text-2xl font-bold text-gray-900">{displayOpportunities.length}</p>
              </div>
              <Target className="w-8 h-8 text-orange-600" />
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
                      ? "border-emerald-500 text-emerald-600 bg-emerald-50"
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
          {activeTab === "opportunities" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayOpportunities.map((opportunity: any) => (
                <div key={opportunity.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 leading-tight">{opportunity.title}</h3>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 flex-shrink-0">
                        {opportunity.stage}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{opportunity.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <DollarSign className="w-4 h-4" />
                        Seeking: ${opportunity.seeking?.toLocaleString()} ({opportunity.equity}% equity)
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <TrendingUp className="w-4 h-4" />
                        Valuation: ${opportunity.valuation?.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Target className="w-4 h-4" />
                        Sector: {opportunity.sector}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        Team: {opportunity.team}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-600 mb-1">Traction:</p>
                      <p className="text-xs text-gray-500">{opportunity.traction}</p>
                    </div>
                    
                    <button className="w-full px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors">
                      Review Deal
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "investments" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayInvestments.map((investment: any) => (
                <div key={investment.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{investment.company}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${getStatusColor(investment.status)}`}>
                        {investment.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Sector:</span> {investment.sector}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Stage:</span> {investment.stage}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Invested:</span> ${investment.invested?.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Current Value:</span> ${investment.currentValue?.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Equity:</span> {investment.equity}%
                      </p>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-gray-600">ROI:</span>
                        <span className={`text-sm font-bold ${investment.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {investment.roi > 0 ? '+' : ''}{investment.roi}%
                        </span>
                      </div>
                    </div>
                    
                    <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                      View Investment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "portfolio" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {displayPortfolio.map((company: any) => (
                <div key={company.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{company.company}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${getStatusColor(company.performance)}`}>
                        {company.performance}
                      </span>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-medium text-gray-600">Invested:</span>
                        <span className="text-lg font-bold text-emerald-600">${company.invested?.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-gray-600">Current Value:</span>
                        <span className="text-lg font-bold text-purple-600">${company.currentValue?.toLocaleString()}</span>
                      </div>
                      
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Sector:</span> {company.sector}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Equity:</span> {company.equity}%
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Last Update:</span> {new Date(company.lastUpdate).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                      Portfolio Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "challenges" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayChallenges.map((challenge: any) => (
                <div key={challenge.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 leading-tight">{challenge.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${getStatusColor(challenge.status)}`}>
                        {challenge.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <DollarSign className="w-4 h-4" />
                        Budget: ${challenge.budget?.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        Deadline: {new Date(challenge.deadline).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        Applicants: {challenge.applicants}
                      </div>
                    </div>
                    
                    <button className="w-full px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors">
                      Manage Challenge
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "messages" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Investment Communications Coming Soon</h3>
              <p className="text-gray-500">Secure messaging with portfolio companies and deal flow partners.</p>
            </div>
          )}

          {activeTab === "calendar" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <CalendarDays className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Investment Calendar Coming Soon</h3>
              <p className="text-gray-500">Track board meetings, due diligence, and portfolio updates.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}