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
        console.log('🔍 Fetching challenges for corporate ID:', corporateId);
        setLoading(true);
        
        const url = `/api/corporates/${corporateId}/challenges`;
        console.log('🔍 Calling URL:', url);
        
        const response = await fetch(url);
        console.log('🔍 Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch challenges: ${response.status}`);
        }
        const result = await response.json();
        console.log('🔍 Response data:', result);
        
        setData(result.challenges || []);
      } catch (err) {
        console.error('❌ Error fetching challenges:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    console.log('🔍 useCorporateChallenges hook called with corporateId:', corporateId);
    if (corporateId) {
      fetchChallenges();
    } else {
      console.log('🔍 No corporateId provided, skipping fetch');
      setLoading(false);
    }
  }, [corporateId]);

  console.log('🔍 Hook returning - data length:', data.length, 'loading:', loading, 'error:', error);

  return { data, loading, error };
}