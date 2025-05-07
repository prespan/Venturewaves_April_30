// pages/register/corporate.tsx
'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Dynamically import CorporateForm client-only
const CorporateForm = dynamic(() => import('@/components/forms/CorporateForm'), {
  ssr: false,
  loading: () => <p>Loading form...</p>,
})

export default function CorporateRegistrationPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-6">Register as Corporate</h1>
      <Suspense fallback={<p>Loading form...</p>}>
        <CorporateForm />
      </Suspense>
    </main>
  )
}
