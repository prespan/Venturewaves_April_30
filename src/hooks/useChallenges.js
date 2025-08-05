// src/hooks/useChallenges.js
import { useState, useEffect } from 'react';

export function useChallenges() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchChallenges() {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/api/challenges');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const challenges = await response.json();
        setData(challenges);
        
      } catch (err) {
        console.error('Failed to fetch challenges:', err);
        setError(err);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchChallenges();
  }, []);

  return { data, error, isLoading };
}