import useSWR from 'swr';

type Challenge = {
  id: number;
  title: string;
  description: string;
  // ... other fields
};

export function useCorporateChallenges(corporateId: number) {
  return useSWR<Challenge[]>(
    corporateId ? `/api/corporates/${corporateId}/challenges` : null,
    (url: string) =>
      fetch(url)
        .then((res) => res.json())
        .then((data) => data.challenges)
  );
}