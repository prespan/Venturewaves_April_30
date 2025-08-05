'use client'

import { useState, useEffect } from 'react'

type Props = {
  onSubmit: (data: any) => void
  loading: boolean
  demoData?: any
}

export default function GovernmentForm({ onSubmit, loading, demoData }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    website: '',
    focusAreas: '',
    description: '',
    logo: '',
  })

  // Pre-fill form with demo data when it arrives
  useEffect(() => {
    if (demoData) {
      setFormData({
        name: demoData.name || '',
        address: demoData.address || '',
        website: demoData.website || '',
        focusAreas: (demoData.focusAreas || []).join(', '),
        description: demoData.description || '',
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
      focusAreas: formData.focusAreas.split(',').map(area => area.trim()).filter(area => area)
    }
    
    onSubmit(submitData)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <input
        name="name"
        placeholder="Government Agency/Department Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />
      
      <input
        name="website"
        placeholder="Official Website"
        value={formData.website}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />
      
      <input
        name="address"
        placeholder="Address/Location"
        value={formData.address}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />
      
      <textarea
        name="focusAreas"
        placeholder="Focus Areas (comma-separated: e.g. Smart Cities, Digital Health, Climate Tech)"
        value={formData.focusAreas}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg h-20"
        required
      />
      
      <textarea
        name="description"
        placeholder="Agency Description and Mission"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg h-24"
        required
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
        {loading ? 'Registering...' : 'Register Government Agency'}
      </button>
    </form>
  )
}