import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma'; // ✅ Correct default import

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const isDemo = req.query.demo === 'true';

  try {
    const corporate = await prisma.corporate.findFirst({
      where: isDemo ? { name: 'Siemens' } : {},
    });

    if (!corporate) {
      return res.status(404).json({ message: 'Corporate data not found' });
    }

    return res.status(200).json({
      name: corporate.name,
      website: corporate.website,
      address: corporate.address,
      industryTags: corporate.industryTags,
      description: corporate.description,
      notableProducts: corporate.notableProducts,
      logo: corporate.logo,
    });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
