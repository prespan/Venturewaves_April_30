// pages/partners/[id]/request.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PartnerRequestPage() {
  const router = useRouter();
  const { id } = router.query;
  const [partner, setPartner] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🚀 Current port:', window.location.port);
    console.log('🚀 Will call API:', `/api/partner-details/${id}`);
    console.log('🚀 ID value:', id, 'Type:', typeof id);
    
    if (!id) {
      console.log('❌ No ID found, returning early');
      return;
    }

    async function fetchPartner() {
      try {
        setLoading(true);
        const apiUrl = `/api/partner-details/${id}`;
        console.log('📡 Making fetch request to:', apiUrl);
        
        const response = await fetch(apiUrl);
        console.log('📡 Response status:', response.status);
        console.log('📡 Response OK:', response.ok);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ API Error Response:', errorText);
          throw new Error(`Failed to fetch partner: ${response.status}`);
        }
        
        const partnerData = await response.json();
        console.log('✅ Partner data loaded:', partnerData);
        setPartner(partnerData);
        
      } catch (err) {
        console.error('❌ Error loading partner:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchPartner();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !partner) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Partner Not Found</h1>
          <p className="text-gray-600 mb-4">{error || 'The partner you are looking for does not exist.'}</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Request Partnership</h1>
              <p className="text-gray-600 mt-1">Partner ID: #{partner.id} • {partner.type}</p>
            </div>
            <div className="flex gap-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {partner.type}
              </span>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Edit Partner
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Partner Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Partner Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Organization Name</label>
                  <p className="text-lg font-medium text-gray-900">{partner.name}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Description</label>
                  <p className="text-gray-700">{partner.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Address</label>
                    <p className="text-gray-900">{partner.address}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Website</label>
                    <a href={partner.website} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:text-blue-800">
                      {partner.website}
                    </a>
                  </div>
                </div>

                {/* Remove fields that don't exist in your schema */}
                {partner.keyStartups && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Key Startups</label>
                    <div className="text-gray-900">
                      {typeof partner.keyStartups === 'object' ? 
                        JSON.stringify(partner.keyStartups, null, 2) : 
                        partner.keyStartups}
                    </div>
                  </div>
                )}

                {partner.focus && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Focus Areas</label>
                    <div className="text-gray-900">
                      {typeof partner.focus === 'object' ? 
                        JSON.stringify(partner.focus, null, 2) : 
                        partner.focus}
                    </div>
                  </div>
                )}

                {partner.focusDomains && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Focus Domains</label>
                    <div className="text-gray-900">
                      {typeof partner.focusDomains === 'object' ? 
                        JSON.stringify(partner.focusDomains, null, 2) : 
                        partner.focusDomains}
                    </div>
                  </div>
                )}

                {partner.focusAreas && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Focus Areas</label>
                    <div className="text-gray-900">
                      {typeof partner.focusAreas === 'object' ? 
                        JSON.stringify(partner.focusAreas, null, 2) : 
                        partner.focusAreas}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Activity Overview */}
            {partner.type === 'Studio' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
                
                {/* Proposals */}
                {partner.proposals && partner.proposals.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Recent Proposals</h3>
                    <div className="space-y-3">
                      {partner.proposals.slice(0, 5).map((proposal: any) => (
                        <div key={proposal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{proposal.title}</p>
                            <p className="text-sm text-gray-600">
                              {proposal.challengeTitle} • {proposal.challengeOrganization}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              proposal.status === 'Approved' ? 'bg-green-100 text-green-800' :
                              proposal.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {proposal.status}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">{proposal.submittedAt}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {partner.projects && partner.projects.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Active Projects</h3>
                    <div className="space-y-3">
                      {partner.projects.slice(0, 3).map((project: any) => (
                        <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{project.challengeTitle}</p>
                            <p className="text-sm text-gray-600">{project.challengeOrganization}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="w-full bg-gray-200 rounded-full h-1.5 max-w-[100px]">
                                <div 
                                  className="bg-blue-600 h-1.5 rounded-full"
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-500">{project.progress}%</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {project.status}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">${project.investment?.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Challenges (for Government/Research Organizations) */}
            {(partner.type === 'Government' || partner.type === 'Research Organization') && partner.challenges && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Published Challenges</h2>
                
                <div className="space-y-3">
                  {partner.challenges.slice(0, 5).map((challenge: any) => (
                    <div key={challenge.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{challenge.title}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        challenge.status === 'Open' ? 'bg-green-100 text-green-800' :
                        challenge.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {challenge.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
              
              <div className="space-y-3">
                {partner.type === 'Studio' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Proposals</span>
                      <span className="text-lg font-bold text-blue-600">{partner.totalProposals}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Active Projects</span>
                      <span className="text-lg font-bold text-green-600">{partner.activeProjects}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Completed Projects</span>
                      <span className="text-lg font-bold text-purple-600">{partner.completedProjects}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Avg Project Value</span>
                      <span className="text-lg font-bold text-emerald-600">
                        ${partner.averageProjectValue?.toLocaleString()}
                      </span>
                    </div>
                  </>
                )}

                {partner.type === 'Investor' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Portfolio Size</span>
                      <span className="text-lg font-bold text-blue-600">{partner.portfolioSize}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Investment Range</span>
                      <span className="text-sm font-medium text-gray-900">{partner.investmentRange}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Investments</span>
                      <span className="text-lg font-bold text-green-600">{partner.totalInvestments}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Active Investments</span>
                      <span className="text-lg font-bold text-purple-600">{partner.activeInvestments}</span>
                    </div>
                  </>
                )}

                {(partner.type === 'Government' || partner.type === 'Research Organization') && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Challenges</span>
                      <span className="text-lg font-bold text-blue-600">{partner.totalChallenges}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Active Challenges</span>
                      <span className="text-lg font-bold text-green-600">{partner.activeChallenges}</span>
                    </div>
                  </>
                )}

                <div className="flex justify-between pt-3 border-t">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="text-sm font-medium text-gray-900">{partner.createdAt}</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Organization</label>
                  <p className="text-gray-900">{partner.name}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Address</label>
                  <p className="text-gray-900">{partner.address}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Website</label>
                  <a href={partner.website} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800 text-sm">
                    Visit Website →
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                  Send Partnership Request
                </button>
                
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  📧 Send Message
                </button>
                
                {partner.type === 'Studio' && (
                  <>
                    <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                      🎯 Invite to Challenge
                    </button>
                    
                    <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      📊 View All Proposals
                    </button>
                    
                    <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      🚀 View All Projects
                    </button>
                  </>
                )}

                {partner.type === 'Investor' && (
                  <>
                    <button className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                      💰 Discuss Investment
                    </button>
                    
                    <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      📈 View Portfolio
                    </button>
                  </>
                )}

                {(partner.type === 'Government' || partner.type === 'Research Organization') && (
                  <>
                    <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                      🤝 Propose Collaboration
                    </button>
                    
                    <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      📋 View All Challenges
                    </button>
                  </>
                )}
                
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  📄 Generate Report
                </button>
                
                <button className="w-full px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50">
                  🚫 Block Partner
                </button>
              </div>
            </div>

            {/* Partnership Timeline */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Partnership Timeline</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Joined Platform</span>
                  <span className="text-sm font-medium text-gray-900">{partner.createdAt}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last Activity</span>
                  <span className="text-sm font-medium text-gray-900">{partner.updatedAt}</span>
                </div>
                
                {partner.type === 'Studio' && partner.projects && partner.projects.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">First Project</span>
                    <span className="text-sm font-medium text-gray-900">
                      {Math.min(...partner.projects.map((p: any) => new Date(p.createdAt || Date.now()).getTime()))}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}