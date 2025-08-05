import { useState } from "react";
import { useCorporates } from "@/hooks/useCorporates";

type Corporate = {
  id: number;
  name: string;
  description: string;
  address?: string;
  logo?: string;
  keyProducts?: string[];
  rating?: number;
};

export default function CorporatesDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [savedCorporates, setSavedCorporates] = useState<number[]>([]);
  
  const { data: corporates, error, isLoading } = useCorporates();
  const corporatesToDisplay = corporates || [];

  const filteredCorporates = corporatesToDisplay
    .filter(corporate => {
      const matchesSearch = corporate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          corporate.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (corporate.address && corporate.address.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesRating = ratingFilter === "all" || 
                           (ratingFilter === "4+" && (corporate.rating || 0) >= 4) ||
                           (ratingFilter === "3+" && (corporate.rating || 0) >= 3) ||
                           (ratingFilter === "saved" && savedCorporates.includes(corporate.id));
      
      return matchesSearch && matchesRating;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "location":
          return (a.address || "").localeCompare(b.address || "");
        case "products":
          return (b.keyProducts?.length || 0) - (a.keyProducts?.length || 0);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

  const toggleSave = (corporateId: number) => {
    setSavedCorporates(prev => 
      prev.includes(corporateId) 
        ? prev.filter(id => id !== corporateId)
        : [...prev, corporateId]
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 -mx-16 -my-16 px-16 py-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Corporates Directory</h1>
          <p className="text-gray-600 text-lg">Discover corporate innovation and venture partners</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Search */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search corporates..."
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
                <option value="products">Sort by Products Count</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-center text-sm text-gray-600 whitespace-nowrap">
              {isLoading ? "Loading..." : `${filteredCorporates.length} results`}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <span className="text-2xl">🏢</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Corporates...</h3>
            <p className="text-gray-600">Discovering amazing corporate partners worldwide</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">❌</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to Load Corporates</h3>
            <p className="text-gray-600">Please try again later</p>
          </div>
        )}

        {/* Corporates Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCorporates.map((corporate) => (
              <div key={corporate.id} className="group bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                
                {/* Header */}
                <div className="relative p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      
                      {/* LARGER LOGO CONTAINER - 20x20 instead of 16x16 */}
                      <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-sm border">
                        {corporate.logo ? (
                          <img 
                            src={corporate.logo} 
                            alt={`${corporate.name} logo`}
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
                          className={`w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-xl ${corporate.logo ? 'hidden' : 'flex'}`}
                        >
                          {corporate.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      
                      <div>
                        {/* BOLD CORPORATE NAME */}
                        <h3 className="text-xl font-bold text-gray-900">{corporate.name}</h3>
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-sm text-gray-600 font-medium">🏢 Corporate</span>
                        </div>
                        
                        {/* RATING DISPLAY */}
                        {corporate.rating && (
                          <div className="flex items-center gap-1">
                            {renderStars(Math.round(corporate.rating))}
                            <span className="text-sm font-medium text-gray-600 ml-1">
                              {corporate.rating.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* SAVE BUTTON */}
                    <button
                      onClick={() => toggleSave(corporate.id)}
                      className={`p-2 rounded-lg shadow-sm hover:shadow-md transition-all ${
                        savedCorporates.includes(corporate.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-gray-600 hover:text-red-500'
                      }`}
                    >
                      <span className="text-xl">
                        {savedCorporates.includes(corporate.id) ? '❤️' : '🤍'}
                      </span>
                    </button>
                  </div>

                  {corporate.address && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span>📍</span>
                      <span className="font-medium">{corporate.address}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{corporate.description}</p>

                  {/* Key Products */}
                  {corporate.keyProducts && corporate.keyProducts.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span>🚀</span>
                        <div className="text-xs font-bold text-gray-600 uppercase tracking-wide">Key Products</div>
                      </div>
                      <div className="text-sm text-gray-700 font-medium">
                        {corporate.keyProducts.slice(0, 3).join(', ')}
                        {corporate.keyProducts.length > 3 && ` +${corporate.keyProducts.length - 3} more`}
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">
                        {corporate.keyProducts?.length || 0}
                      </div>
                      <div className="text-xs text-gray-600 font-semibold">Products</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-500">
                        {corporate.rating ? `${corporate.rating.toFixed(1)}★` : 'N/A'}
                      </div>
                      <div className="text-xs text-gray-600 font-semibold">Rating</div>
                    </div>
                  </div>

                  {/* INDIGO ACTION BUTTON */}
                  <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
                    View Corporate Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredCorporates.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No corporates found' : 'No corporates available'}
            </h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search criteria' : 'Corporates will appear here once added to the database'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}