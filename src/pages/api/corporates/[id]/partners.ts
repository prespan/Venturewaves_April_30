// pages/api/corporate/[id]/partners.ts
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Invalid ID' });

  try {
    const corporate = await prisma.corporate.findUnique({
      where: { id: parseInt(id) },
      include: { challenges: true },
    });

    if (!corporate) return res.status(404).json({ error: 'Corporate not found' });

    const challengeKeywords = corporate.challenges.flatMap(c => c.title.split(' '));

    const matchedStudios = await prisma.studio.findMany({
      where: {
        OR: challengeKeywords.map(keyword => ({
          description: { contains: keyword, mode: 'insensitive' },
        })),
      },
      take: 10,
    });

    // Transform to match your dashboard's expected format
    const formattedPartners = matchedStudios.map(studio => {
      // Generate clean ratings between 3.5-5.0 with 1 decimal place
      const baseRating = 3.5 + (Math.random() * 1.5);
      const cleanRating = Math.round(baseRating * 10) / 10;

      return {
        id: studio.id,
        name: studio.name,
        description: studio.description,
        website: studio.website,
        location: studio.address,
        rating: cleanRating,
        specialization: "Innovation Studio",
        keyStartups: Array.isArray(studio.keyStartups) ? studio.keyStartups : []
      };
    });

    console.log(`✨ Formatted ${formattedPartners.length} partners for corporate ${id}`);

    res.status(200).json({ partners: formattedPartners });
  } catch (error) {
    console.error('❌ Corporate Partners API Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch partners', 
      detail: error instanceof Error ? error.message : String(error) 
    });
  }
}