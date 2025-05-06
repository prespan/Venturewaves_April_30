import { useState } from 'react'
import { useRouter } from 'next/router'
import { Corporate } from '@prisma/client'

interface CorporateFormProps {
  corporate?: Partial<Corporate> // optional preloaded data
}

export default function CorporateForm({ corporate }: CorporateFormProps) {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: corporate?.name || '',
    website: corporate?.website || '',
    address: corporate?.address || '',
    industryTags: corporate?.industryTags ? JSON.stringify(corporate.industryTags) : '',
    description: corporate?.description || '',
    notableProducts: corporate?.notableProducts ? JSON.stringify(corporate.notableProducts) : '',
    logo: corporate?.logo || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/register/corporate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          industryTags: JSON.parse(formData.industryTags),
          notableProducts: JSON.parse(formData.notableProducts),
        }),
      })

      if (res.ok) {
        router.push('/dashboard/corporate')
      } else {
        alert('Registration failed')
      }
    } catch (error) {
      console.error(error)
      alert('Something went wrong')
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
        placeholder='Industry Tags (JSON array e.g. ["Aerospace", "AI"])'
        value={formData.industryTags}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        name="notableProducts"
        placeholder='Notable Products (JSON array e.g. ["JetX", "CleanCore"])'
        value={formData.notableProducts}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
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
