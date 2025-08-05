import { useState } from "react";
import { useGovernments } from "@/hooks/useGovernments";

type Government = {
  id: number;
  name: string;
  description: string;
  address?: string;
  logo?: string;
  keyServices?: string[];
  rating?: number;
  department?: string;
  jurisdiction?: string;
};

export default function GovernmentsDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [savedOrganizations, setSavedOrganizations] = useState<number[]>([]);
  
  const { data: organizations, error, isLoading } = useGovernments();
  const organizationsToDisplay = organizations || [];

  const filteredOrganizations = organizationsToDisplay
    .filter(organization => {
      const matchesSearch = organization.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          organization.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (organization.address && organization.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (organization.department && organization.department.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesRating = ratingFilter === "all" || 
                           (ratingFilter === "4+" && (organization.rating || 0) >= 4) ||
                           (ratingFilter === "3+" && (organization.rating || 0) >= 3) ||
                           (ratingFilter === "saved" && savedOrganizations.includes(organization.id));

      const matchesDepartment = departmentFilter === "all" ||
                               (organization.department && organization.department === departmentFilter);
      
      return matchesSearch && matchesRating && matchesDepartment;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "location":
          return (a.address || "").localeCompare(b.address || "");
        case "department":
          return (a.department || "").localeCompare(b.department || "");
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

  const toggleSave = (organizationId: number) => {
    setSavedOrganizations(prev => 
      prev.includes(organizationId) 
        ? prev.filter(id => id !== organizationId)
        : [...prev, organizationId]
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

  // Get unique departments for filter
  const departments = Array.from(new Set(organizationsToDisplay.map(org => org.department).filter(Boolean)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 -mx-16 -my-16 px-16 py-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Governments Directory</h1>
          <p className="text-gray-600 text-lg">Explore government agencies, departments, and public institutions worldwide</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Search */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search governments..."
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Department Filter */}
            <div className="relative w-full md:w-48">
              <select
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
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
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="rating">Sort by Rating</option>
                <option value="location">Sort by Location</option>
                <option value="department">Sort by Department</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-center text-sm text-gray-600 whitespace-nowrap">
              {isLoading ? "Loading..." : `${filteredOrganizations.length} results`}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <span className="text-2xl">🏛️</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Governments...</h3>
            <p className="text-gray-600">Discovering public institutions and agencies</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">❌</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to Load Governments</h3>
            <p className="text-gray-600">Please try again later</p>
          </div>
        )}

        {/* Organizations Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredOrganizations.map((organization) => (
              <div key={organization.id} className="group bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                
                {/* Header */}
                <div className="relative p-6 bg-gradient-to-r from-green-50 to-emerald-50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      
                      {/* Logo Container */}
                      <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-sm border">
                        {organization.logo ? (
                          <img 
                            src={organization.logo} 
                            alt={`${organization.name} logo`}
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
                          className={`w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-xl ${organization.logo ? 'hidden' : 'flex'}`}
                        >
                          {organization.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      
                      <div>
                        {/* Organization Name */}
                        <h3 className="text-xl font-bold text-gray-900">{organization.name}</h3>
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-sm text-gray-600 font-medium">🏛️ Government Agency</span>
                        </div>
                        
                        {/* Department */}
                        {organization.department && (
                          <div className="flex items-center gap-1 mb-1">
                            <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full">
                              {organization.department}
                            </span>
                          </div>
                        )}
                        
                        {/* Rating Display */}
                        {organization.rating && (
                          <div className="flex items-center gap-1">
                            {renderStars(Math.round(organization.rating))}
                            <span className="text-sm font-medium text-gray-600 ml-1">
                              {organization.rating.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Save Button */}
                    <button
                      onClick={() => toggleSave(organization.id)}
                      className={`p-2 rounded-lg shadow-sm hover:shadow-md transition-all ${
                        savedOrganizations.includes(organization.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-gray-600 hover:text-red-500'
                      }`}
                    >
                      <span className="text-xl">
                        {savedOrganizations.includes(organization.id) ? '❤️' : '🤍'}
                      </span>
                    </button>
                  </div>

                  {organization.address && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span>📍</span>
                      <span className="font-medium">{organization.address}</span>
                    </div>
                  )}

                  {organization.jurisdiction && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>⚖️</span>
                      <span className="font-medium">{organization.jurisdiction}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{organization.description}</p>

                  {/* Key Services */}
                  {organization.keyServices && organization.keyServices.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span>🔧</span>
                        <div className="text-xs font-bold text-gray-600 uppercase tracking-wide">Key Services</div>
                      </div>
                      <div className="text-sm text-gray-700 font-medium">
                        {organization.keyServices.slice(0, 3).join(', ')}
                        {organization.keyServices.length > 3 && ` +${organization.keyServices.length - 3} more`}
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">
                        {organization.keyServices?.length || 0}
                      </div>
                      <div className="text-xs text-gray-600 font-semibold">Services</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-500">
                        {organization.rating ? `${organization.rating.toFixed(1)}★` : 'N/A'}
                      </div>
                      <div className="text-xs text-gray-600 font-semibold">Rating</div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg">
                    View Agency Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredOrganizations.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No governments found' : 'No governments available'}
            </h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search criteria' : 'Governments will appear here once added to the database'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}