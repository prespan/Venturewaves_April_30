'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface CorporateData {
  id?: number
  name: string
  website: string
  address: string
  industryTags: string[]
  description: string
  notableProducts: string[]
  logo?: string
}

interface CorporateFormProps {
  data?: CorporateData
}

export default function CorporateForm({ data }: CorporateFormProps) {
  const router = useRouter()

  const [formData, setFormData] = useState<CorporateData>(() => ({
    id: data?.id,
    name: data?.name || '',
    website: data?.website || '',
    address: data?.address || '',
    industryTags: data?.industryTags || [],
    description: data?.description || '',
    notableProducts: data?.notableProducts || [],
    logo: data?.logo || '',
  }))

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    if (name === 'industryTags' || name === 'notableProducts') {
      setFormData(prev => ({
        ...prev,
        [name]: value.split(',').map(tag => tag.trim()),
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (data?.id) {
      router.push(`/dashboard/corporate?id=${data.id}`)
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
        placeholder='Industry Tags (e.g. Mobility, Energy)'
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
        placeholder='Notable Products (e.g. Smart Grid, Urban Mobility)'
        value={formData.notableProducts.join(', ')}
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
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Register
      </button>
    </form>
  )
}
