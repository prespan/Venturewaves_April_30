// hooks/useGovernmentProjects.ts
import { useState, useEffect } from 'react';

export function useGovernmentProjects(governmentId: number) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/government/${governmentId}/projects`);
        if (!response.ok) {
          throw new Error('Failed to fetch government projects');
        }
        const result = await response.json();
        setData(result.projects || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData([]); // Return empty array to fall back to demo data
      } finally {
        setLoading(false);
      }
    };

    if (governmentId) {
      fetchProjects();
    }
  }, [governmentId]);

  return { data, loading, error };
}