// pages/api/register/[role].ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { role, name } = req.query;
  const validRoles = ['studio', 'corporate', 'government', 'investor', 'research'];

  if (typeof role !== 'string' || !validRoles.includes(role)) {
    return res.status(400).json({ error: 'Invalid or missing role' });
  }

  try {
    let data = null;

    switch (role) {
      case 'studio':
        data = name
          ? await prisma.studio.findFirst({ where: { name: String(name) } })
          : await prisma.studio.findFirst({ orderBy: { id: 'asc' }, skip: Math.floor(Math.random() * 3) }); // adjust max skip if needed
        break;
      case 'corporate':
        data = name
          ? await prisma.corporate.findFirst({ where: { name: String(name) } })
          : await prisma.corporate.findFirst({ orderBy: { id: 'asc' }, skip: Math.floor(Math.random() * 3) });
        break;
      case 'government':
        data = name
          ? await prisma.government.findFirst({ where: { name: String(name) } })
          : await prisma.government.findFirst({ orderBy: { id: 'asc' }, skip: Math.floor(Math.random() * 3) });
        break;
      case 'investor':
        data = name
          ? await prisma.investor.findFirst({ where: { name: String(name) } })
          : await prisma.investor.findFirst({ orderBy: { id: 'asc' }, skip: Math.floor(Math.random() * 3) });
        break;
      case 'research':
        data = name
          ? await prisma.researchOrganization.findFirst({ where: { name: String(name) } })
          : await prisma.researchOrganization.findFirst({ orderBy: { id: 'asc' }, skip: Math.floor(Math.random() * 3) });
        break;
    }

    if (!data) {
      return res.status(404).json({ error: `No ${role} organization found${name ? ` with name "${name}"` : ''}` });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(`[API Error] /api/register/${role}:`, error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

