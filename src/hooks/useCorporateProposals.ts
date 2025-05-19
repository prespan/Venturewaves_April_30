import useSWR from 'swr';

type Proposal = {
  id: number;
  title: string;
  // Add other expected fields here
};

export function useCorporateProposals(corporateId: number) {
  return useSWR<Proposal[]>(
    corporateId ? `/api/corporates/${corporateId}/proposals` : null,
    (url: string) =>
      fetch(url)
        .then((res) => res.json())
        .then((data) => data.proposals) // ✅ Fix: extract proposals
  );
}
