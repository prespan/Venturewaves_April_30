import { useState } from "react";
import { useStudios } from "@/hooks/useStudios";

type Studio = {
  id: number;
  name: string;
  description: string;
  address?: string;
  logo?: string;
  keyStartups?: string[];
  rating?: number;
};

export default function Studios() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [savedStudios, setSavedStudios] = useState<number[]>([]);
  
  const { data: studios, error, isLoading } = useStudios();
  const studiosToDisplay = studios || [];

  const filteredStudios = studiosToDisplay
    .filter(studio => {
      const matchesSearch = studio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          studio.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (studio.address && studio.address.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesRating = ratingFilter === "all" || 
                           (ratingFilter === "4+" && (studio.rating || 0) >= 4) ||
                           (ratingFilter === "3+" && (studio.rating || 0) >= 3) ||
                           (ratingFilter === "saved" && savedStudios.includes(studio.id));
      
      return matchesSearch && matchesRating;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "location":
          return (a.address || "").localeCompare(b.address || "");
        case "startups":
          return (b.keyStartups?.length || 0) - (a.keyStartups?.length || 0);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

  const toggleSave = (studioId: number) => {
    setSavedStudios(prev => 
      prev.includes(studioId) 
        ? prev.filter(id => id !== studioId)
        : [...prev, studioId]
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Studios Directory</h1>
          <p className="text-gray-600 text-lg">Discover startup studios and venture builders</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Search */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search studios..."
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
                <option value="startups">Sort by Startups Count</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-center text-sm text-gray-600 whitespace-nowrap">
              {isLoading ? "Loading..." : `${filteredStudios.length} results`}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <span className="text-2xl">🏢</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Studios...</h3>
            <p className="text-gray-600">Discovering amazing startup studios worldwide</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">❌</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to Load Studios</h3>
            <p className="text-gray-600">Please try again later</p>
          </div>
        )}

        {/* Studios Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredStudios.map((studio) => (
              <div key={studio.id} className="group bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                
                {/* Header */}
                <div className="relative p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      
                      {/* LARGER LOGO CONTAINER - 20x20 instead of 16x16 */}
                      <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-sm border">
                        {studio.logo ? (
                          <img 
                            src={studio.logo} 
                            alt={`${studio.name} logo`}
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
                          className={`w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-xl ${studio.logo ? 'hidden' : 'flex'}`}
                        >
                          {studio.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      
                      <div>
                        {/* BOLD STUDIO NAME */}
                        <h3 className="text-xl font-bold text-gray-900">{studio.name}</h3>
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-sm text-gray-600 font-medium">🏢 Startup Studio</span>
                        </div>
                        
                        {/* RATING DISPLAY */}
                        {studio.rating && (
                          <div className="flex items-center gap-1">
                            {renderStars(Math.round(studio.rating))}
                            <span className="text-sm font-medium text-gray-600 ml-1">
                              {studio.rating.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* SAVE BUTTON */}
                    <button
                      onClick={() => toggleSave(studio.id)}
                      className={`p-2 rounded-lg shadow-sm hover:shadow-md transition-all ${
                        savedStudios.includes(studio.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-gray-600 hover:text-red-500'
                      }`}
                    >
                      <span className="text-xl">
                        {savedStudios.includes(studio.id) ? '❤️' : '🤍'}
                      </span>
                    </button>
                  </div>

                  {studio.address && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span>📍</span>
                      <span className="font-medium">{studio.address}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{studio.description}</p>

                  {/* Key Startups */}
                  {studio.keyStartups && studio.keyStartups.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span>🚀</span>
                        <div className="text-xs font-bold text-gray-600 uppercase tracking-wide">Key Startups</div>
                      </div>
                      <div className="text-sm text-gray-700 font-medium">
                        {studio.keyStartups.slice(0, 3).join(', ')}
                        {studio.keyStartups.length > 3 && ` +${studio.keyStartups.length - 3} more`}
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">
                        {studio.keyStartups?.length || 0}
                      </div>
                      <div className="text-xs text-gray-600 font-semibold">Startups Built</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-500">
                        {studio.rating ? `${studio.rating.toFixed(1)}★` : 'N/A'}
                      </div>
                      <div className="text-xs text-gray-600 font-semibold">Rating</div>
                    </div>
                  </div>

                  {/* INDIGO ACTION BUTTON */}
                  <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
                    View Studio Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredStudios.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No studios found' : 'No studios available'}
            </h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search criteria' : 'Studios will appear here once added to the database'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}