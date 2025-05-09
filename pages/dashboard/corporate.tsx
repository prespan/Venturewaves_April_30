'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CorporateDashboard from '@/components/dashboards/CorporateDashboard';

export default function CorporateDashboardPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [corporate, setCorporate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/dashboard/corporate?id=${id}`);
        const data = await res.json();
        setCorporate(data);
      } catch (err) {
        console.error('Failed to fetch corporate dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!corporate) return <p className="p-6 text-red-600">No data found</p>;

  return <CorporateDashboard corporate={corporate} />;
}
