// hooks/useCorporateChallenges.ts
import { useState, useEffect } from 'react';
import { Challenge } from '@/types/prisma';

export function useCorporateChallenges(corporateId: number) {
  const [data, setData] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/corporate/${corporateId}/challenges`);
        if (!response.ok) {
          throw new Error('Failed to fetch challenges');
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

    if (corporateId) {
      fetchChallenges();
    }
  }, [corporateId]);

  return { data, loading, error };
}