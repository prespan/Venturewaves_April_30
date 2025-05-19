import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    // Simplified matching logic for now
    const partners = await prisma.studio.findMany({
      where: {
        // In production, add keyword/location-based matching
      },
      take: 10
    });

    res.status(200).json({ partners });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch partners', detail: error instanceof Error ? error.message : String(error) });
  }
}
