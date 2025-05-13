import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { prisma } from '@/lib/prisma';
import CorporateDashboard from '@/components/dashboards/CorporateDashboard';

export default function CorporateDashboardPage() {
  const router = useRouter();
  const [corporate, setCorporate] = useState<{ id: number; name: string } | null>(null);

  useEffect(() => {
    // Simulating fetching a corporate (replace this with actual fetching logic)
    async function fetchCorporate() {
      try {
        const response = await fetch('/api/register/corporate');
        const data = await response.json();
        setCorporate(data);
      } catch (error) {
        console.error('Failed to load corporate:', error);
      }
    }

    fetchCorporate();
  }, []);

  if (!corporate) return <p className="p-6 text-red-600">No data found</p>;

  return (
    <CorporateDashboard
      corporateId={corporate.id}
      organizationName={corporate.name}
    />
  );
}