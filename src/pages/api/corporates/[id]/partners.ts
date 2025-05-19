import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid corporate ID' });
  }

  try {
    // Fetch partners (studios) with basic matching logic.
    // Customize this logic if you want to match by tags, region, etc.
    const partners = await prisma.studio.findMany({
      where: {
        // example filter: only studios without proposals yet
       proposals: false
      },
      select: {
        id: true,
        name: true,
        description: true,
        website: true
      }
    });

    return res.status(200).json({ partners });
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to fetch partners',
      detail: error instanceof Error ? error.message : String(error)
    });
  }
}
