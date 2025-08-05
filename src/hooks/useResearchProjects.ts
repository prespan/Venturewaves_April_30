// hooks/useResearchProjects.ts
import { useState, useEffect } from 'react';

export function useResearchProjects(researchOrgId: number) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/research/${researchOrgId}/projects`);
        if (!response.ok) {
          throw new Error('Failed to fetch research projects');
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

    if (researchOrgId) {
      fetchProjects();
    }
  }, [researchOrgId]);

  return { data, loading, error };
}