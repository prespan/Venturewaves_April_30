import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const studios = await prisma.studio.findMany()
    res.status(200).json(studios)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to load studios' })
  }
}