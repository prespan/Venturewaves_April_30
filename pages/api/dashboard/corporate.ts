import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid corporate ID' });
  }

  try {
    const corp = await prisma.corporate.findUnique({
      where: { id: parseInt(id) },
      include: {
        challenges: {
          include: {
            proposals: true
            // Removed `project: true`
          }
        }
      }
    });

    if (!corp) return res.status(404).json(null);

    // 🔄 Additionally fetch projects for this corporate's challenges
    const challengeIds = corp.challenges.map((c) => c.id)
    const projects = await prisma.project.findMany({
      where: { challengeId: { in: challengeIds } }
    })

    return res.status(200).json({
      ...corp,
      projects
    });
  } catch (error) {
    console.error('[API ERROR]', error);
    res.status(500).json({ error: 'Server error' });
  }
}
