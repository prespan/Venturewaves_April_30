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
                project: true // include linked project for each proposal
              }
            },
            project: true // include the project directly linked to the challenge
          }
        }
      }
    });

    if (!corp) return res.status(404).json(null);

    return res.status(200).json(corp);
  } catch (error) {
    console.error('[API ERROR]', error);
    res.status(500).json({ error: 'Server error' });
  }
}
