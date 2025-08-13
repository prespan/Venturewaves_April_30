import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { prisma } from '@/lib/prisma';
import CorporateDashboard from '@/components/dashboards/CorporateDashboard';

export default function CorporateDashboardPage({
  isAuthenticated,
  user,
  onLogin,
  onLogout
}: any) {
  const router = useRouter();
  const [corporate, setCorporate] = useState<{ id: number; name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating fetching a corporate (replace this with actual fetching logic)
    async function fetchCorporate() {
      try {
        const response = await fetch('/api/register/corporate');
        const data = await response.json();
        setCorporate(data);
      } catch (error) {
        console.error('Failed to load corporate:', error);
        // Set default data if API fails
        setCorporate({
          id: 76,
          name: 'Siemens'
        });
      } finally {
        setIsLoading(false);
      }
    }

    // Add a small delay to prevent flash, then fetch
    const timer = setTimeout(() => {
      fetchCorporate();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Show loading state
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

  // Show error state if no corporate data
  if (!corporate) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-xl text-gray-600 mb-4">Unable to load dashboard</div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <CorporateDashboard
      corporateId={corporate.id}
      organizationName={corporate.name}
      organizationId={corporate.id}
    />
  );
}