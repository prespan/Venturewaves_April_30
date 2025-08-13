import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { prisma } from '@/lib/prisma';
import GovernmentDashboard from '@/components/dashboards/GovernmentDashboard';

export default function GovernmentDashboardPage({
  isAuthenticated,
  user,
  onLogin,
  onLogout
}: any) {
  const router = useRouter();
  const [government, setGovernment] = useState<{ id: number; name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating fetching a government (replace this with actual fetching logic)
    async function fetchGovernment() {
      try {
        const response = await fetch('/api/register/government');
        const data = await response.json();
        setGovernment(data);
      } catch (error) {
        console.error('Failed to load government:', error);
        // Set default data if API fails
        setGovernment({
          id: 41,
          name: 'Innovate UK'
        });
      } finally {
        setIsLoading(false);
      }
    }

    // Add a small delay to prevent flash, then fetch
    const timer = setTimeout(() => {
      fetchGovernment();
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

  // Show error state if no government data
  if (!government) {
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
    <GovernmentDashboard
      governmentId={government.id}
      organizationName={government.name}
      organizationId={government.id}
    />
  );
}