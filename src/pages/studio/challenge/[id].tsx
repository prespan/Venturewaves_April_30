// src/pages/studio/challenge/[id].tsx
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

export default function StudioChallengePage() {
  const router = useRouter();
  const { id } = router.query;
  const [challenge, setChallenge] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const studioId = 2; // Hardcoded for demo

  useEffect(() => {
    if (id && typeof id === 'string') {
      fetchChallenge();
    }
  }, [id]);

  const fetchChallenge = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log(`Fetching challenge ${id} for studio ${studioId}`);
      
      const response = await fetch(`/api/studio-challenges/${id}?studioId=${studioId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Challenge data:', data);
      setChallenge(data);
      
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (cents: number): string => {
    if (!cents) return '$0';
    return `$${(cents / 100).toLocaleString()}`;
  };

  const handleBack = () => {
    router.back();
  };

  const handleSubmitProposal = () => {
    router.push(`/studio/challenge/${id}/proposal`);
  };

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            border: '4px solid #e2e8f0', 
            borderTop: '4px solid #475569',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <h3 style={{ color: '#1f2937', marginBottom: '0.5rem' }}>Loading Challenge...</h3>
          <p style={{ color: '#6b7280' }}>Challenge ID: {id}, Studio ID: {studioId}</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '3rem', 
            marginBottom: '1rem' 
          }}>❌</div>
          <h3 style={{ color: '#1f2937', marginBottom: '0.5rem' }}>Error Loading Challenge</h3>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>{error}</p>
          <button
            onClick={handleBack}
            style={{
              padding: '0.5rem 1.5rem',
              backgroundColor: '#475569',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <h3 style={{ color: '#1f2937', marginBottom: '0.5rem' }}>Challenge Not Found</h3>
          <p style={{ color: '#6b7280' }}>This challenge doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const isDeadlinePassed = challenge && new Date(challenge.deadline) < new Date();
  const daysUntilDeadline = challenge ? Math.ceil((new Date(challenge.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={handleBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#6b7280',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '1rem',
              fontSize: '0.9rem'
            }}
          >
            ← Back to Dashboard
          </button>
          
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: '#1f2937', 
            marginBottom: '0.5rem' 
          }}>
            {challenge.title}
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
            Challenge from {challenge.owner?.name || 'Corporate Partner'}
          </p>
        </div>

        {/* Challenge Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
          marginBottom: '2rem'
        }}>
          
          {/* Header Section */}
          <div style={{
            padding: '2rem',
            background: 'linear-gradient(to right, #f8fafc, #f1f5f9)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: '#dbeafe',
                    color: '#1e40af',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    border: '1px solid #bfdbfe'
                  }}>
                    Innovation Challenge
                  </span>
                  {isDeadlinePassed ? (
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: '#fecaca',
                      color: '#991b1b',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      border: '1px solid #fca5a5'
                    }}>
                      Opportunity Closed
                    </span>
                  ) : daysUntilDeadline <= 7 ? (
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: '#fed7aa',
                      color: '#c2410c',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      border: '1px solid #fdba74'
                    }}>
                      {daysUntilDeadline} days remaining
                    </span>
                  ) : (
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: '#bbf7d0',
                      color: '#166534',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      border: '1px solid #86efac'
                    }}>
                      Open for Applications
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '1.1rem', color: '#6b7280', lineHeight: '1.6' }}>
                  {challenge.description}
                </p>
              </div>
            </div>

            {/* Key Metrics */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem' 
            }}>
              <div style={{
                textAlign: 'center',
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '0.75rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  💰 Phase 1 Budget
                </div>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>
                  {formatCurrency(challenge.phase1Budget || 0)}
                </p>
              </div>
              <div style={{
                textAlign: 'center',
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '0.75rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  📈 Total Commitment
                </div>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb' }}>
                  {formatCurrency(challenge.capitalCommitment || 0)}
                </p>
              </div>
              <div style={{
                textAlign: 'center',
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '0.75rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  👥 Equity Offered
                </div>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#7c3aed' }}>
                  {challenge.equityOffered || 0}%
                </p>
              </div>
              <div style={{
                textAlign: 'center',
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '0.75rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  ⏰ Deadline
                </div>
                <p style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 'bold', 
                  color: daysUntilDeadline <= 7 ? '#dc2626' : '#ea580c' 
                }}>
                  {new Date(challenge.deadline).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div style={{ padding: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
              
              {/* Main Content */}
              <div>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '600', 
                  color: '#1f2937', 
                  marginBottom: '1rem' 
                }}>
                  🎯 Opportunity Details
                </h2>
                <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '1.1rem' }}>
                  {challenge.description}
                </p>

                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '600', 
                    color: '#1f2937', 
                    marginBottom: '1rem' 
                  }}>
                    What We're Looking For
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div>
                      <h4 style={{ fontWeight: '500', color: '#1f2937', marginBottom: '0.75rem' }}>
                        Ideal Partner Profile
                      </h4>
                      <ul style={{ listStyle: 'none', padding: 0, color: '#6b7280' }}>
                        <li style={{ marginBottom: '0.5rem' }}>✅ Proven track record in innovation</li>
                        <li style={{ marginBottom: '0.5rem' }}>✅ Strong technical expertise</li>
                        <li style={{ marginBottom: '0.5rem' }}>✅ Ability to scale solutions</li>
                        <li style={{ marginBottom: '0.5rem' }}>✅ Collaborative approach</li>
                      </ul>
                    </div>
                    <div>
                      <h4 style={{ fontWeight: '500', color: '#1f2937', marginBottom: '0.75rem' }}>
                        Expected Deliverables
                      </h4>
                      <ul style={{ listStyle: 'none', padding: 0, color: '#6b7280' }}>
                        <li style={{ marginBottom: '0.5rem' }}>🎯 Detailed project proposal</li>
                        <li style={{ marginBottom: '0.5rem' }}>🎯 Technical implementation plan</li>
                        <li style={{ marginBottom: '0.5rem' }}>🎯 Timeline and milestones</li>
                        <li style={{ marginBottom: '0.5rem' }}>🎯 Team composition</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏆</div>
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '600', 
                    color: '#1f2937', 
                    marginBottom: '0.5rem' 
                  }}>
                    Ready to Apply?
                  </h3>
                  <p style={{ color: '#6b7280' }}>
                    Submit your proposal and showcase your studio's capabilities.
                  </p>
                </div>
                
                {challenge.hasSubmittedProposal ? (
                  <div style={{
                    backgroundColor: '#dbeafe',
                    border: '1px solid #bfdbfe',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span>ℹ️</span>
                      <span style={{ fontWeight: '500', color: '#1e40af' }}>Application Submitted</span>
                    </div>
                    <p style={{ color: '#1e40af', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                      Status: <span style={{ fontWeight: '500' }}>{challenge.proposalStatus}</span>
                    </p>
                    <button
                      onClick={() => router.push(`/studio/proposal/${challenge.proposalId}`)}
                      style={{
                        width: '100%',
                        padding: '0.5rem 1rem',
                        backgroundColor: '#2563eb',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      View My Application
                    </button>
                  </div>
                ) : isDeadlinePassed ? (
                  <div style={{
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fca5a5',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚠️</div>
                    <p style={{ color: '#991b1b', fontWeight: '500' }}>Application Period Closed</p>
                    <p style={{ color: '#991b1b', fontSize: '0.875rem' }}>
                      The deadline for this opportunity has passed.
                    </p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <button
                      onClick={handleSubmitProposal}
                      style={{
                        width: '100%',
                        padding: '1rem 1.5rem',
                        background: 'linear-gradient(to right, #4f46e5, #2563eb)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.875rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      📤 Submit Application
                    </button>
                    
                    <button
                      onClick={() => alert('Request info feature coming soon!')}
                      style={{
                        width: '100%',
                        padding: '0.5rem 1rem',
                        border: '1px solid #d1d5db',
                        backgroundColor: 'white',
                        color: '#374151',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      💬 Request More Info
                    </button>
                  </div>
                )}

                {/* Competition Stats */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '1rem', 
                  paddingTop: '1rem', 
                  borderTop: '1px solid #e5e7eb',
                  marginTop: '1.5rem'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb' }}>
                      {daysUntilDeadline > 0 ? daysUntilDeadline : 0}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>
                      Days Left
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#eab308' }}>
                      {challenge.proposalCount || 0}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>
                      Applications
                    </div>
                  </div>
                </div>

                {/* Sponsor Info */}
                {challenge.owner && (
                  <div style={{ 
                    paddingTop: '1rem', 
                    borderTop: '1px solid #e5e7eb',
                    marginTop: '1.5rem'
                  }}>
                    <h3 style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: '600', 
                      color: '#1f2937', 
                      marginBottom: '0.75rem' 
                    }}>
                      Challenge Sponsor
                    </h3>
                    <p style={{ fontWeight: '500', color: '#1f2937' }}>{challenge.owner.name}</p>
                    {challenge.owner.description && (
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                        {challenge.owner.description}
                      </p>
                    )}
                    {challenge.owner.website && (
                      <a
                        href={challenge.owner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: '#475569',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          marginTop: '0.5rem',
                          textDecoration: 'none'
                        }}
                      >
                        🌐 Visit Website
                      </a>
                    )}
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