import useSWR from 'swr';

type Studio = {
  id: number;
  name: string;
  description: string;
  website?: string;
  // any other fields
};

export function useCorporatePartners(corporateId: number) {
  return useSWR<{ partners: Studio[] }>(
    corporateId ? `/api/corporates/${corporateId}/partners` : null,
    (url: string) =>
      fetch(url)
        .then((res) => res.json())
  );
}
