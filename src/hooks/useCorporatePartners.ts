import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function useCorporatePartners(corporateId: number) {
  return useSWR(
    corporateId ? `/api/corporates/${corporateId}/partners` : null,
    fetcher
  );
}
