// hooks/useInvestorChallenges.ts
import { useState, useEffect } from 'react';

export function useInvestorChallenges(investorId: number) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/investor/${investorId}/challenges`);
        if (!response.ok) {
          throw new Error('Failed to fetch investor challenges');
        }
        const result = await response.json();
        setData(result.challenges || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData([]); // Return empty array to fall back to demo data
      } finally {
        setLoading(false);
      }
    };

    if (investorId) {
      fetchChallenges();
    }
  }, [investorId]);

  return { data, loading, error };
}