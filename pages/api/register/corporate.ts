import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma' // Make sure this path is correct based on your project

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
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

    // Validate required fields
    if (!name || !industryTags || !description || !notableProducts) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

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

    res.status(200).json({ success: true, data: newCorporate })
  } catch (error) {
    console.error('[CORPORATE_REGISTRATION_ERROR]', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
