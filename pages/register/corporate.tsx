'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import CorporateForm from '../../components/forms/CorporateForm'

export default function CorporateRegistrationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orgName = searchParams.get('name') // e.g., ?name=Siemens

  type Corporate = {
  id: number
  name: string
  website: string
  address: string
  industryTags: string[]
  description: string
  notableProducts: string[]
  logo?: string
}
const [existingCorporate, setExistingCorporate] = useState<Corporate | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!orgName) return

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/preload/corporate?name=${encodeURIComponent(orgName)}`)
        const data = await res.json()
        setExistingCorporate(data)
      } catch (err) {
        console.error('Failed to fetch org:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [orgName])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (existingCorporate?.id) {
      router.push(`/dashboard/corporate?id=${existingCorporate.id}`)
    }
  }

  if (loading) return <p className="text-center p-8">Loading organization data...</p>
  if (!existingCorporate) return <p className="text-center p-8 text-red-500">Organization not found.</p>

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-6">Register as Corporate</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xl">
        <CorporateForm data={existingCorporate} />
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
