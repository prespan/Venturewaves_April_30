// hooks/useGovernmentPartners.ts
import { useState, useEffect } from 'react';
export function useGovernmentPartners(governmentId: number) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/government/${governmentId}/partners`);
        if (!response.ok) {
          throw new Error('Failed to fetch government partners');
        }
        const result = await response.json();
        setData(result.partners || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData([]); // Return empty array to fall back to demo data
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