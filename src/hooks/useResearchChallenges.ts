// hooks/useResearchChallenges.ts
import { useState, useEffect } from 'react';

export function useResearchChallenges(researchOrgId: number) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/research/${researchOrgId}/challenges`);
        if (!response.ok) {
          throw new Error('Failed to fetch research challenges');
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

    if (researchOrgId) {
      fetchChallenges();
    }
  }, [researchOrgId]);

  return { data, loading, error };
}