// hooks/useStudioChallenges.ts
import { useState, useEffect } from 'react';

export function useStudioChallenges(studioId: number) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/studio/${studioId}/challenges`);
        if (!response.ok) {
          throw new Error('Failed to fetch studio challenges');
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

    if (studioId) {
      fetchChallenges();
    }
  }, [studioId]);

  return { data, loading, error };
}