// src/components/StudioChallengeView.tsx - STUDIO-SPECIFIC VERSION
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
  Globe,
  MapPin,
  Target,
  Send,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Info,
  Award,
  Heart,
  Share2,
  Landmark,
  University,
} from "lucide-react";

interface ChallengeViewProps {
  challengeId: number;
  studioId: number;
}

function StudioChallengeView({ challengeId, studioId }: ChallengeViewProps) {
  const router = useRouter();
  const [challenge, setChallenge] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRequestInfo, setShowRequestInfo] = useState(false);
  const [saved, setSaved] = useState(false);

  // Debug logging
  console.log('StudioChallengeView props:', { challengeId, studioId });

  useEffect(() => {
    if (challengeId && studioId) {
      fetchChallenge();
    } else {
      console.log('Missing required props:', { challengeId, studioId });
      setError('Missing challenge ID or studio ID');
      setLoading(false);
    }
  }, [challengeId, studioId]);

  const fetchChallenge = async () => {
    try {
      setError(null);
      console.log(`Fetching challenge ${challengeId} for studio ${studioId}`);
      
      // Use studio-specific API endpoint
      const response = await fetch(`/api/studio-challenges/${challengeId}?studioId=${studioId}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Challenge data loaded:', data);
      setChallenge(data);
      setSaved(data.isSaved || false);
    } catch (error) {
      console.error('Error fetching challenge:', error);
      setError(error instanceof Error ? error.message : 'Failed to load challenge');
      setChallenge(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChallenge = async () => {
    try {
      const response = await fetch(`/api/studios/${studioId}/challenges/${challengeId}/save`, {
        method: 'POST',
      });
      if (response.ok) {
        setSaved(true);
      }
    } catch (error) {
      console.error('Error saving challenge:', error);
    }
  };

  const handleRequestInfo = () => {
    setShowRequestInfo(true);
  };

  const handleSubmitProposal = () => {
    router.push(`/studio/challenge/${challengeId}/proposal`);
  };

  const getOwnerTypeIcon = (ownerType: string) => {
    switch (ownerType) {
      case 'corporate': return Building2;
      case 'government': return Landmark;
      case 'research': return University;
      default: return Building2;
    }
  };

  const getOwnerTypeLabel = (ownerType: string) => {
    switch (ownerType) {
      case 'corporate': return 'Corporate Challenge';
      case 'government': return 'Government Initiative'; 
      case 'research': return 'Research Collaboration';
      default: return 'Innovation Challenge';
    }
  };

  const getOwnerTypeColor = (ownerType: string) => {
    switch (ownerType) {
      case 'corporate': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'government': return 'bg-green-100 text-green-800 border-green-200';
      case 'research': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
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

  const isDeadlinePassed = challenge && new Date(challenge.deadline) < new Date();
  const daysUntilDeadline = challenge ? Math.ceil((new Date(challenge.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-6xl mx-auto p-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading challenge opportunity...</p>
            <p className="text-sm text-gray-500 mt-2">Challenge ID: {challengeId}, Studio ID: {studioId}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-6xl mx-auto p-6">
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Challenge</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <p className="text-sm text-gray-500 mb-6">Challenge ID: {challengeId}, Studio ID: {studioId}</p>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
            >
              Go Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-6xl mx-auto p-6">
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Challenge Not Found</h2>
            <p className="text-gray-600 mb-6">This challenge opportunity doesn't exist or has been removed.</p>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
            >
              Go Back to Opportunities
            </button>
          </div>
        </div>
      </div>
    );
  }

  const OwnerIcon = getOwnerTypeIcon(challenge.ownerType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* Studio Header - Different from other org types */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Challenge Opportunities
          </button>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <OwnerIcon className="w-6 h-6 text-slate-600" />
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getOwnerTypeColor(challenge.ownerType)}`}>
                    {getOwnerTypeLabel(challenge.ownerType)}
                  </span>
                  {isDeadlinePassed ? (
                    <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full border border-red-200">
                      Opportunity Closed
                    </span>
                  ) : daysUntilDeadline <= 7 ? (
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full border border-orange-200">
                      {daysUntilDeadline} days remaining
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full border border-green-200">
                      Open for Applications
                    </span>
                  )}
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{challenge.title}</h1>
                <p className="text-xl text-gray-600 leading-relaxed">{challenge.description}</p>
              </div>
              
              <div className="ml-6 flex flex-col gap-3">
                {!saved && !isDeadlinePassed && (
                  <button
                    onClick={handleSaveChallenge}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                    Save Opportunity
                  </button>
                )}
                {saved && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200">
                    <CheckCircle className="w-4 h-4" />
                    Saved
                  </div>
                )}
                <button
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>

            {/* Studio-focused Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-50 rounded-xl">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium text-gray-600">Phase 1 Budget</span>
                </div>
                <p className="text-2xl font-bold text-emerald-600">{formatCurrency(challenge.phase1Budget)}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-600">Total Commitment</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(challenge.capitalCommitment)}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-600">Equity Offered</span>
                </div>
                <p className="text-2xl font-bold text-purple-600">{challenge.equityOffered || 0}%</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-gray-600">Application Deadline</span>
                </div>
                <p className={`text-lg font-bold ${daysUntilDeadline <= 7 ? 'text-red-600' : 'text-orange-600'}`}>
                  {new Date(challenge.deadline).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Studio Perspective */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Opportunity Details
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">{challenge.description}</p>
                
                {challenge.additionalInfo && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-900 mb-2">Additional Requirements</h3>
                    <p className="text-blue-800">{challenge.additionalInfo}</p>
                  </div>
                )}
              </div>
            </div>

            {/* What We're Looking For - Studio specific */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">What We're Looking For</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Ideal Partner Profile</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Proven track record in innovation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Strong technical expertise
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Ability to scale solutions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Collaborative approach
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Expected Deliverables</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-500" />
                      Detailed project proposal
                    </li>
                    <li className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-500" />
                      Technical implementation plan
                    </li>
                    <li className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-500" />
                      Timeline and milestones
                    </li>
                    <li className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-500" />
                      Team composition
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Studio Actions */}
          <div className="space-y-6">
            {/* Application CTA */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="text-center mb-6">
                <Award className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Apply?</h3>
                <p className="text-gray-600">
                  Submit your proposal and showcase your studio's capabilities.
                </p>
              </div>
              
              {challenge.hasSubmittedProposal ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Application Submitted</span>
                  </div>
                  <p className="text-blue-700 text-sm mb-3">
                    You have already applied for this opportunity. 
                    Status: <span className="font-medium">{challenge.proposalStatus}</span>
                  </p>
                  <button
                    onClick={() => router.push(`/studio/proposal/${challenge.proposalId}`)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    View My Application
                  </button>
                </div>
              ) : isDeadlinePassed ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <p className="text-red-700 font-medium">Application Period Closed</p>
                  <p className="text-red-600 text-sm">The deadline for this opportunity has passed.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={handleSubmitProposal}
                    className="w-full px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium flex items-center gap-2 justify-center"
                  >
                    <Send className="w-5 h-5" />
                    Submit Application
                  </button>
                  
                  <button
                    onClick={handleRequestInfo}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 justify-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Request More Info
                  </button>
                </div>
              )}
            </div>

            {/* Challenge Sponsor */}
            {challenge.owner && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Challenge Sponsor</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    {challenge.owner.logo && (
                      <img src={challenge.owner.logo} alt={challenge.owner.name} className="w-12 h-12 rounded-lg" />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{challenge.owner.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{challenge.owner.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {challenge.owner.address && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {challenge.owner.address}
                      </div>
                    )}
                    {challenge.owner.website && (
                      <a
                        href={challenge.owner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-700 text-sm"
                      >
                        <Globe className="w-4 h-4" />
                        Visit Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Competition Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Competition Overview</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Applications</span>
                  <span className="text-sm font-medium text-gray-900">{challenge.proposalCount || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Days Remaining</span>
                  <span className={`text-sm font-medium ${daysUntilDeadline <= 7 ? 'text-red-600' : 'text-gray-900'}`}>
                    {daysUntilDeadline > 0 ? daysUntilDeadline : 'Closed'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Posted Date</span>
                  <span className="text-sm text-gray-900">{new Date(challenge.postedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Request Info Modal */}
        {showRequestInfo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Additional Information</h3>
                <form onSubmit={(e) => { e.preventDefault(); setShowRequestInfo(false); }}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      rows={4}
                      placeholder="What specific information would you like to know about this opportunity?"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      Send Request
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowRequestInfo(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudioChallengeView;