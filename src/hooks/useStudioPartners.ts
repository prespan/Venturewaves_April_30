// hooks/useStudioPartners.ts (matches your pattern)
import { useState, useEffect } from 'react';

export function useStudioPartners(studioId: number) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        console.log('🔍 Fetching partners for studio ID:', studioId);
        setLoading(true);
        
        const url = `/api/studios/${studioId}/partners`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch partners: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result.partners || []);
      } catch (err) {
        console.error('❌ Error fetching partners:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    if (studioId) {
      fetchPartners();
    } else {
      setLoading(false);
    }
  }, [studioId]);

  return { data, loading, error };
}