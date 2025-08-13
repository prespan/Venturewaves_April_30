import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Calendar,
  DollarSign,
  TrendingUp,
  Building,
  Users,
  Clock,
  Star,
  Heart,
  Share2,
  Send,
  CheckCircle,
  AlertCircle,
  Target,
  Award,
  MapPin,
  Landmark,
  University,
  Banknote
} from 'lucide-react';

interface Challenge {
  id: number;
  title: string;
  description: string;
  submittedBy: string;
  deadline: string | Date;
  postedAt: string | Date;
  phase1Budget: number;
  capitalCommitment: number;
  equityOffered: number;
  hasProposals: boolean;
  projectLinked: boolean;
  status: 'OPEN' | 'CLOSED' | 'IN_REVIEW';
  category?: string;
  severity?: string;
  rating?: number;
  // Prisma relations
  corporate?: {
    id: number;
    name: string;
    website: string;
    address: string;
    description: string;
    logo?: string;
  };
  government?: {
    id: number;
    name: string;
    website: string;
    address: string;
    description: string;
    logo?: string;
  };
  researchOrg?: {
    id: number;
    name: string;
    website: string;
    address: string;
    description: string;
    logo?: string;
  };
}

export default function ExploreChallenge() {
  const router = useRouter();
  const { id } = router.query;
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // FETCH REAL DATA FROM YOUR API
  useEffect(() => {
    if (id) {
      fetchChallenge(id as string);
    }
  }, [id]);

  const fetchChallenge = async (challengeId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Replace this URL with your actual API endpoint
      const response = await fetch(`/api/challenges/${challengeId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch challenge');
      }
      
      const challengeData = await response.json();
      setChallenge(challengeData);
    } catch (err) {
      console.error('Error fetching challenge:', err);
      setError('Failed to load challenge. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getOrganizationType = (challenge: Challenge): string => {
    if (challenge.corporate) return 'CORPORATE';
    if (challenge.government) return 'GOVERNMENT';
    if (challenge.researchOrg) return 'RESEARCH_ORG';
    return 'UNKNOWN';
  };

  const getOrganizationInfo = (challenge: Challenge) => {
    if (challenge.corporate) {
      return {
        name: challenge.corporate.name,
        type: 'Corporation',
        description: challenge.corporate.description,
        location: challenge.corporate.address,
        website: challenge.corporate.website,
        logo: challenge.corporate.logo
      };
    }
    if (challenge.government) {
      return {
        name: challenge.government.name,
        type: 'Government Agency',
        description: challenge.government.description,
        location: challenge.government.address,
        website: challenge.government.website,
        logo: challenge.government.logo
      };
    }
    if (challenge.researchOrg) {
      return {
        name: challenge.researchOrg.name,
        type: 'Research Organization',
        description: challenge.researchOrg.description,
        location: challenge.researchOrg.address,
        website: challenge.researchOrg.website,
        logo: challenge.researchOrg.logo
      };
    }
    return null;
  };

  const getOrganizationTypeLabel = (type: string) => {
    switch (type) {
      case 'CORPORATE': return 'Corporation';
      case 'GOVERNMENT': return 'Government';
      case 'RESEARCH_ORG': return 'Research Organization';
      case 'INVESTOR': return 'Investment Fund';
      default: return 'Organization';
    }
  };

  const getOrganizationTypeColor = (type: string) => {
    switch (type) {
      case 'CORPORATE': return 'bg-blue-100 text-blue-800';
      case 'GOVERNMENT': return 'bg-green-100 text-green-800';
      case 'RESEARCH_ORG': return 'bg-purple-100 text-purple-800';
      case 'INVESTOR': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrganizationIcon = (type: string) => {
    switch (type) {
      case 'CORPORATE': return Building;
      case 'GOVERNMENT': return Landmark;
      case 'RESEARCH_ORG': return University;
      case 'INVESTOR': return Banknote;
      default: return Building;
    }
  };

  const formatCurrency = (cents: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(cents);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-green-100 text-green-800 border-green-200';
      case 'CLOSED': return 'bg-red-100 text-red-800 border-red-200';
      case 'IN_REVIEW': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDaysRemaining = () => {
    if (!challenge) return 0;
    const deadline = new Date(challenge.deadline);
    const now = new Date();
    const timeDiff = deadline.getTime() - now.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const handleSubmitProposal = () => {
    router.push(`/challenges/${id}/submit-proposal`);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading challenge...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => fetchChallenge(id as string)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Challenge not found</p>
        </div>
      </div>
    );
  }

  const daysRemaining = getDaysRemaining();
  const organizationType = getOrganizationType(challenge);
  const organizationInfo = getOrganizationInfo(challenge);
  const OrgIcon = getOrganizationIcon(organizationType);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Challenges
          </button>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{challenge.title}</h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor('OPEN')}`}>
                    Open for Proposals
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  {organizationInfo && (
                    <>
                      <div className="flex items-center gap-1">
                        <OrgIcon className="w-4 h-4" />
                        {organizationInfo.name}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrganizationTypeColor(organizationType)}`}>
                        {getOrganizationTypeLabel(organizationType)}
                      </span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {organizationInfo.location}
                      </div>
                    </>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Posted: {new Date(challenge.postedAt).toLocaleDateString()}
                  </div>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed">{challenge.description}</p>
              </div>

              <div className="flex gap-2 ml-6">
                <button
                  onClick={handleBookmark}
                  className={`p-2 rounded-lg border transition-colors ${
                    isBookmarked 
                      ? 'bg-red-50 border-red-200 text-red-600' 
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-600">Phase 1 Budget</span>
                </div>
                <p className="text-xl font-bold text-green-600">{formatCurrency(challenge.phase1Budget)}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-600">Total Investment</span>
                </div>
                <p className="text-xl font-bold text-blue-600">{formatCurrency(challenge.capitalCommitment)}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-600">Equity Offered</span>
                </div>
                <p className="text-xl font-bold text-purple-600">{challenge.equityOffered}%</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-gray-600">Days Remaining</span>
                </div>
                <p className={`text-xl font-bold ${daysRemaining <= 7 ? 'text-red-600' : 'text-orange-600'}`}>
                  {daysRemaining > 0 ? daysRemaining : 'Expired'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Challenge Details
              </h2>
              <p className="text-gray-700 leading-relaxed">{challenge.description}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Submit Proposal CTA */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="text-center mb-4">
                <Award className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Submit?</h3>
                <p className="text-gray-600 text-sm">
                  Submit your proposal and compete for this exciting opportunity.
                </p>
              </div>
              
              {daysRemaining > 0 ? (
                <button
                  onClick={handleSubmitProposal}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2 justify-center"
                >
                  <Send className="w-4 h-4" />
                  Submit Proposal
                </button>
              ) : (
                <div className="text-center p-3 bg-gray-100 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                  <p className="text-gray-600 text-sm">Challenge Closed</p>
                </div>
              )}
            </div>

            {/* Organization Info */}
            {organizationInfo && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Challenge Sponsor</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">{organizationInfo.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrganizationTypeColor(organizationType)}`}>
                        {getOrganizationTypeLabel(organizationType)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{organizationInfo.type}</p>
                    <p className="text-sm text-gray-600 mt-2">{organizationInfo.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {organizationInfo.location}
                  </div>
                  {organizationInfo.website && (
                    <a
                      href={organizationInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      <Building className="w-4 h-4" />
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}