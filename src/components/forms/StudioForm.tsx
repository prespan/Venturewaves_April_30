'use client'

import { useState, useEffect } from 'react'

type Props = {
  onSubmit: (data: any) => void
  loading: boolean
  demoData?: any
}

export default function StudioForm({ onSubmit, loading, demoData }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    address: '',
    description: '',
    keyStartups: '',
    logo: '',
  })

  // Pre-fill form with demo data when it arrives
  useEffect(() => {
    if (demoData) {
      setFormData({
        name: demoData.name || '',
        website: demoData.website || '',
        address: demoData.address || '',
        description: demoData.description || '',
        keyStartups: (demoData.keyStartups || []).join(', '),
        logo: demoData.logo || '',
      })
    }
  }, [demoData])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Convert comma-separated string to array for JSON field
    const submitData = {
      ...formData,
      keyStartups: formData.keyStartups.split(',').map(startup => startup.trim()).filter(startup => startup)
    }
    
    onSubmit(submitData)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <input
        name="name"
        placeholder="Studio Name (e.g. Antler, Founders Factory)"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />
      
      <input
        name="website"
        placeholder="Website (e.g. https://www.antler.co)"
        value={formData.website}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />
      
      <input
        name="address"
        placeholder="Location (e.g. London, UK)"
        value={formData.address}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />
      
      <textarea
        name="description"
        placeholder="Studio Description (What you do, your mission, focus areas)"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg h-24"
        required
      />
      
      <textarea
        name="keyStartups"
        placeholder="Key Startups (comma-separated: e.g. Airalo, Reebelo, TrustingSocial)"
        value={formData.keyStartups}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg h-20"
      />
      
      <input
        name="logo"
        placeholder="Logo URL (optional)"
        value={formData.logo}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Registering...' : 'Register Studio'}
      </button>
    </form>
  )
}