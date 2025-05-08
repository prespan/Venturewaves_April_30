import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'; // adjust path if needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    if (req.query.demo === 'true') {
      // Return Siemens as demo data
      const demo = await prisma.corporate.findFirst({
        where: { name: 'Siemens' },
      });

      if (!demo) return res.status(404).json({ error: 'Demo data not found' });
      return res.status(200).json(demo);
    }

    return res.status(400).json({ error: 'Missing or invalid query param' });
  }

  if (req.method === 'POST') {
    const data = req.body;
    const created = await prisma.corporate.create({ data });
    return res.status(201).json(created);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
