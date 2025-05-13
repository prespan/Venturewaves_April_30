'use client'

import { useEffect, useState } from 'react'

type CorporateData = {
  name: string
  website: string
  address: string
  industryTags: string[]
  description: string
  notableProducts: string[]
  logo?: string
}

type Props = {
  data: CorporateData
}

export default function CorporateForm({ data }: Props) {
  const [formData, setFormData] = useState({
    name: data.name || '',
    website: data.website || '',
    address: data.address || '',
    industryTags: (data.industryTags || []).join(', '),
    description: data.description || '',
    notableProducts: (data.notableProducts || []).join(', '),
    logo: data.logo || '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="w-full space-y-4">
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
        placeholder="Industry Tags (e.g. Mobility, Energy)"
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
        placeholder="Notable Products (e.g. Smart Grid, Urban Mobility)"
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
    </div>
  )
}
