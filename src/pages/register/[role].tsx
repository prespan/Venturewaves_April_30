'use client'

import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import CorporateForm from '../../components/forms/CorporateForm'
import GovernmentForm from '../../components/forms/GovernmentForm'
import InvestorForm from '../../components/forms/InvestorForm'
import ResearchForm from '../../components/forms/ResearchForm'
import StudioForm from '../../components/forms/StudioForm'

export default function RegisterRole() {
  const router = useRouter()
  const { role } = router.query
  const [loading, setLoading] = useState(false)
  const [demoData, setDemoData] = useState(null)

  // Fetch demo data when component loads
  useEffect(() => {
    if (role && typeof role === 'string') {
      fetch(`/api/register/${role}`)
        .then(res => res.json())
        .then(data => setDemoData(data))
        .catch(err => console.error('Failed to load demo data:', err))
    }
  }, [role])

  const handleSubmit = async (formData: any) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/register/${role}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Registration failed')
      }

      const result = await response.json()
      
      // Redirect to dashboard after successful registration
      router.push(`/dashboard/${role}?id=${result.id}`)
    } catch (error) {
      console.error('Registration error:', error)
      alert('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!role || typeof role !== 'string') {
    return <p className="p-8 text-center">Loading...</p>
  }

  const roleDisplayNames = {
    corporate: 'Corporate',
    government: 'Government',
    investor: 'Investor',
    research: 'Research Organization',
    studio: 'Studio'
  }

  const displayName = roleDisplayNames[role as keyof typeof roleDisplayNames] || role

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-6">Register as {displayName}</h1>
      
      <div className="w-full max-w-xl">
        {role === 'corporate' && (
          <CorporateForm onSubmit={handleSubmit} loading={loading} demoData={demoData} />
        )}
        {role === 'government' && (
          <GovernmentForm onSubmit={handleSubmit} loading={loading} demoData={demoData} />
        )}
        {role === 'investor' && (
          <InvestorForm onSubmit={handleSubmit} loading={loading} demoData={demoData} />
        )}
        {role === 'research' && (
          <ResearchForm onSubmit={handleSubmit} loading={loading} demoData={demoData} />
        )}
        {role === 'studio' && (
          <StudioForm onSubmit={handleSubmit} loading={loading} demoData={demoData} />
        )}
        
        {!['corporate', 'government', 'investor', 'research', 'studio'].includes(role) && (
          <p className="text-center text-red-500">Invalid registration type</p>
        )}
      </div>
    </main>
  )
}