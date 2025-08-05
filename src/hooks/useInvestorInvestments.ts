// hooks/useInvestorInvestments.ts
import { useState, useEffect } from 'react';

export function useInvestorInvestments(investorId: number) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/investor/${investorId}/investments`);
        if (!response.ok) {
          throw new Error('Failed to fetch investor investments');
        }
        const result = await response.json();
        setData(result.investments || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData([]); // Return empty array to fall back to demo data
      } finally {
        setLoading(false);
      }
    };

    if (investorId) {
      fetchInvestments();
    }
  }, [investorId]);

  return { data, loading, error };
}