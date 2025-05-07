'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

interface CorporateData {
  name?: string
  website?: string
  address?: string
  industryTags?: string
  description?: string
  notableProducts?: string
  logo?: string
}

interface CorporateFormProps {
  corporate?: CorporateData
  mode?: 'demo' | 'live' // toggle mode
}

export default function CorporateForm({ corporate, mode = 'live' }: CorporateFormProps) {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: corporate?.name || '',
    website: corporate?.website || '',
    address: corporate?.address || '',
    industryTags: corporate?.industryTags || '',
    description: corporate?.description || '',
    notableProducts: corporate?.notableProducts || '',
    logo: corporate?.logo || '',
  })

  useEffect(() => {
    console.log('CorporateForm mounted')
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === 'demo') {
      alert('This is demo mode — data will not be submitted.')
      return
    }

    try {
      const res = await fetch('/api/register/corporate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        alert('Registered successfully')
        router.push('/dashboard/corporate')
      } else {
        alert('Submission failed')
      }
    } catch (err) {
      console.error(err)
      alert('An error occurred')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
      <input
        name="name"
        placeholder="Company Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="website"
        placeholder="Website"
        value={formData.website}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <textarea
        name="industryTags"
        placeholder='Industry Tags (e.g. ["Aerospace"])'
        value={formData.industryTags}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <textarea
        name="notableProducts"
        placeholder='Notable Products (e.g. ["JetX"])'
        value={formData.notableProducts}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="logo"
        placeholder="Logo URL"
        value={formData.logo}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={mode === 'demo'}
      >
        {mode === 'demo' ? 'Demo Mode – Disabled' : 'Register'}
      </button>
    </form>
  )
}
