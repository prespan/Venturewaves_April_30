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
        const response = await fetch('/api/register/research');
        const data = await response.json();
        setResearch(data);
      } catch (error) {
        console.error('Failed to load research:', error);
        // Extract ID from URL to set appropriate default
        const urlParams = new URLSearchParams(window.location.search);
        const urlId = urlParams.get('id');
        const researchId = parseInt(urlId || '30');
        
        // Set default data - use Fraunhofer Institute as default for any research ID
        setResearch({
          id: researchId,
          name: 'Fraunhofer Institute'
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
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <ResearchDashboard
      researchId={research.id}
      organizationName={research.name}
      organizationId={research.id}
    />
  );
}