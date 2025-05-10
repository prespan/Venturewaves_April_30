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
            proposals: {
              include: {
                project: true
              }
            },
            project: {
              include: {
                collaborators: true
              }
            }
          }
        }
      }
    });

    if (!corp) return res.status(404).json(null);

    // Optional: derive status for UI logic
    const enrichedChallenges = corp.challenges.map((c) => ({
      ...c,
      status: c.project
        ? 'CONVERTED'
        : c.proposals.length > 0
        ? 'PENDING'
        : 'OPEN'
    }));

    return res.status(200).json({
      ...corp,
      challenges: enrichedChallenges
    });
  } catch (error) {
    console.error('[API ERROR]', error);
    res.status(500).json({ error: 'Server error', detail: error instanceof Error ? error.message : String(error) });
  }
}