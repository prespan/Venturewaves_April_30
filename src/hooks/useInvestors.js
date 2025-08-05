// src/hooks/useInvestors.js
import { useState, useEffect } from 'react';

export function useInvestors() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchInvestors() {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/api/investors');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const investors = await response.json();
        setData(investors);
        
      } catch (err) {
        console.error('Failed to fetch investors:', err);
        setError(err);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchInvestors();
  }, []);

  return { data, error, isLoading };
}