// hooks/useGovernmentPartners.ts
import { useState, useEffect } from 'react';

export function useGovernmentPartners(governmentId: number) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/governments/${governmentId}/partners`);
        if (!response.ok) {
          throw new Error('Failed to fetch government partners');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (governmentId) {
      fetchPartners();
    }
  }, [governmentId]);

  return { data, loading, error };
}