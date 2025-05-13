import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Invalid ID' });

  try {
    const proposals = await prisma.proposal.findMany({
      where: { challenge: { corporateId: parseInt(id) } },
      include: { challenge: true, Studio: true }
    });

    res.status(200).json({ proposals });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch proposals', detail: error instanceof Error ? error.message : String(error) });
  }
}
