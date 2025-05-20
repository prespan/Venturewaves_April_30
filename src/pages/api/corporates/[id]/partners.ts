import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Invalid ID' });

  try {
    const corporate = await prisma.corporate.findUnique({
      where: { id: parseInt(id) },
      include: { challenges: true },
    });

    if (!corporate) return res.status(404).json({ error: 'Corporate not found' });

    const challengeKeywords = corporate.challenges.flatMap(c => c.title.split(' '));

    const matchedStudios = await prisma.studio.findMany({
      where: {
        OR: challengeKeywords.map(keyword => ({
          description: { contains: keyword, mode: 'insensitive' },
        })),
      },
      take: 10,
    });

    res.status(200).json({ partners: matchedStudios });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch partners', detail: error instanceof Error ? error.message : String(error) });
  }
}