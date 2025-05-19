import useSWR from 'swr';

type Project = {
  id: number;
  title: string;
  // ... other fields
};

export function useCorporateProjects(corporateId: number) {
  return useSWR<Project[]>(
    corporateId ? `/api/corporates/${corporateId}/projects` : null,
    (url: string) =>
      fetch(url)
        .then((res) => res.json())
        .then((data) => data.projects) // ✅ extract correct key
  );
}