// pages/api/register/corporate.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'; // Adjust based on your actual import path

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { demo } = req.query;

    if (demo === 'true') {
      try {
        const corp = await prisma.corporate.findFirst({
          where: { name: 'Siemens' },
        });

        if (!corp) {
          return res.status(404).json({ error: 'Demo corporate not found' });
        }

        return res.status(200).json(corp);
      } catch (error) {
        console.error('[GET /api/register/corporate]', error);
        return res.status(500).json({ error: 'Server error' });
      }
    }

    return res.status(400).json({ error: 'Invalid query parameter' });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
