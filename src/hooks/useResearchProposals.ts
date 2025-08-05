// hooks/useResearchProposals.ts
import { useState, useEffect } from 'react';

export function useResearchProposals(researchOrgId: number) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/research/${researchOrgId}/proposals`);
        if (!response.ok) {
          throw new Error('Failed to fetch research proposals');
        }
        const result = await response.json();
        setData(result.proposals || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData([]); // Return empty array to fall back to demo data
      } finally {
        setLoading(false);
      }
    };

    if (researchOrgId) {
      fetchProposals();
    }
  }, [researchOrgId]);

  return { data, loading, error };
}