// src/pages/api/studios.js
import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const studios = await prisma.studio.findMany({
      distinct: ['name'],
      orderBy: {
        name: 'asc'
      }
    });

    // Enhanced logo mapping - corrected to match your exact file names and studio names
    const logoMap = {
      'Antler': '/logos/antler.png',
      'BCG Digital Ventures': '/logos/bcgdv.png', 
      'Betaworks': '/logos/betaworks.png',
      'eFounders': '/logos/efounders.png',
      'Founders Factory': '/logos/FoundersFactory.png', // Capital F to match your file
      'FoundersFactory': '/logos/FoundersFactory.png', // Handle both variations
      'High Alpha': '/logos/highalpha.png',
      'Rocket Internet': '/logos/rocketinternet.png',
      'Idealab': '/logos/idealab.png',
      'ZINC': '/logos/zinc.png',
      'Zinc VC': '/logos/zinc.png', // Fix for "Zinc VC" in database
      'Boomerang': '/logos/boomerang.png',
      'Madrona': '/logos/madrona.png',
      'BGLD': '/logos/byld.png',
      'Coplex': '/logos/coplex.png',
      'CPI': '/logos/cpi.png',
      'Mach49': '/logos/mach49.png',
      'AMR': '/logos/amr.png',
      'InnovateUK': '/logos/innovateuk.png',
      'Temasek': '/logos/temasek.png',
      'Catapult': '/logos/catapult.png',
      'Fraunhofer': '/logos/fraunhofer.png',
      'VentureWaves Innovation Lab': '/logos/venturewavesinnovationlab.png' // Added this one too
    };

    // Generate realistic ratings for studios
    const generateRating = (studioName) => {
      const ratings = {
        'Antler': 4.2,
        'BCG Digital Ventures': 4.5,
        'Betaworks': 4.1,
        'eFounders': 4.3,
        'Founders Factory': 4.0,
        'High Alpha': 4.4,
        'Rocket Internet': 3.8,
        'Idealab': 4.0,
        'ZINC': 3.9,
        'Zinc VC': 3.5, // Rating for Zinc VC
        'Boomerang': 4.1,
        'Madrona': 4.2,
        'BGLD': 3.7,
        'Coplex': 3.8,
        'CPI': 3.9,
        'Mach49': 3.9,
        'AMR': 3.6,
        'InnovateUK': 3.8,
        'Temasek': 4.1,
        'Catapult': 3.7,
        'Fraunhofer': 3.8,
        'VentureWaves Innovation Lab': 4.6 // High rating for your own studio!
      };
      
      return ratings[studioName] || (Math.random() * 1.5 + 3.5); // Random between 3.5-5.0
    };

    const studiosWithLogos = studios.map(studio => {
      let logoPath = logoMap[studio.name];
      
      // If no exact match found, try some common variations
      if (!logoPath) {
        const cleanName = studio.name.toLowerCase().replace(/\s+/g, '');
        logoPath = `/logos/${cleanName}.png`;
      }
      
      console.log(`Studio: "${studio.name}" -> Logo: ${logoPath || 'NOT FOUND'}`);
      
      return {
        ...studio,
        logo: logoPath || null,
        rating: generateRating(studio.name) // Add rating
      };
    });

    res.status(200).json(studiosWithLogos);
    
  } catch (error) {
    console.error('Studios API Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch studios',
      detail: error instanceof Error ? error.message : String(error)
    });
  }
}