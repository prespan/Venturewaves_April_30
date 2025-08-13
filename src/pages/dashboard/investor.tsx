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
        const response = await fetch('/api/register/investor');
        const data = await response.json();
        setInvestor(data);
      } catch (error) {
        console.error('Failed to load investor:', error);
        // Extract ID from URL to set appropriate default  
        const urlParams = new URLSearchParams(window.location.search);
        const urlId = urlParams.get('id');
        const investorId = parseInt(urlId || '40');
        
        // Set name based on ID to match _app.tsx logic
        let investorName = 'Sequoia Capital';
        if (investorId === 16 || investorId === 20) {
          investorName = 'Temasek';
        }
        
        setInvestor({
          id: investorId,
          name: investorName
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