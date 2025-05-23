import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const studios = await prisma.studio.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        logo: true,
        address: true, // ✅ existing field in schema
      },
      orderBy: {
        name: 'asc',
      },
    });

    res.status(200).json(studios);
  } catch (error) {
    console.error('Error fetching studios:', error);
    res.status(500).json({ error: 'Failed to load studios' });
  }
}