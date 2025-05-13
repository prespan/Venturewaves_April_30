import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Invalid ID' });

  try {
    const challenges = await prisma.challenge.findMany({
      where: { corporateId: parseInt(id) },
      include: {
        proposals: true,
        project: {
          include: {
            collaborators: true
          }
        }
      }
    });

    res.status(200).json({ challenges });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch challenges', detail: error instanceof Error ? error.message : String(error) });
  }
}
