// src/hooks/useResearchOrganizations.js

import { useState, useEffect } from 'react';

export function useResearchOrganizations() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchResearchOrganizations() {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/api/research-organizations');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const organizations = await response.json();
        setData(organizations);
        
      } catch (err) {
        console.error('Failed to fetch research organizations:', err);
        setError(err);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchResearchOrganizations();
  }, []);

  return { data, error, isLoading };
}