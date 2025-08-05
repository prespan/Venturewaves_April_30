// hooks/useInvestorOpportunities.ts
import { useState, useEffect } from 'react';

export function useInvestorOpportunities(investorId: number) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/investor/${investorId}/opportunities`);
        if (!response.ok) {
          throw new Error('Failed to fetch investment opportunities');
        }
        const result = await response.json();
        setData(result.opportunities || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData([]); // Return empty array to fall back to demo data
      } finally {
        setLoading(false);
      }
    };

    if (investorId) {
      fetchOpportunities();
    }
  }, [investorId]);

  return { data, loading, error };
}