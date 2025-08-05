'use client'

import { useState, useEffect } from 'react'

type Props = {
  onSubmit: (data: any) => void
  loading: boolean
  demoData?: any
}

export default function InvestorForm({ onSubmit, loading, demoData }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    address: '',
    focus: '',
    notableInvestments: '',
    logo: '',
  })

  // Pre-fill form with demo data when it arrives
  useEffect(() => {
    if (demoData) {
      setFormData({
        name: demoData.name || '',
        website: demoData.website || '',
        address: demoData.address || '',
        focus: (demoData.focus || []).join(', '),
        notableInvestments: (demoData.notableInvestments || []).join(', '),
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
      focus: formData.focus.split(',').map(area => area.trim()).filter(area => area),
      notableInvestments: formData.notableInvestments.split(',').map(investment => investment.trim()).filter(investment => investment)
    }
    
    onSubmit(submitData)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <input
        name="name"
        placeholder="Investor/Fund Name (e.g. Sequoia Capital, Y Combinator)"
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
        placeholder="Location/Headquarters"
        value={formData.address}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />
      
      <textarea
        name="focus"
        placeholder="Investment Focus (comma-separated: e.g. Early Stage, SaaS, FinTech, Climate Tech)"
        value={formData.focus}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg h-20"
        required
      />
      
      <textarea
        name="notableInvestments"
        placeholder="Notable Investments (comma-separated: e.g. Stripe, Airbnb, WhatsApp)"
        value={formData.notableInvestments}
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
        {loading ? 'Registering...' : 'Register Investor'}
      </button>
    </form>
  )
}