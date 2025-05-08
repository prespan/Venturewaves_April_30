// pages/api/register/corporate.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Return a preloaded corporate entry
    try {
      const corporate = await prisma.corporate.findFirst()
      if (!corporate) {
        return res.status(404).json({ error: 'No corporate data found' })
      }
      return res.status(200).json(corporate)
    } catch (error) {
      console.error('Failed to fetch corporate data:', error)
      return res.status(500).json({ error: 'Failed to load corporate data' })
    }
  }

  if (req.method === 'POST') {
    // Handle form submission
    const {
      name,
      website,
      address,
      industryTags,
      description,
      notableProducts,
      logo,
    } = req.body

    try {
      const created = await prisma.corporate.create({
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

      return res.status(201).json(created)
    } catch (error) {
      console.error('Failed to create corporate:', error)
      return res.status(500).json({ error: 'Failed to create entry' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
