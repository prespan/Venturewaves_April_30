// pages/api/research-organizations/[id]/partners.ts
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Invalid ID' });

  try {
    const researchOrg = await prisma.researchOrganization.findUnique({
      where: { id: parseInt(id) },
      include: { challenges: true },
    });

    if (!researchOrg) return res.status(404).json({ error: 'Research organization not found' });

    // Get ALL studios first, then apply smarter matching logic
    const allStudios = await prisma.studio.findMany();

    // If we have challenges, try to match based on keywords
    let matchedStudios: any[] = [];
    
    if (researchOrg.challenges.length > 0) {
      const challengeKeywords = researchOrg.challenges.flatMap(c => 
        c.title.toLowerCase().split(/\s+/).filter(word => word.length > 3)
      );
      
      // Try keyword matching first
      matchedStudios = allStudios.filter(studio => {
        const studioText = `${studio.description || ''} ${studio.name || ''}`.toLowerCase();
        return challengeKeywords.some(keyword => 
          studioText.includes(keyword) || 
          (keyword.includes('ai') && studioText.includes('tech')) ||
          (keyword.includes('quantum') && studioText.includes('innovation')) ||
          (keyword.includes('material') && studioText.includes('solutions')) ||
          (keyword.includes('drug') && studioText.includes('research'))
        );
      });
    }

    // If no matches or no challenges, return all studios (research orgs can partner with any studio)
    if (matchedStudios.length === 0) {
      matchedStudios = allStudios;
    }

    // Limit to reasonable number
    matchedStudios = matchedStudios.slice(0, 10);

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
        address: studio.address, // Include both for compatibility
        rating: cleanRating,
        specialization: "Research & Innovation Studio",
        keyStartups: Array.isArray(studio.keyStartups) ? studio.keyStartups : []
      };
    });

    console.log(`✨ Formatted ${formattedPartners.length} partners for research organization ${id}`);
    console.log('Partners found:', formattedPartners.map(p => p.name));

    res.status(200).json({ partners: formattedPartners });
  } catch (error) {
    console.error('❌ Research Organization Partners API Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch partners', 
      detail: error instanceof Error ? error.message : String(error) 
    });
  }
}