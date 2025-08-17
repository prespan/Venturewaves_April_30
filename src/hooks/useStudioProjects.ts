// hooks/useStudioProjects.ts (already created, keeping consistent)
import { useState, useEffect } from 'react';

export function useStudioProjects(studioId: number) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('🔍 Fetching projects for studio ID:', studioId);
        setLoading(true);
        
        const url = `/api/studios/${studioId}/projects`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result.projects || []);
      } catch (err) {
        console.error('❌ Error fetching projects:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    if (studioId) {
      fetchProjects();
    } else {
      setLoading(false);
    }
  }, [studioId]);

  return { data, loading, error };
}