// src/pages/studio/proposal/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues
const StudioManageProposal = dynamic(() => import('../../../components/StudioManageProposal'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading proposal component...</p>
      </div>
    </div>
  )
});

export default function StudioProposalPage() {
  const router = useRouter();
  const { id } = router.query;
  const [studioId, setStudioId] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get studioId from localStorage, session, or context
    if (typeof window !== 'undefined') {
      const storedStudioId = localStorage.getItem('studioId') || '2'; // Fallback to studio ID 2
      setStudioId(parseInt(storedStudioId));
    }
  }, []);

  // Prevent hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing...</p>
        </div>
      </div>
    );
  }

  if (!id || !studioId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading proposal...</p>
          <p className="text-sm text-gray-500 mt-2">ID: {id}, Studio: {studioId}</p>
        </div>
      </div>
    );
  }

  return (
    <StudioManageProposal 
      proposalId={parseInt(id as string)} 
      studioId={studioId} 
    />
  );
}