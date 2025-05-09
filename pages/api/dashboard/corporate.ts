// pages/api/dashboard/corporate.ts

import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Missing corporate ID' });
  }

  try {
    const corporate = await prisma.corporate.findUnique({
      where: { id: parseInt(id) },
      include: {
        challenges: {
          include: {
            proposals: true,
            project: true, // assuming one-to-one, otherwise use custom logic
          },
        },
      },
    });

    if (!corporate) return res.status(404).json({ error: 'Corporate not found' });

    return res.status(200).json(corporate);
  } catch (err) {
    console.error('Dashboard fetch error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}