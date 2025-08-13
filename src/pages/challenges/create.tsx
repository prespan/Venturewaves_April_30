"use client";

import { useRouter } from 'next/router';
import { useState } from 'react';
import { 
  ArrowLeft, 
  Save,
  Eye,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  Building,
  Landmark,
  University,
  Banknote,
  FileText,
  Target,
  Clock,
  Plus,
  X
} from 'lucide-react';

interface CreateChallengeForm {
  title: string;
  description: string;
  category: string;
  severity: 'Low' | 'Medium' | 'High';
  deadline: string;
  phase1Budget: number;
  capitalCommitment: number;
  equityOffered: number;
  organizationType: 'CORPORATE' | 'GOVERNMENT' | 'RESEARCH_ORG' | 'INVESTOR';
  organizationId: number;
  requirements: string[];
  successCriteria: string[];
  timeline: {
    phase: string;
    duration: string;
    description: string;
  }[];
}

export default function CreateChallenge() {
  const router = useRouter();
  const { orgType, orgId, orgName } = router.query;
  
  const [formData, setFormData] = useState<CreateChallengeForm>({
    title: '',
    description: '',
    category: '',
    severity: 'Medium',
    deadline: '',
    phase1Budget: 0,
    capitalCommitment: 0,
    equityOffered: 0,
    organizationType: (orgType as any) || 'CORPORATE',
    organizationId: parseInt(orgId as string) || 1,
    requirements: [''],
    successCriteria: [''],
    timeline: [
      { phase: '', duration: '', description: '' }
    ]
  });

  const [isPreview, setIsPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  const getOrganizationConfig = (type: string) => {
    switch (type) {
      case 'CORPORATE':
        return { icon: Building, color: 'bg-blue-600', label: 'Corporation' };
      case 'GOVERNMENT':
        return { icon: Landmark, color: 'bg-green-600', label: 'Government' };
      case 'RESEARCH_ORG':
        return { icon: University, color: 'bg-purple-600', label: 'Research Organization' };
      case 'INVESTOR':
        return { icon: Banknote, color: 'bg-yellow-600', label: 'Investment Fund' };
      default:
        return { icon: Building, color: 'bg-gray-600', label: 'Organization' };
    }
  };

  const orgConfig = getOrganizationConfig(formData.organizationType);
  const IconComponent = orgConfig.icon;

  const categories = [
    'AI/Machine Learning', 'Healthcare', 'Fintech', 'Climate Tech', 'Energy',
    'Education', 'Transportation', 'Manufacturing', 'Agriculture', 'Security',
    'Social Impact', 'Entertainment', 'E-commerce', 'Infrastructure', 'Other'
  ];

  const handleInputChange = (field: keyof CreateChallengeForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayFieldChange = (field: 'requirements' | 'successCriteria', index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayField = (field: 'requirements' | 'successCriteria') => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: [...prev[field], ''] 
    }));
  };

  const removeArrayField = (field: 'requirements' | 'successCriteria', index: number) => {
    if (formData[field].length > 1) {
      const newArray = formData[field].filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, [field]: newArray }));
    }
  };

  const handleTimelineChange = (index: number, field: keyof CreateChallengeForm['timeline'][0], value: string) => {
    const newTimeline = [...formData.timeline];
    newTimeline[index] = { ...newTimeline[index], [field]: value };
    setFormData(prev => ({ ...prev, timeline: newTimeline }));
  };

  const addTimelinePhase = () => {
    setFormData(prev => ({
      ...prev,
      timeline: [...prev.timeline, { phase: '', duration: '', description: '' }]
    }));
  };

  const removeTimelinePhase = (index: number) => {
    if (formData.timeline.length > 1) {
      const newTimeline = formData.timeline.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, timeline: newTimeline }));
    }
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    setSaving(true);
    
    const submitData = {
      ...formData,
      phase1Budget: formData.phase1Budget * 100,
      capitalCommitment: formData.capitalCommitment * 100,
      status: isDraft ? 'DRAFT' : 'PUBLISHED'
    };

    try {
      // TODO: Replace with actual API call
      console.log('Creating challenge:', submitData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const dashboardRoutes = {
        'CORPORATE': '/dashboard/corporate',
        'GOVERNMENT': '/dashboard/government',
        'RESEARCH_ORG': '/dashboard/research',
        'INVESTOR': '/dashboard/investor'
      };
      
      router.push(dashboardRoutes[formData.organizationType]);
    } catch (error) {
      console.error('Error creating challenge:', error);
    } finally {
      setSaving(false);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (isPreview) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          <div className="mb-6">
            <button
              onClick={() => setIsPreview(false)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Edit
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Challenge Preview</h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{formData.title || 'Untitled Challenge'}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <IconComponent className="w-4 h-4" />
                    {orgName || 'Organization'}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    formData.organizationType === 'CORPORATE' ? 'bg-blue-100 text-blue-800' :
                    formData.organizationType === 'GOVERNMENT' ? 'bg-green-100 text-green-800' :
                    formData.organizationType === 'RESEARCH_ORG' ? 'bg-purple-100 text-purple-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {orgConfig.label}
                  </span>
                  <span>Category: {formData.category}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    formData.severity === 'High' ? 'bg-red-100 text-red-800' :
                    formData.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {formData.severity} Priority
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-6">{formData.description}</p>

            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg mb-6">
              <div className="text-center">
                <DollarSign className="w-5 h-5 text-green-600 mx-auto mb-1" />
                <p className="text-sm text-gray-600">Phase 1 Budget</p>
                <p className="font-bold text-green-600">{formatCurrency(formData.phase1Budget)}</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <p className="text-sm text-gray-600">Total Investment</p>
                <p className="font-bold text-blue-600">{formatCurrency(formData.capitalCommitment)}</p>
              </div>
              <div className="text-center">
                <Users className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                <p className="text-sm text-gray-600">Equity Offered</p>
                <p className="font-bold text-purple-600">{formData.equityOffered}%</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleSubmit(true)}
                disabled={saving}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save as Draft'}
              </button>
              <button
                onClick={() => handleSubmit(false)}
                disabled={saving}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Publishing...' : 'Publish Challenge'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              <div className={`p-2 ${orgConfig.color} rounded-lg`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Create Challenge</h1>
                <p className="text-gray-600">{orgName || 'Organization'} • {orgConfig.label}</p>
              </div>
            </div>
            <button
              onClick={() => setIsPreview(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
          </div>
        </div>

        <form className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Challenge Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., AI-Powered Energy Optimization Platform"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority Level *
                </label>
                <select
                  value={formData.severity}
                  onChange={(e) => handleInputChange('severity', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Submission Deadline *
                </label>
                <input
                  type="date"
                  required
                  value={formData.deadline}
                  onChange={(e) => handleInputChange('deadline', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Challenge Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe the challenge, objectives, and what you're looking for..."
                />
              </div>
            </div>
          </div>

          {/* Financial Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Financial Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phase 1 Budget (USD) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.phase1Budget}
                  onChange={(e) => handleInputChange('phase1Budget', parseInt(e.target.value) || 0)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="500000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Investment (USD) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.capitalCommitment}
                  onChange={(e) => handleInputChange('capitalCommitment', parseInt(e.target.value) || 0)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="2000000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Equity Offered (%) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  max="100"
                  value={formData.equityOffered}
                  onChange={(e) => handleInputChange('equityOffered', parseInt(e.target.value) || 0)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="15"
                />
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Requirements</h2>
              <button
                type="button"
                onClick={() => addArrayField('requirements')}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
              >
                <Plus className="w-4 h-4" />
                Add Requirement
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => handleArrayFieldChange('requirements', index, e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Experience with AI/ML applications"
                  />
                  {formData.requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField('requirements', index)}
                      className="p-3 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Success Criteria */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Success Criteria</h2>
              <button
                type="button"
                onClick={() => addArrayField('successCriteria')}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
              >
                <Plus className="w-4 h-4" />
                Add Criteria
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.successCriteria.map((criteria, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={criteria}
                    onChange={(e) => handleArrayFieldChange('successCriteria', index, e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Achieve 85%+ accuracy in predictions"
                  />
                  {formData.successCriteria.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField('successCriteria', index)}
                      className="p-3 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleSubmit(true)}
              disabled={saving}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save as Draft'}
            </button>
            <button
              type="button"
              onClick={() => handleSubmit(false)}
              disabled={saving}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 justify-center"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Publishing...' : 'Publish Challenge'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}