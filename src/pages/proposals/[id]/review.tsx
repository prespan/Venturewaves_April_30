// pages/proposals/[id]/review.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ProposalReviewPage() {
  const router = useRouter();
  const { id } = router.query;
  const [proposal, setProposal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🚀 Current port:', window.location.port);
    console.log('🚀 Will call API:', `/api/proposal-details/${id}`);
    console.log('🚀 ID value:', id, 'Type:', typeof id);
    
    if (!id) {
      console.log('❌ No ID found, returning early');
      return;
    }

    async function fetchProposal() {
      try {
        setLoading(true);
        const apiUrl = `/api/proposal-details/${id}`;
        console.log('📡 Making fetch request to:', apiUrl);
        
        const response = await fetch(apiUrl);
        console.log('📡 Response status:', response.status);
        console.log('📡 Response OK:', response.ok);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ API Error Response:', errorText);
          throw new Error(`Failed to fetch proposal: ${response.status}`);
        }
        
        const proposalData = await response.json();
        console.log('✅ Proposal data loaded:', proposalData);
        setProposal(proposalData);
        
      } catch (err) {
        console.error('❌ Error loading proposal:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchProposal();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Proposal Not Found</h1>
          <p className="text-gray-600 mb-4">{error || 'The proposal you are looking for does not exist.'}</p>
          <button 
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            ← Back to Dashboard
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Review Proposal</h1>
              <p className="text-gray-600 mt-1">Proposal ID: #{proposal.id} • {proposal.studio?.name || proposal.submittedBy}</p>
            </div>
            <div className="flex gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                proposal.status === 'Approved' ? 'bg-green-100 text-green-800' :
                proposal.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                proposal.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {proposal.status}
              </span>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Actions
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Proposal Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Proposal Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Title</label>
                  <p className="text-lg font-medium text-gray-900">{proposal.title}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Description</label>
                  <p className="text-gray-700">{proposal.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tech Stack</label>
                    <p className="text-gray-900">{proposal.techStack}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Timeline</label>
                    <p className="text-gray-900">{proposal.timeline}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Budget</label>
                    <p className="text-lg font-bold text-emerald-600">${proposal.budget?.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Team Size</label>
                    <p className="text-gray-900">{proposal.teamSize} members</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Related Challenge</h2>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Challenge Title</label>
                  <p className="text-lg font-medium text-gray-900">{proposal.challenge.title}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Organization</label>
                  <p className="text-gray-900">{proposal.challenge.organization} ({proposal.challenge.organizationType})</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phase 1 Budget</label>
                    <p className="text-lg font-bold text-emerald-600">${proposal.challenge.phase1Budget?.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Capital Commitment</label>
                    <p className="text-lg font-bold text-blue-600">${proposal.challenge.capitalCommitment?.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Equity Offered</label>
                    <p className="text-lg font-bold text-purple-600">{proposal.challenge.equityOffered}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Technical & Implementation Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Methodology</label>
                  <p className="text-gray-700">{proposal.methodology || 'Not specified'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Deliverables</label>
                  <p className="text-gray-700">{proposal.deliverables || 'Not specified'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Risk Assessment</label>
                  <p className="text-gray-700">{proposal.riskAssessment || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Score */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Proposal Status</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Score</span>
                  <span className="text-lg font-bold text-blue-600">{proposal.score}/5.0</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Submitted Date</span>
                  <span className="text-sm font-medium text-gray-900">{proposal.submittedAt}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last Updated</span>
                  <span className="text-sm font-medium text-gray-900">{proposal.updatedAt}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Has Project</span>
                  <span className="text-sm font-medium text-gray-900">
                    {proposal.hasProject ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            {/* Studio Information */}
            {proposal.studio && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Studio Details</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Name</label>
                    <p className="text-lg font-medium text-gray-900">{proposal.studio.name}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">Location</label>
                    <p className="text-gray-900">{proposal.studio.location}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">Rating</label>
                    <p className="text-gray-900">{proposal.studio.rating}/5.0</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">Type</label>
                    <p className="text-gray-900">{proposal.studio.type}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                  Submit Review
                </button>
                
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  ✅ Approve Proposal
                </button>
                
                <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
                  💬 Request Changes
                </button>
                
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  📄 View Challenge Details
                </button>
                
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  🏢 Contact Studio
                </button>
                
                {proposal.hasProject && (
                  <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    🚀 View Project
                  </button>
                )}
              </div>
            </div>

            {/* Project Status */}
            {proposal.project && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Status</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Investment</span>
                    <span className="text-lg font-bold text-emerald-600">${proposal.project.investment?.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      proposal.project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      proposal.project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {proposal.project.status}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium text-gray-900">{proposal.project.progress}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}