// hooks/useInvestorPortfolio.ts
import { useState, useEffect } from 'react';

export function useInvestorPortfolio(investorId: number) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/investor/${investorId}/portfolio`);
        if (!response.ok) {
          throw new Error('Failed to fetch investor portfolio');
        }
        const result = await response.json();
        setData(result.portfolio || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData([]); // Return empty array to fall back to demo data
      } finally {
        setLoading(false);
      }
    };

    if (investorId) {
      fetchPortfolio();
    }
  }, [investorId]);

  return { data, loading, error };
}