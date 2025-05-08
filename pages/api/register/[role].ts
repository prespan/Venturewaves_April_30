// pages/api/register/[role].ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { role } = req.query;
  const validRoles = ['studio', 'corporate', 'government', 'investor', 'research'];

  if (typeof role !== 'string' || !validRoles.includes(role)) {
    return res.status(400).json({ error: 'Invalid or missing role' });
  }

  try {
    let data = null;

    switch (role) {
      case 'studio':
        data = await prisma.studio.findFirst();
        break;
      case 'corporate':
        data = await prisma.corporate.findFirst();
        break;
      case 'government':
        data = await prisma.government.findFirst();
        break;
      case 'investor':
        data = await prisma.investor.findFirst();
        break;
      case 'research':
        data = await prisma.researchOrganization.findFirst();
        break;
    }

    if (!data) {
      return res.status(404).json({ error: `No ${role} data found` });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(`[API Error] /api/register/${role}:`, error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
