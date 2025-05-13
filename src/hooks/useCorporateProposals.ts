import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCorporateProposals(corporateId: number) {
  return useSWR(corporateId ? `/api/corporates/${corporateId}/proposals` : null, fetcher);
}