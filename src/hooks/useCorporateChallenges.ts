import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCorporateChallenges(corporateId: number) {
  return useSWR(corporateId ? `/api/corporates/${corporateId}/challenges` : null, fetcher);
}