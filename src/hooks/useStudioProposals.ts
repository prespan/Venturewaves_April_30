// hooks/useStudioProposals.ts (already created, keeping consistent)
import { useState, useEffect } from 'react';

export function useStudioProposals(studioId: number) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        console.log('🔍 Fetching proposals for studio ID:', studioId);
        setLoading(true);
        
        const url = `/api/studios/${studioId}/proposals`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch proposals: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result.proposals || []);
      } catch (err) {
        console.error('❌ Error fetching proposals:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    if (studioId) {
      fetchProposals();
    } else {
      setLoading(false);
    }
  }, [studioId]);

  return { data, loading, error };
}