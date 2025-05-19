import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  });

export function useCorporatePartners(corporateId: number) {
  return useSWR(
    corporateId ? `/api/corporates/${corporateId}/partners` : null,
    fetcher
  );
}