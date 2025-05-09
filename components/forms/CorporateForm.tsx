'use client'

import { useEffect, useState } from 'react'

export type Corporate = {
  name: string
  website: string
  address: string
  industryTags: string[]
  description: string
  notableProducts: string[]
  logo?: string
}

type Props = {
  data?: Corporate // optional, used for preloading
}

export default function CorporateForm({ data }: Props) {
  const [formData, setFormData] = useState<Corporate>({
    name: '',
    website: '',
    address: '',
    industryTags: [],
    description: '',
    notableProducts: [],
    logo: '',
  })

  useEffect(() => {
    if (data) {
      setFormData(data)
    }
  }, [data])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: ['industryTags', 'notableProducts'].includes(name)
        ? value.split(',').map(s => s.trim())
        : value,
    }))
  }

  return (
    <div className="w-full max-w-lg space-y-4">
      <input
        name="name"
        placeholder="Company Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
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
        value={formData.industryTags.join(', ')}
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
        value={formData.notableProducts.join(', ')}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="logo"
        placeholder="Logo URL"
        value={formData.logo || ''}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
    </div>
  )
}
