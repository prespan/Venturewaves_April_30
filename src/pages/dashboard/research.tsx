import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { prisma } from '@/lib/prisma';
import ResearchDashboard from '@/components/dashboards/ResearchDashboard';

export default function ResearchDashboardPage({
  isAuthenticated,
  user,
  onLogin,
  onLogout
}: any) {
  const router = useRouter();
  const [research, setResearch] = useState<{ id: number; name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchResearch() {
      try {
        // Get the research org ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const urlId = urlParams.get('id');
        
        if (urlId) {
          // Fetch the specific research organization by ID
          const response = await fetch(`/api/research-organizations/${urlId}`);
          if (response.ok) {
            const data = await response.json();
            setResearch(data);
            return;
          }
        }
        
        // Fallback: try the general register endpoint
        const response = await fetch('/api/register/research-organization');
        const data = await response.json();
        setResearch(data);
      } catch (error) {
        console.error('Failed to load research organization:', error);
        // Extract ID from URL for error case
        const urlParams = new URLSearchParams(window.location.search);
        const urlId = urlParams.get('id');
        const researchId = parseInt(urlId || '6');
        
        // Set fallback data without hardcoding a specific name
        setResearch({
          id: researchId,
          name: 'Research Organization'
        });
      } finally {
        setIsLoading(false);
      }
    }

    const timer = setTimeout(() => {
      fetchResearch();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">🚀 Venturewaves</div>
          <div className="text-gray-600">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (!research) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-xl text-gray-600 mb-4">Unable to load dashboard</div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <ResearchDashboard
      researchOrgId={research.id}
      organizationName={research.name}
      organizationId={research.id}
    />
  );
}