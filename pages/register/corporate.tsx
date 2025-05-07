// pages/register/corporate.tsx
import dynamic from 'next/dynamic'

// This is the dynamically imported form
const CorporateForm = dynamic(() => import('@/components/forms/CorporateForm'), { ssr: false })

const CorporateRegistrationPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-6">Register as Corporate</h1>
      <CorporateForm />
    </main>
  )
}

export default CorporateRegistrationPage
