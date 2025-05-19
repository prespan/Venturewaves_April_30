import useSWR from 'swr';

type Proposal = {
  id: number;
  title: string;
  status: string;
  challenge?: {
    title: string;
  };
  Studio?: {
    name: string;
  };
  // Add any other expected fields here
};

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => data.proposals); // ✅ extract the nested "proposals" array

export function useCorporateProposals(corporateId: number) {
  return useSWR<Proposal[]>(
    corporateId ? `/api/corporates/${corporateId}/proposals` : null,
    fetcher
  );
}
