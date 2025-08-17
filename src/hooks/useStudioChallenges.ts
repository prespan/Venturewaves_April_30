// hooks/useStudioChallenges.ts (matches your pattern)
import { useState, useEffect } from 'react';

export function useStudioChallenges(studioId: number) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        console.log('🔍 Fetching challenges for studio ID:', studioId);
        setLoading(true);
        
        const url = `/api/studios/${studioId}/challenges`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch challenges: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result.challenges || []);
      } catch (err) {
        console.error('❌ Error fetching challenges:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    if (studioId) {
      fetchChallenges();
    } else {
      setLoading(false);
    }
  }, [studioId]);

  return { data, loading, error };
}
