// src/hooks/useGovernments.js
import { useState, useEffect } from 'react';

export function useGovernments() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchGovernmentOrganizations() {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/api/governments');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const organizations = await response.json();
        setData(organizations);
        
      } catch (err) {
        console.error('Failed to fetch governments:', err);
        setError(err);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGovernmentOrganizations();
  }, []);

  return { data, error, isLoading };
}