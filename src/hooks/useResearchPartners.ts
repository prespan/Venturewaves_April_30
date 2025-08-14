// hooks/useResearchPartners.ts
import { useState, useEffect } from 'react';

export function useResearchPartners(researchOrgId: number) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        // Fixed URL to match your API route structure
        const response = await fetch(`/api/research-organizations/${researchOrgId}/partners`);
        if (!response.ok) {
          throw new Error('Failed to fetch research partners');
        }
        const result = await response.json();
        setData(result.partners || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData([]); // Return empty array on error
      } finally {
        setLoading(false);
      }
    };

    if (researchOrgId) {
      fetchPartners();
    }
  }, [researchOrgId]);

  return { data, loading, error };
}