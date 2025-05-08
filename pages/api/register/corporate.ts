// pages/api/register/corporate.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma'; // ✅ Use a relative import that works in production

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { demo } = req.query;

    if (demo === 'true') {
      // Fetch demo company
      const company = await prisma.corporate.findFirst({
        where: { name: 'Siemens' }, // or adjust to match your demo logic
      });

      if (!company) {
        return res.status(404).json({ error: 'Demo company not found' });
      }

      return res.status(200).json(company);
    }

    return res.status(400).json({ error: 'Missing or invalid query parameter' });
  } catch (error) {
    console.error('[API Error] /api/register/corporate:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
