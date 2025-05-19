'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [role, setRole] = useState('')
  const router = useRouter()

  const handleStart = () => {
    if (!role) return
    router.push(`/register/${role}`)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-6">Select Your Role</h1>
      <select
        className="border p-2 mb-4"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="">Select a role</option>
        <option value="corporate">Corporate</option>
        <option value="government">Government</option>
        <option value="ngo">NGO</option>
        {/* Add more roles here */}
      </select>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded"
        onClick={handleStart}
      >
        Start Registration
      </button>
    </main>
  )
}
