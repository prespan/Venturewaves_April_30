// pages/api/register/corporate.ts
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma' // adjust path if needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const {
      name,
      website,
      address,
      industryTags,
      description,
      notableProducts,
      logo,
    } = req.body

    const newCorporate = await prisma.corporate.create({
      data: {
        name,
        website,
        address,
        industryTags,
        description,
        notableProducts,
        logo,
      },
    })

    return res.status(201).json(newCorporate)
  } catch (error) {
    console.error('Error registering corporate:', error)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
