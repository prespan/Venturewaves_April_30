'use client';

import { useEffect, useState } from 'react';

interface CorporateData {
  id?: number;
  name: string;
  website: string;
  address: string;
  industryTags: string;
  description: string;
  notableProducts: string;
  logo?: string;
}

interface CorporateFormProps {
  data: CorporateData;
}

export default function CorporateForm({ data }: CorporateFormProps) {
  const [formData, setFormData] = useState<CorporateData>({
    id: data.id,
    name: data.name,
    website: data.website,
    address: data.address,
    industryTags: JSON.stringify(data.industryTags),
    description: data.description,
    notableProducts: JSON.stringify(data.notableProducts),
    logo: data.logo || '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted (placeholder)');
  };

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
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Register
      </button>
    </form>
  );
}