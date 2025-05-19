import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'; // Adjust if your path differs

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { role } = req.query;

  try {
    switch (role) {
      case 'corporate': {
        const corporates = await prisma.corporate.findMany();
        return res.status(200).json(corporates[0] || null);
      }

      case 'investor': {
        const investors = await prisma.investor.findMany();
        return res.status(200).json(investors[0] || null);
      }

      case 'government': {
        const governments = await prisma.government.findMany();
        return res.status(200).json(governments[0] || null);
      }

      case 'research': {
        const researchOrgs = await prisma.researchOrganization.findMany();
        return res.status(200).json(researchOrgs[0] || null);
      }

      case 'studio': {
        const studios = await prisma.studio.findMany();
        return res.status(200).json(studios[0] || null);
      }

      default:
        return res.status(400).json({ error: 'Invalid role' });
    }
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}