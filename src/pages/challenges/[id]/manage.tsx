import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ChallengeManagePage() {
  const router = useRouter();
  const { id } = router.query;
  const [challenge, setChallenge] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🚀 Current port:', window.location.port);
    console.log('🚀 Will call API:', `/api/challenge-details/${id}`);
    console.log('🚀 ID value:', id, 'Type:', typeof id);
    
    if (!id) {
      console.log('❌ No ID found, returning early');
      return;
    }

    async function fetchChallenge() {
      try {
        setLoading(true);
        const apiUrl = `/api/challenge-details/${id}`;
        console.log('📡 Making fetch request to:', apiUrl);
        
        const response = await fetch(apiUrl);
        console.log('📡 Response status:', response.status);
        console.log('📡 Response OK:', response.ok);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ API Error Response:', errorText);
          throw new Error(`Failed to fetch challenge: ${response.status}`);
        }
        
        const challengeData = await response.json();
        console.log('✅ Challenge data loaded:', challengeData);
        setChallenge(challengeData);
        
      } catch (err) {
        console.error('❌ Error loading challenge:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchChallenge();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Challenge Not Found</h1>
          <p className="text-gray-600 mb-4">{error || 'The challenge you are looking for does not exist.'}</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Manage Challenge</h1>
              <p className="text-gray-600 mt-1">Challenge ID: #{challenge.id} • {challenge.organizationType}</p>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Edit
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Challenge Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Challenge Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Title</label>
                  <p className="text-lg font-medium text-gray-900">{challenge.title}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Description</label>
                  <p className="text-gray-700">{challenge.description}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Deadline</label>
                  <p className="text-gray-900">📅 {new Date(challenge.deadline).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Financial Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Financial Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Phase 1 Budget</label>
                  <p className="text-lg font-bold text-emerald-600">${challenge.phase1Budget?.toLocaleString()}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Capital Commitment</label>
                  <p className="text-lg font-bold text-blue-600">${challenge.capitalCommitment?.toLocaleString()}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Equity Offered (%)</label>
                  <p className="text-lg font-bold text-purple-600">{challenge.equityOffered}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Current Status</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    {challenge.status}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Has Proposals</span>
                  <span className="text-sm font-medium text-gray-900">
                    {challenge.hasProposals ? 'Yes' : 'No'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Project Linked</span>
                  <span className="text-sm font-medium text-gray-900">
                    {challenge.projectLinked ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  📝 View Proposals ({challenge.proposals?.length || 0})
                </button>
                
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  👥 Invite Studios
                </button>
                
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  ⏰ Extend Deadline
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}