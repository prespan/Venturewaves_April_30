// hooks/useStudioPartners.ts
import { useState, useEffect } from 'react';

export function useStudioPartners(studioId: number) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/studio/${studioId}/partners`);
        if (!response.ok) {
          throw new Error('Failed to fetch studio partners');
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

    if (studioId) {
      fetchPartners();
    }
  }, [studioId]);

  return { data, loading, error };
}