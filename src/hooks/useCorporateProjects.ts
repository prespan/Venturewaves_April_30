import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCorporateProjects(corporateId: number) {
  return useSWR(corporateId ? `/api/corporates/${corporateId}/projects` : null, fetcher);
}