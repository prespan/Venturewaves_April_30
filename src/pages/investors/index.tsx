import { useState } from "react";
import { useInvestors } from "@/hooks/useInvestors";

type Investor = {
  id: number;
  name: string;
  description: string;
  address?: string;
  logo?: string;
  investmentFocus?: string[];
  rating?: number;
  type?: string;
  stage?: string;
  aum?: string;
  ticketSize?: string;
};

export default function InvestorsDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");
  const [savedInvestors, setSavedInvestors] = useState<number[]>([]);
  
  const { data: investors, error, isLoading } = useInvestors();
  const investorsToDisplay = investors || [];

  const filteredInvestors = investorsToDisplay
    .filter(investor => {
      const matchesSearch = investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          investor.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (investor.address && investor.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (investor.type && investor.type.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesRating = ratingFilter === "all" || 
                           (ratingFilter === "4+" && (investor.rating || 0) >= 4) ||
                           (ratingFilter === "3+" && (investor.rating || 0) >= 3) ||
                           (ratingFilter === "saved" && savedInvestors.includes(investor.id));

      const matchesType = typeFilter === "all" ||
                         (investor.type && investor.type === typeFilter);

      const matchesStage = stageFilter === "all" ||
                          (investor.stage && investor.stage === stageFilter);
      
      return matchesSearch && matchesRating && matchesType && matchesStage;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "location":
          return (a.address || "").localeCompare(b.address || "");
        case "type":
          return (a.type || "").localeCompare(b.type || "");
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "aum":
          return (b.aum || "").localeCompare(a.aum || "");
        default:
          return 0;
      }
    });

  const toggleSave = (investorId: number) => {
    setSavedInvestors(prev => 
      prev.includes(investorId) 
        ? prev.filter(id => id !== investorId)
        : [...prev, investorId]
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

  // Get unique types and stages for filters
  const types = Array.from(new Set(investorsToDisplay.map(inv => inv.type).filter(Boolean)));
  const stages = Array.from(new Set(investorsToDisplay.map(inv => inv.stage).filter(Boolean)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 -mx-16 -my-16 px-16 py-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Investors Directory</h1>
          <p className="text-gray-600 text-lg">Discover venture capital firms, private equity, and investment partners</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Search */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search investors..."
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Type Filter */}
            <div className="relative w-full md:w-48">
              <select
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Stage Filter */}
            <div className="relative w-full md:w-48">
              <select
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
              >
                <option value="all">All Stages</option>
                {stages.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
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
                <option value="location">Sort by Location</option>
                <option value="type">Sort by Type</option>
                <option value="aum">Sort by AUM</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-center text-sm text-gray-600 whitespace-nowrap">
              {isLoading ? "Loading..." : `${filteredInvestors.length} results`}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Investors...</h3>
            <p className="text-gray-600">Discovering investment partners and funding opportunities</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">❌</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to Load Investors</h3>
            <p className="text-gray-600">Please try again later</p>
          </div>
        )}

        {/* Investors Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredInvestors.map((investor) => (
              <div key={investor.id} className="group bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                
                {/* Header */}
                <div className="relative p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      
                      {/* Logo Container */}
                      <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-sm border">
                        {investor.logo ? (
                          <img 
                            src={investor.logo} 
                            alt={`${investor.name} logo`}
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
                          className={`w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-xl ${investor.logo ? 'hidden' : 'flex'}`}
                        >
                          {investor.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      
                      <div>
                        {/* Investor Name */}
                        <h3 className="text-xl font-bold text-gray-900">{investor.name}</h3>
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-sm text-gray-600 font-medium">💰 Investor</span>
                        </div>
                        
                        {/* Type & Stage */}
                        <div className="flex items-center gap-2 mb-1">
                          {investor.type && (
                            <span className="text-xs text-blue-600 font-medium bg-blue-100 px-2 py-1 rounded-full">
                              {investor.type}
                            </span>
                          )}
                          {investor.stage && (
                            <span className="text-xs text-purple-600 font-medium bg-purple-100 px-2 py-1 rounded-full">
                              {investor.stage}
                            </span>
                          )}
                        </div>
                        
                        {/* Rating Display */}
                        {investor.rating && (
                          <div className="flex items-center gap-1">
                            {renderStars(Math.round(investor.rating))}
                            <span className="text-sm font-medium text-gray-600 ml-1">
                              {investor.rating.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Save Button */}
                    <button
                      onClick={() => toggleSave(investor.id)}
                      className={`p-2 rounded-lg shadow-sm hover:shadow-md transition-all ${
                        savedInvestors.includes(investor.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-gray-600 hover:text-red-500'
                      }`}
                    >
                      <span className="text-xl">
                        {savedInvestors.includes(investor.id) ? '❤️' : '🤍'}
                      </span>
                    </button>
                  </div>

                  {investor.address && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span>📍</span>
                      <span className="font-medium">{investor.address}</span>
                    </div>
                  )}

                  {investor.aum && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span>💵</span>
                      <span className="font-medium">AUM: {investor.aum}</span>
                    </div>
                  )}

                  {investor.ticketSize && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>🎫</span>
                      <span className="font-medium">Ticket: {investor.ticketSize}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{investor.description}</p>

                  {/* Investment Focus */}
                  {investor.investmentFocus && investor.investmentFocus.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span>🎯</span>
                        <div className="text-xs font-bold text-gray-600 uppercase tracking-wide">Investment Focus</div>
                      </div>
                      <div className="text-sm text-gray-700 font-medium">
                        {investor.investmentFocus.slice(0, 3).join(', ')}
                        {investor.investmentFocus.length > 3 && ` +${investor.investmentFocus.length - 3} more`}
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">
                        {investor.investmentFocus?.length || 0}
                      </div>
                      <div className="text-xs text-gray-600 font-semibold">Focus Areas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-500">
                        {investor.rating ? `${investor.rating.toFixed(1)}★` : 'N/A'}
                      </div>
                      <div className="text-xs text-gray-600 font-semibold">Rating</div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
                    View Investor Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredInvestors.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No investors found' : 'No investors available'}
            </h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search criteria' : 'Investors will appear here once added to the database'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}