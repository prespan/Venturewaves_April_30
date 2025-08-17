// src/components/StudioManageProposal.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import {
  ArrowLeft,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  Building2,
  FileText,
  MessageCircle,
  Edit3,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  Star,
  Activity,
  Target,
  Send,
  Trash2,
} from "lucide-react";

interface ProposalManageProps {
  proposalId: number;
  studioId: number;
}

export default function StudioManageProposal({ proposalId, studioId }: ProposalManageProps) {
  const router = useRouter();
  const [proposal, setProposal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [statusHistory, setStatusHistory] = useState<any[]>([]);

  console.log('StudioManageProposal props:', { proposalId, studioId });

  useEffect(() => {
    if (proposalId) {
      fetchProposal();
      fetchStatusHistory();
    }
  }, [proposalId]);

  const fetchProposal = async () => {
    try {
      console.log(`Fetching proposal ${proposalId}`);
      
      const response = await fetch(`/api/studio-proposals/${proposalId}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Proposal data loaded:', data);
      setProposal(data);
    } catch (error) {
      console.error('Error fetching proposal:', error);
      setProposal(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatusHistory = async () => {
    try {
      const response = await fetch(`/api/studio-proposal-history/${proposalId}`);
      if (response.ok) {
        const data = await response.json();
        setStatusHistory(data);
      }
    } catch (error) {
      console.error('Error fetching proposal history:', error);
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: Clock,
          message: 'Your proposal is under review'
        };
      case 'approved':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle,
          message: 'Congratulations! Your proposal has been approved'
        };
      case 'under_review':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: Eye,
          message: 'Your proposal is being evaluated by the review committee'
        };
      case 'rejected':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: XCircle,
          message: 'Your proposal was not selected for this challenge'
        };
      case 'withdrawn':
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: AlertCircle,
          message: 'You have withdrawn this proposal'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: FileText,
          message: 'Status unknown'
        };
    }
  };

  const handleWithdrawProposal = async () => {
    try {
      const response = await fetch(`/api/proposals/${proposalId}/withdraw`, {
        method: 'PATCH',
      });
      if (response.ok) {
        setProposal({ ...proposal, status: 'WITHDRAWN' });
        setShowWithdrawModal(false);
      }
    } catch (error) {
      console.error('Error withdrawing proposal:', error);
    }
  };

  const handleEditProposal = () => {
    router.push(`/studio/proposal/${proposalId}/edit`);
  };

  const formatCurrency = (cents: number): string => {
    if (!cents) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(cents / 100);
  };

  const canEdit = proposal?.status === 'PENDING' || proposal?.status === 'UNDER_REVIEW';
  const canWithdraw = proposal?.status !== 'APPROVED' && proposal?.status !== 'REJECTED' && proposal?.status !== 'WITHDRAWN';

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 -mx-16 -my-16 px-16 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading proposal details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 -mx-16 -my-16 px-16 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Proposal Not Found</h2>
            <p className="text-gray-600 mb-6">The proposal you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(proposal.status);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 -mx-16 -my-16 px-16 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to My Proposals
          </button>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="w-6 h-6 text-slate-600" />
                  <span className="text-sm font-medium text-gray-600">Proposal</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusInfo.color}`}>
                    <StatusIcon className="w-4 h-4 inline mr-1" />
                    {proposal.status?.replace('_', ' ') || 'Pending'}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{proposal.title}</h1>
                <p className="text-lg text-gray-600 mb-4">{proposal.description}</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-blue-800 text-sm">{statusInfo.message}</p>
                </div>
              </div>
              
              <div className="ml-6 flex flex-col gap-3">
                {canEdit && (
                  <button
                    onClick={handleEditProposal}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Proposal
                  </button>
                )}
                {canWithdraw && (
                  <button
                    onClick={() => setShowWithdrawModal(true)}
                    className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Withdraw
                  </button>
                )}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-slate-600" />
                  <span className="text-sm font-medium text-gray-600">Submitted</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{new Date(proposal.submittedAt).toLocaleDateString()}</p>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-slate-600" />
                  <span className="text-sm font-medium text-gray-600">Challenge</span>
                </div>
                <p className="text-sm font-bold text-gray-900">{proposal.challenge?.title}</p>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-5 h-5 text-slate-600" />
                  <span className="text-sm font-medium text-gray-600">Organization</span>
                </div>
                <p className="text-sm font-bold text-gray-900">{proposal.challenge?.owner?.name || 'Unknown'}</p>
              </div>
              
              {proposal.score && (
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-slate-600" />
                    <span className="text-sm font-medium text-gray-600">Score</span>
                  </div>
                  <p className="text-2xl font-bold text-emerald-600">{proposal.score}/5.0</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Challenge Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Challenge Overview</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Challenge Description</h3>
              <p className="text-gray-600 mb-4">{proposal.challenge?.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Budget: {formatCurrency(proposal.challenge?.phase1Budget || 0)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Equity: {proposal.challenge?.equityOffered || 0}%</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Deadline: {proposal.challenge?.deadline ? new Date(proposal.challenge.deadline).toLocaleDateString() : 'N/A'}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Organization</h3>
              <div className="flex items-start gap-3">
                {proposal.challenge?.owner?.logo && (
                  <img src={proposal.challenge.owner.logo} alt={proposal.challenge.owner.name} className="w-12 h-12 rounded-lg" />
                )}
                <div>
                  <p className="font-medium text-gray-900">{proposal.challenge?.owner?.name}</p>
                  <p className="text-sm text-gray-600">{proposal.challenge?.owner?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Plan */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Action Plan</h2>
          <div className="space-y-4">
            {proposal.actionPlan && Array.isArray(proposal.actionPlan) && proposal.actionPlan.length > 0 ? (
              proposal.actionPlan.map((phase: string, index: number) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-slate-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{phase}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No action plan details available.</p>
            )}
          </div>
        </div>

        {/* Status History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Status History</h2>
          <div className="space-y-4">
            {statusHistory.length > 0 ? statusHistory.map((entry: any, index: number) => (
              <div key={index} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                <div className={`p-2 rounded-full ${getStatusInfo(entry.status).color}`}>
                  <Activity className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900">{entry.status.replace('_', ' ')}</p>
                    <span className="text-sm text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{entry.note || 'Status updated'}</p>
                  {entry.reviewer && (
                    <p className="text-gray-500 text-xs mt-1">By: {entry.reviewer}</p>
                  )}
                </div>
              </div>
            )) : (
              <div className="text-center py-6">
                <Activity className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No status history available</p>
              </div>
            )}
          </div>
        </div>

        {/* Feedback & Comments */}
        {proposal.feedback && Array.isArray(proposal.feedback) && proposal.feedback.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Reviewer Feedback</h2>
            <div className="space-y-4">
              {proposal.feedback.map((comment: any, index: number) => (
                <div key={index} className="border-l-4 border-slate-200 pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-900">{comment.reviewer || 'Anonymous Reviewer'}</p>
                    <span className="text-sm text-gray-500">{new Date(comment.timestamp).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                  {comment.rating && (
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">Rating: {comment.rating}/5</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => router.push(`/studio/challenge/${proposal.challengeId}`)}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Eye className="w-5 h-5" />
              View Challenge
            </button>
            
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>
            
            <button
              onClick={() => router.push(`/messages/new?to=${proposal.challenge?.owner?.id}&subject=Regarding Proposal: ${proposal.title}`)}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Contact Owner
            </button>
          </div>

          {proposal.status === 'APPROVED' && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-900">Next Steps</span>
              </div>
              <p className="text-green-800 text-sm mb-3">
                Congratulations! Your proposal has been approved. You should receive further instructions about project initiation within 2-3 business days.
              </p>
              <button
                onClick={() => router.push(`/studio/project/create?proposalId=${proposal.id}`)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                Start Project Setup
              </button>
            </div>
          )}
        </div>

        {/* Withdraw Modal */}
        {showWithdrawModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-100 rounded-full">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Withdraw Proposal</h3>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Are you sure you want to withdraw this proposal? This action cannot be undone, and you will not be able to resubmit for this challenge.
                </p>
                
                <div className="flex gap-3">
                  <button
                    onClick={handleWithdrawProposal}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Yes, Withdraw
                  </button>
                  <button
                    onClick={() => setShowWithdrawModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}