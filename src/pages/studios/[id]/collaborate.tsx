import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Building,
  ExternalLink,
  Send,
  CheckCircle,
  Calendar,
  DollarSign,
  Users,
  Star,
  MapPin,
  Briefcase
} from 'lucide-react';

interface Studio {
  id: number;
  name: string;
  website: string;
  address: string;
  description: string;
  keyStartups: string[];
  logo?: string;
  rating?: number;
  totalProjects?: number;
  successRate?: number;
  specialties?: string[];
}

interface CollaborationRequest {
  studioId: number;
  organizationId: number;
  projectType: 'challenge' | 'partnership' | 'investment';
  title: string;
  description: string;
  budget: number;
  timeline: string;
  priority: 'low' | 'medium' | 'high';
  contactEmail: string;
  additionalNotes?: string;
}

export default function RequestCollaboration() {
  const router = useRouter();
  const { id } = router.query;
  const [studio, setStudio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState<CollaborationRequest>({
    studioId: 0,
    organizationId: 1,
    projectType: 'challenge',
    title: '',
    description: '',
    budget: 0,
    timeline: '',
    priority: 'medium',
    contactEmail: '',
    additionalNotes: ''
  });

  useEffect(() => {
    if (id) {
      setTimeout(() => {
        setStudio({
          id: parseInt(id as string),
          name: "Antler",
          website: "https://antler.co",
          address: "London, UK",
          description: "Global early-stage VC and startup generator, building the next wave of tech companies across six continents. We identify and back exceptional founders at the earliest stage.",
          keyStartups: ["Airwallex", "Carsome", "Reebelo", "Trusting Social", "Pomelo"],
          rating: 4.8,
          totalProjects: 156,
          successRate: 89,
          specialties: ["Fintech", "E-commerce", "SaaS", "Climate Tech", "AI/ML"]
        });
        setFormData(prev => ({ ...prev, studioId: parseInt(id as string) }));
        setLoading(false);
      }, 500);
    }
  }, [id]);

  const handleInputChange = (field: keyof CollaborationRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting collaboration request:', formData);
    setSubmitted(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading studio information...</p>
        </div>
      </div>
    );
  }

  if (!studio) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Studio not found</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Sent!</h2>
          <p className="text-gray-600 mb-6">
            Your collaboration request has been sent to {studio.name}. 
            They typically respond within 2-3 business days.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => router.back()}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => setSubmitted(false)}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Send Another Request
            </button>
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
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Request Collaboration</h1>
          <p className="text-gray-600">
            Send a collaboration request to {studio.name} for your next innovation project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{studio.name}</h3>
              
              <div className="space-y-4">
                <p className="text-gray-600 text-sm">{studio.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {studio.address}
                  </div>
                  
                  <a
                    href={studio.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Website
                  </a>
                </div>

                {studio.rating && (
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{studio.rating}/5.0</span>
                    <span className="text-sm text-gray-500">({studio.totalProjects} projects)</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Studio Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Projects</span>
                  <span className="font-medium">{studio.totalProjects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="font-medium text-green-600">{studio.successRate}%</span>
                </div>
              </div>
              
              {studio.specialties && (
                <div className="mt-4">
                  <h5 className="font-medium text-gray-900 mb-2">Specialties</h5>
                  <div className="flex flex-wrap gap-1">
                    {studio.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {studio.keyStartups && (
                <div className="mt-4">
                  <h5 className="font-medium text-gray-900 mb-2">Key Startups</h5>
                  <div className="space-y-1">
                    {studio.keyStartups.slice(0, 3).map((startup, index) => (
                      <div key={index} className="text-sm text-gray-600">• {startup}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Collaboration Details</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Collaboration Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'challenge', label: 'Innovation Challenge', icon: Briefcase },
                      { value: 'partnership', label: 'Strategic Partnership', icon: Users },
                      { value: 'investment', label: 'Investment Opportunity', icon: DollarSign }
                    ].map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleInputChange('projectType', value)}
                        className={`p-3 border rounded-lg text-center transition-colors ${
                          formData.projectType === value
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-5 h-5 mx-auto mb-1" />
                        <div className="text-sm font-medium">{label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., AI-Powered Energy Optimization Challenge"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe your project, goals, and what you're looking for from the studio..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Range (USD)
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', parseInt(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value={0}>Select budget range</option>
                      <option value={50000}>$50K - $100K</option>
                      <option value={100000}>$100K - $250K</option>
                      <option value={250000}>$250K - $500K</option>
                      <option value={500000}>$500K - $1M</option>
                      <option value={1000000}>$1M+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => handleInputChange('timeline', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select timeline</option>
                      <option value="1-3 months">1-3 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6-12 months">6-12 months</option>
                      <option value="12+ months">12+ months</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level
                  </label>
                  <div className="flex gap-3">
                    {[
                      { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
                      { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
                      { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' }
                    ].map(({ value, label, color }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleInputChange('priority', value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                          formData.priority === value
                            ? `${color} border-current`
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your.email@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    rows={3}
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Any additional information or specific requirements..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2 justify-center"
                  >
                    <Send className="w-4 h-4" />
                    Send Request
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}