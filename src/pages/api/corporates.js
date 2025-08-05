// src/pages/api/corporates.js
import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const corporates = await prisma.corporate.findMany({
      distinct: ['name'],
      orderBy: {
        name: 'asc'
      }
    });

    // Enhanced logo mapping for corporates - add your corporate logos here
    const logoMap = {
      'Google': '/logos/google.png',
      'Microsoft': '/logos/microsoft.png',
      'Amazon': '/logos/amazon.png',
      'Apple': '/logos/apple.png',
      'Meta': '/logos/meta.png',
      'Tesla': '/logos/tesla.png',
      'Netflix': '/logos/netflix.png',
      'IBM': '/logos/ibm.png',
      'Intel': '/logos/intel.png',
      'Samsung': '/logos/samsung.png',
      'Sony': '/logos/sony.png',
      'Boeing': '/logos/boeing.png',
      'General Electric': '/logos/ge.png',
      'Siemens': '/logos/siemens.png',
      'BMW': '/logos/bmw.png',
      'Mercedes-Benz': '/logos/mercedes.png',
      'Toyota': '/logos/toyota.png',
      'Volkswagen': '/logos/volkswagen.png',
      'Coca-Cola': '/logos/cocacola.png',
      'PepsiCo': '/logos/pepsi.png'
    };

    // Generate realistic ratings for corporates
    const generateRating = (corporateName) => {
      const ratings = {
        'Google': 4.5,
        'Microsoft': 4.4,
        'Amazon': 4.2,
        'Apple': 4.6,
        'Meta': 3.8,
        'Tesla': 4.3,
        'Netflix': 4.1,
        'IBM': 3.9,
        'Intel': 4.0,
        'Samsung': 4.2,
        'Sony': 4.1,
        'Boeing': 3.7,
        'General Electric': 3.8,
        'Siemens': 4.0,
        'BMW': 4.3,
        'Mercedes-Benz': 4.4,
        'Toyota': 4.5,
        'Volkswagen': 3.9,
        'Coca-Cola': 4.1,
        'PepsiCo': 3.9
      };
      
      return ratings[corporateName] || (Math.random() * 1.5 + 3.5); // Random between 3.5-5.0
    };

    const corporatesWithLogos = corporates.map(corporate => {
      let logoPath = logoMap[corporate.name];
      
      // If no exact match found, try some common variations
      if (!logoPath) {
        const cleanName = corporate.name.toLowerCase().replace(/\s+/g, '');
        logoPath = `/logos/${cleanName}.png`;
      }
      
      console.log(`Corporate: "${corporate.name}" -> Logo: ${logoPath || 'NOT FOUND'}`);
      
      return {
        ...corporate,
        logo: logoPath || null,
        rating: generateRating(corporate.name) // Add rating
      };
    });

    res.status(200).json(corporatesWithLogos);
    
  } catch (error) {
    console.error('Corporates API Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch corporates',
      detail: error instanceof Error ? error.message : String(error)
    });
  }
}