'use client'

import { useState, useEffect } from 'react'

type Props = {
  onSubmit: (data: any) => void
  loading: boolean
  demoData?: any
}

export default function ResearchForm({ onSubmit, loading, demoData }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    address: '',
    focusDomains: '',
    description: '',
    logo: '',
  })

  // Pre-fill form with demo data when it arrives
  useEffect(() => {
    if (demoData) {
      setFormData({
        name: demoData.name || '',
        website: demoData.website || '',
        address: demoData.address || '',
        focusDomains: (demoData.focusDomains || []).join(', '),
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
      focusDomains: formData.focusDomains.split(',').map(domain => domain.trim()).filter(domain => domain)
    }
    
    onSubmit(submitData)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <input
        name="name"
        placeholder="Research Organization Name (e.g. MIT, Fraunhofer Institute)"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />
      
      <input
        name="website"
        placeholder="Website"
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
        name="focusDomains"
        placeholder="Research Focus Domains (comma-separated: e.g. AI/ML, Robotics, Materials Science, Biotech)"
        value={formData.focusDomains}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg h-20"
        required
      />
      
      <textarea
        name="description"
        placeholder="Organization Description and Research Mission"
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
        {loading ? 'Registering...' : 'Register Research Organization'}
      </button>
    </form>
  )
}