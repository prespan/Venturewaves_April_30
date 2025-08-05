'use client'

import { useState, useEffect } from 'react'

type Props = {
  onSubmit: (data: any) => void
  loading: boolean
  demoData?: any // Add this line
}

export default function CorporateForm({ onSubmit, loading, demoData }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    address: '',
    industryTags: '',
    description: '',
    notableProducts: '',
    logo: '',
  })

  // Add this useEffect to populate form with demo data
  useEffect(() => {
    if (demoData) {
      setFormData({
        name: demoData.name || '',
        website: demoData.website || '',
        address: demoData.address || '',
        industryTags: (demoData.industryTags || []).join(', '),
        description: demoData.description || '',
        notableProducts: (demoData.notableProducts || []).join(', '),
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
    
    // Convert comma-separated strings to arrays for JSON fields
    const submitData = {
      ...formData,
      industryTags: formData.industryTags.split(',').map(tag => tag.trim()).filter(tag => tag),
      notableProducts: formData.notableProducts.split(',').map(product => product.trim()).filter(product => product)
    }
    
    onSubmit(submitData)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <input
        name="name"
        placeholder="Company Name (e.g. Siemens)"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />
      
      <input
        name="website"
        placeholder="Website (e.g. https://www.siemens.com)"
        value={formData.website}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />
      
      <input
        name="address"
        placeholder="Headquarters Address (e.g. Munich, Germany)"
        value={formData.address}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />
      
      <textarea
        name="industryTags"
        placeholder="Industry Tags (comma-separated: e.g. Mobility, Energy, Automation)"
        value={formData.industryTags}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg h-20"
        required
      />
      
      <textarea
        name="description"
        placeholder="Company Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg h-24"
        required
      />
      
      <textarea
        name="notableProducts"
        placeholder="Notable Products (comma-separated: e.g. Smart Grid Systems, Industrial IoT, Digital Factory)"
        value={formData.notableProducts}
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
        {loading ? 'Registering...' : 'Register Corporate'}
      </button>
    </form>
  )
}