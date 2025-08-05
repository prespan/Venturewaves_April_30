// hooks/useGovernmentProposals.ts
import { useState, useEffect } from 'react';

export function useGovernmentProposals(governmentId: number) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/government/${governmentId}/proposals`);
        if (!response.ok) {
          throw new Error('Failed to fetch government proposals');
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

    if (governmentId) {
      fetchProposals();
    }
  }, [governmentId]);

  return { data, loading, error };
}