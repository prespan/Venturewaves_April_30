import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { prisma } from '@/lib/prisma';
import StudioDashboard from '@/components/dashboards/StudioDashboard';

export default function StudioDashboardPage({
  isAuthenticated,
  user,
  onLogin,
  onLogout
}: any) {
  const router = useRouter();
  const [studio, setStudio] = useState<{ id: number; name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStudio() {
      try {
        const response = await fetch('/api/register/studio');
        const data = await response.json();
        setStudio(data);
      } catch (error) {
        console.error('Failed to load studio:', error);
        setStudio({
          id: 20,
          name: 'Antler'
        });
      } finally {
        setIsLoading(false);
      }
    }

    const timer = setTimeout(() => {
      fetchStudio();
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

  if (!studio) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-xl text-gray-600 mb-4">Unable to load dashboard</div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <StudioDashboard
      studioId={studio.id}
      organizationName={studio.name}
      organizationId={studio.id}
    />
  );
}
