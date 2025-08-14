import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Invalid ID' });

  try {
    const researchOrg = await prisma.researchOrganization.findUnique({
      where: { id: parseInt(id) }
    });

    if (!researchOrg) return res.status(404).json({ error: 'Research organization not found' });

    res.status(200).json(researchOrg);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch organization', 
      detail: error instanceof Error ? error.message : String(error) 
    });
  }
}