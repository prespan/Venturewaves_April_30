import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Invalid ID' });

  try {
    const projects = await prisma.project.findMany({
      where: { challenge: { corporateId: parseInt(id) } },
      include: { challenge: true, proposal: true, collaborators: true }
    });

    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects', detail: error instanceof Error ? error.message : String(error) });
  }
}