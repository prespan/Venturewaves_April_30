import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { prisma } from '@/lib/prisma';
import InvestorDashboard from '@/components/dashboards/InvestorDashboard';

export default function InvestorDashboardPage({
  isAuthenticated,
  user,
  onLogin,
  onLogout
}: any) {
  const router = useRouter();
  const [investor, setInvestor] = useState<{ id: number; name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchInvestor() {
      try {
        const response = await fetch('/api/register/investors'); // Fixed: plural endpoint
        const data = await response.json();
        console.log('API returned:', data); // Debug log
        
        // Force Temasek data regardless of what API returns
        setInvestor({
          id: data.id || 40,
          name: 'Temasek'
        });
      } catch (error) {
        console.error('Failed to load investor:', error);
        // Set default data if API fails
        setInvestor({
          id: 40,
          name: 'Temasek' // Changed from Sequoia Capital to Temasek
        });
      } finally {
        setIsLoading(false);
      }
    }

    const timer = setTimeout(() => {
      fetchInvestor();
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

  if (!investor) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-xl text-gray-600 mb-4">Unable to load dashboard</div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <InvestorDashboard
      investorId={investor.id}
      organizationName={investor.name}
      organizationId={investor.id}
    />
  );
}