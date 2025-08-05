// src/hooks/useCorporates.js

import { useState, useEffect } from 'react';

export function useCorporates() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCorporates() {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/api/corporates');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const corporates = await response.json();
        setData(corporates);
        
      } catch (err) {
        console.error('Failed to fetch corporates:', err);
        setError(err);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCorporates();
  }, []);

  return { data, error, isLoading };
}