'use client'

import { useRouter } from 'next/router'
import { useState } from 'react'

const logos = [
  'catapult.png',
  'innovateuk.png',
  'amrc.png',
  'cpi.png',
  'temasek.png',
  'bcgdv.png',
  'fraunhofer.png',
  'antler.png',
  'byld.png',
  'coplex.png',
  'boomerang.png',
]

export default function Home() {
  const router = useRouter()
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(false)

  const handleStart = async () => {
    if (!role) return
    setLoading(true)

    try {
      const res = await fetch(`/api/register/${role}`)
      const org = await res.json()

      console.log('Fetched data from API:', org)

      if (!res.ok || !org || !org.name) {
        alert(`No ${role} organization found or invalid data`)
        return
      }

      router.push(`/register/${role}?name=${encodeURIComponent(org.name)}`)
    } catch (err) {
      console.error('Fetch failed:', err)
      alert('Failed to fetch organization')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center px-6 py-16 space-y-16">
      <div className="text-center max-w-3xl space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          Co-Build the Future of Innovation
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
          Where Corporates, Governments & Studios tackle real-world problems and scale ventures.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <select
          value={role}
          onChange={(e) => setRole(e.target
