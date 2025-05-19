'use client'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CorporateForm from '../../components/forms/CorporateForm'
// import GovernmentForm from '../../components/forms/GovernmentForm'
// import InvestorForm from '../../components/forms/InvestorForm'
// import ResearchForm from '../../components/forms/ResearchForm'
// import StudioForm from '../../components/forms/StudioForm'

export default function RegisterRole() {
  const router = useRouter()
  const { role } = router.query
  const [organization, setOrganization] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!role || typeof role !== 'string') return

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/register/${role}`)
        if (!res.ok) throw new Error('Failed to fetch organization')
        const data = await res.json()
        if (data) {
          setOrganization(data) // ✅ updated: data is a single object
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [role])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (organization?.id) {
      router.push(`/dashboard/${role}?id=${organization.id}`)
    }
  }

  if (loading) return <p className="p-8 text-center">Loading organization data...</p>
  if (!organization) return <p className="p-8 text-center text-red-500">Organization not found.</p>

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-6 capitalize">Register as {role}</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xl">
        {role === 'corporate' && <CorporateForm data={organization} />}
        {/* Add more role-based forms as needed */}
        {/* {role === 'government' && <GovernmentForm data={organization} />} */}
        {/* {role === 'investor' && <InvestorForm data={organization} />} */}
        {/* {role === 'research' && <ResearchForm data={organization} />} */}
        {/* {role === 'studio' && <StudioForm data={organization} />} */}
        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </main>
  )
}
