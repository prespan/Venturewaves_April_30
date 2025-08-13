import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  DollarSign, 
  Users, 
  FileText,
  Clock,
  TrendingUp,
  Save,
  Eye,
  Building,
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
  status: 'DRAFT' | 'PUBLISHED' | 'CLOSED';
  organizationType: 'CORPORATE' | 'GOVERNMENT' | 'RESEARCH_ORG' | 'INVESTOR';
  organizationId: number;
}

export default function ManageChallenge() {
  const router = useRouter();
  const { id } = router.query;
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setTimeout(() => {
        setChallenge({
          id: parseInt(id as string),
          title: "Smart Energy Grid Optimization",
          description: "Enhance grid efficiency using AI and IoT. Looking for innovative solutions to optimize energy distribution and reduce carbon footprint.",
          submittedBy: "Energy Innovation Department",
          deadline: "2025-07-30",
          postedAt: "2025-01-01",
          phase1Budget: 50000000,
          capitalCommitment: 200000000,
          equityOffered: 15,
          hasProposals: true,
          projectLinked: false,
          status: 'PUBLISHED',
          organizationType: 'GOVERNMENT',
          organizationId: 1
        });
        setLoading(false);
      }, 500);
    }
  }, [id]);

  const getOrganizationTypeLabel = (type: string) => {
    switch (type) {
      case 'CORPORATE': return 'Corporation';
      case 'GOVERNMENT': return 'Government Agency';
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
    }).format(cents / 100);
  };

  const handleSave = () => {
    console.log('Saving challenge:', challenge);
    setIsEditing(false);
  };

  const handleFieldChange = (field: keyof Challenge, value: any) => {
    if (challenge) {
      setChallenge({ ...challenge, [field]: value });
    }
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

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Challenge not found</p>
        </div>
      </div>
    );
  }

  const OrgIcon = getOrganizationIcon(challenge.organizationType);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 ${challenge.organizationType === 'CORPORATE' ? 'bg-blue-600' :
                challenge.organizationType === 'GOVERNMENT' ? 'bg-green-600' :
                challenge.organizationType === 'RESEARCH_ORG' ? 'bg-purple-600' :
                'bg-yellow-600'} rounded-lg`}>
                <OrgIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Manage Challenge</h1>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-gray-600">Challenge ID: #{challenge.id}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrganizationTypeColor(challenge.organizationType)}`}>
                    {getOrganizationTypeLabel(challenge.organizationType)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                {isEditing ? 'Preview' : 'Edit'}
              </button>
              {isEditing && (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Challenge Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={challenge.title}
                      onChange={(e) => handleFieldChange('title', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{challenge.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  {isEditing ? (
                    <textarea
                      value={challenge.description}
                      onChange={(e) => handleFieldChange('description', e.target.value)}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-700">{challenge.description}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={challenge.deadline.toString().split('T')[0]}
                      onChange={(e) => handleFieldChange('deadline', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4" />
                      {new Date(challenge.deadline).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Financial Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Financial Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phase 1 Budget</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={challenge.phase1Budget / 100}
                      onChange={(e) => handleFieldChange('phase1Budget', parseInt(e.target.value) * 100)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-gray-700">
                      <DollarSign className="w-4 h-4" />
                      {formatCurrency(challenge.phase1Budget)}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Capital Commitment</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={challenge.capitalCommitment / 100}
                      onChange={(e) => handleFieldChange('capitalCommitment', parseInt(e.target.value) * 100)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-gray-700">
                      <TrendingUp className="w-4 h-4" />
                      {formatCurrency(challenge.capitalCommitment)}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Equity Offered (%)</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={challenge.equityOffered}
                      onChange={(e) => handleFieldChange('equityOffered', parseInt(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Users className="w-4 h-4" />
                      {challenge.equityOffered}%
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Current Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    challenge.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' :
                    challenge.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {challenge.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Has Proposals</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    challenge.hasProposals ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {challenge.hasProposals ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Project Linked</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    challenge.projectLinked ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {challenge.projectLinked ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 justify-center">
                  <FileText className="w-4 h-4" />
                  View Proposals
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 justify-center">
                  <Users className="w-4 h-4" />
                  Invite Studios
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 justify-center">
                  <Clock className="w-4 h-4" />
                  Extend Deadline
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}