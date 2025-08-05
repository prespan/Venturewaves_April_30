import { useState } from "react";
import { useChallenges } from "@/hooks/useChallenges";

type Challenge = {
  id: number;
  title: string;
  description: string;
  submittedBy?: string;
  deadline?: string | Date;
  postedAt?: string | Date;
  phase1Budget?: number;        // in cents
  capitalCommitment?: number;   // in cents  
  equityOffered?: number;       // percentage
  hasProposals?: boolean;
  projectLinked?: boolean;
  corporateId?: number;
  governmentId?: number;
  researchOrgId?: number;
  logo?: string;
  rating?: number;
};

export default function ChallengesDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [savedChallenges, setSavedChallenges] = useState<number[]>([]);
  
  const { data: challenges, error, isLoading } = useChallenges();
  const challengesToDisplay = challenges || [];

  // Debug logging to see what data we're getting
  console.log('Challenges data:', challenges);
  console.log('First challenge:', challengesToDisplay[0]);
  if (challengesToDisplay[0]) {
    console.log('First challenge phase1Budget:', challengesToDisplay[0].phase1Budget);
    console.log('Calculation test:', Math.round(challengesToDisplay[0].phase1Budget / 1000));
  }

  const filteredChallenges = challengesToDisplay
    .filter(challenge => {
      const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          challenge.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (challenge.category && challenge.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (challenge.impact && challenge.impact.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesRating = ratingFilter === "all" || 
                           (ratingFilter === "4+" && (challenge.rating || 0) >= 4) ||
                           (ratingFilter === "3+" && (challenge.rating || 0) >= 3) ||
                           (ratingFilter === "saved" && savedChallenges.includes(challenge.id));

      const matchesCategory = categoryFilter === "all" ||
                             (challenge.category && challenge.category === categoryFilter);

      const matchesSeverity = severityFilter === "all" ||
                             (challenge.severity && challenge.severity === severityFilter);
      
      return matchesSearch && matchesRating && matchesCategory && matchesSeverity;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title);
        case "category":
          return (a.category || "").localeCompare(b.category || "");
        case "severity":
          const severityOrder = { "Critical": 3, "High": 2, "Medium": 1, "Low": 0 };
          return (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "impact":
          return (a.impact || "").localeCompare(b.impact || "");
        default:
          return 0;
      }
    });

  const toggleSave = (challengeId: number) => {
    setSavedChallenges(prev => 
      prev.includes(challengeId) 
        ? prev.filter(id => id !== challengeId)
        : [...prev, challengeId]
    );
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-lg ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "text-red-600 bg-red-100";
      case "High": return "text-orange-600 bg-orange-100";
      case "Medium": return "text-yellow-600 bg-yellow-100";
      case "Low": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  // Get unique categories and severities for filters
  const categories = Array.from(new Set(challengesToDisplay.map(ch => ch.category).filter(Boolean)));
  const severities = ["Critical", "High", "Medium", "Low"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 -mx-16 -my-16 px-16 py-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Challenges Directory</h1>
          <p className="text-gray-600 text-lg">Explore global challenges and opportunities for innovation and impact</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Search */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search challenges..."
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="relative w-full md:w-48">
              <select
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Severity Filter */}
            <div className="relative w-full md:w-48">
              <select
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
              >
                <option value="all">All Severities</option>
                {severities.map(severity => (
                  <option key={severity} value={severity}>{severity}</option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div className="relative w-full md:w-48">
              <select
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
              >
                <option value="all">All Ratings</option>
                <option value="4+">4+ Stars</option>
                <option value="3+">3+ Stars</option>
                <option value="saved">Saved Only</option>
              </select>
            </div>

            {/* Sort */}
            <div className="relative w-full md:w-48">
              <select
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="rating">Sort by Rating</option>
                <option value="category">Sort by Category</option>
                <option value="severity">Sort by Severity</option>
                <option value="impact">Sort by Impact</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-center text-sm text-gray-600 whitespace-nowrap">
              {isLoading ? "Loading..." : `${filteredChallenges.length} results`}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Challenges...</h3>
            <p className="text-gray-600">Discovering global challenges and opportunities</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">❌</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to Load Challenges</h3>
            <p className="text-gray-600">Please try again later</p>
          </div>
        )}

        {/* Challenges Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredChallenges.map((challenge) => (
              <div key={challenge.id} className="group bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                
                {/* Header */}
                <div className="relative p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      
                      {/* Logo Container */}
                      <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-sm border">
                        {challenge.logo ? (
                          <img 
                            src={challenge.logo} 
                            alt={`${challenge.title} logo`}
                            className="w-16 h-16 object-contain rounded-lg"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              if (e.currentTarget.nextElementSibling) {
                                (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                              }
                            }}
                          />
                        ) : null}
                        <div 
                          className={`w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-xl ${challenge.logo ? 'hidden' : 'flex'}`}
                        >
                          {challenge.title.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      
                      <div>
                        {/* Challenge Name */}
                        <h3 className="text-xl font-bold text-gray-900">
                          {challenge.title || `Challenge #${challenge.id}`}
                        </h3>
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-sm text-gray-600 font-medium">💼 Corporate Challenge</span>
                        </div>
                        
                        {/* Category & Status */}
                        <div className="flex items-center gap-2 mb-1">
                          {/* Show proposal status */}
                          {challenge.hasProposals !== undefined && (
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                              challenge.hasProposals 
                                ? 'text-green-600 bg-green-100' 
                                : 'text-orange-600 bg-orange-100'
                            }`}>
                              {challenge.hasProposals ? 'Has Proposals' : 'Open for Proposals'}
                            </span>
                          )}
                          {/* Show project status */}
                          {challenge.projectLinked !== undefined && challenge.projectLinked && (
                            <span className="text-xs text-blue-600 font-medium bg-blue-100 px-2 py-1 rounded-full">
                              Project Active
                            </span>
                          )}
                        </div>
                        
                        {/* Rating Display */}
                        {challenge.rating && (
                          <div className="flex items-center gap-1">
                            {renderStars(Math.round(challenge.rating))}
                            <span className="text-sm font-medium text-gray-600 ml-1">
                              {challenge.rating.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Save Button */}
                    <button
                      onClick={() => toggleSave(challenge.id)}
                      className={`p-2 rounded-lg shadow-sm hover:shadow-md transition-all ${
                        savedChallenges.includes(challenge.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-gray-600 hover:text-red-500'
                      }`}
                    >
                      <span className="text-xl">
                        {savedChallenges.includes(challenge.id) ? '❤️' : '🤍'}
                      </span>
                    </button>
                  </div>

                  {challenge.postedAt && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span>📅</span>
                      <span className="font-medium">Posted: {new Date(challenge.postedAt).toLocaleDateString()}</span>
                    </div>
                  )}

                  {challenge.deadline && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span>⏰</span>
                      <span className="font-medium">Deadline: {new Date(challenge.deadline).toLocaleDateString()}</span>
                    </div>
                  )}

                  {challenge.submittedBy && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span>👤</span>
                      <span className="font-medium">Submitted by: {challenge.submittedBy}</span>
                    </div>
                  )}

                  {challenge.phase1Budget && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span>💰</span>
                      <span className="font-medium">Phase I Budget: ${challenge.phase1Budget.toLocaleString()}</span>
                    </div>
                  )}

                  {challenge.capitalCommitment && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span>💼</span>
                      <span className="font-medium">Capital Commitment: ${challenge.capitalCommitment.toLocaleString()}</span>
                    </div>
                  )}

                  {challenge.equityOffered && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span>📈</span>
                      <span className="font-medium">Equity: {challenge.equityOffered}%</span>
                    </div>
                  )}

                  {challenge.hasProposals !== undefined && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span>📝</span>
                      <span className="font-medium">
                        {challenge.hasProposals ? 'Has Proposals' : 'No Proposals Yet'}
                      </span>
                    </div>
                  )}

                  {challenge.projectLinked !== undefined && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>🔗</span>
                      <span className="font-medium">
                        {challenge.projectLinked ? 'Project Linked' : 'No Project Yet'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {challenge.description || 'No description available for this challenge.'}
                  </p>

                  {/* Impact */}
                  {challenge.impact && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span>💥</span>
                        <div className="text-xs font-bold text-gray-600 uppercase tracking-wide">Potential Impact</div>
                      </div>
                      <div className="text-sm text-gray-700 font-medium">
                        {challenge.impact}
                      </div>
                    </div>
                  )}

                  {/* Stakeholders */}
                  {challenge.stakeholders && challenge.stakeholders.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span>👥</span>
                        <div className="text-xs font-bold text-gray-600 uppercase tracking-wide">Key Stakeholders</div>
                      </div>
                      <div className="text-sm text-gray-700 font-medium">
                        {challenge.stakeholders.slice(0, 3).join(', ')}
                        {challenge.stakeholders.length > 3 && ` +${challenge.stakeholders.length - 3} more`}
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">
                        {challenge.phase1Budget ? `${(challenge.phase1Budget / 100).toLocaleString()}` : 'N/A'}
                      </div>
                      <div className="text-xs text-gray-600 font-semibold">Phase 1 Budget</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">
                        {challenge.equityOffered ? `${challenge.equityOffered}%` : 'N/A'}
                      </div>
                      <div className="text-xs text-gray-600 font-semibold">Equity Offered</div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
                    Explore Challenge
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredChallenges.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No challenges found' : 'No challenges available'}
            </h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search criteria' : 'Challenges will appear here once added to the database'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}