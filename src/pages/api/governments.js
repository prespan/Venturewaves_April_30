// src/pages/api/governments.js
import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const organizations = await prisma.government.findMany({
      distinct: ['name'],
      orderBy: {
        name: 'asc'
      }
    });

    // Enhanced logo mapping for government organizations
    const logoMap = {
      'Department of Defense': '/logos/dod.png',
      'Department of State': '/logos/state.png',
      'Department of Treasury': '/logos/treasury.png',
      'Department of Justice': '/logos/doj.png',
      'Department of Homeland Security': '/logos/dhs.png',
      'Department of Health and Human Services': '/logos/hhs.png',
      'Department of Education': '/logos/education.png',
      'Department of Energy': '/logos/energy.png',
      'Department of Transportation': '/logos/dot.png',
      'Department of Agriculture': '/logos/usda.png',
      'EPA': '/logos/epa.png',
      'FDA': '/logos/fda.png',
      'CDC': '/logos/cdc.png',
      'NIH': '/logos/nih.png',
      'NSF': '/logos/nsf.png',
      'USAID': '/logos/usaid.png',
      'Peace Corps': '/logos/peacecorps.png',
      'Social Security Administration': '/logos/ssa.png',
      'Federal Reserve': '/logos/fed.png',
      'SEC': '/logos/sec.png',
      'FTC': '/logos/ftc.png',
      'FCC': '/logos/fcc.png',
      'United Nations': '/logos/un.png',
      'World Bank': '/logos/worldbank.png',
      'International Monetary Fund': '/logos/imf.png',
      'World Health Organization': '/logos/who.png',
      'European Union': '/logos/eu.png',
      'NATO': '/logos/nato.png',
      'OECD': '/logos/oecd.png',
      'Government of Canada': '/logos/canada.png',
      'Government of Australia': '/logos/australia.png',
      'Government of United Kingdom': '/logos/uk.png',
      'Government of Germany': '/logos/germany.png',
      'Government of France': '/logos/france.png',
      'Government of Japan': '/logos/japan.png',
      'Government of South Korea': '/logos/southkorea.png',
      'Government of Singapore': '/logos/singapore.png',
      'Government of Switzerland': '/logos/switzerland.png',
      'Government of Netherlands': '/logos/netherlands.png'
    };

    // Generate realistic ratings for government organizations
    const generateRating = (organizationName) => {
      const ratings = {
        'Department of Defense': 4.2,
        'Department of State': 4.0,
        'Department of Treasury': 4.1,
        'Department of Justice': 3.8,
        'Department of Homeland Security': 3.9,
        'Department of Health and Human Services': 4.0,
        'Department of Education': 3.7,
        'Department of Energy': 4.1,
        'Department of Transportation': 3.9,
        'Department of Agriculture': 4.0,
        'EPA': 3.8,
        'FDA': 4.2,
        'CDC': 4.4,
        'NIH': 4.5,
        'NSF': 4.3,
        'USAID': 4.1,
        'Peace Corps': 4.3,
        'Social Security Administration': 3.6,
        'Federal Reserve': 4.0,
        'SEC': 3.9,
        'FTC': 3.8,
        'FCC': 3.7,
        'United Nations': 4.1,
        'World Bank': 4.0,
        'International Monetary Fund': 3.9,
        'World Health Organization': 4.2,
        'European Union': 3.8,
        'NATO': 4.0,
        'OECD': 4.1,
        'Government of Canada': 4.2,
        'Government of Australia': 4.1,
        'Government of United Kingdom': 4.0,
        'Government of Germany': 4.1,
        'Government of France': 3.9,
        'Government of Japan': 4.2,
        'Government of South Korea': 4.0,
        'Government of Singapore': 4.3,
        'Government of Switzerland': 4.4,
        'Government of Netherlands': 4.2
      };
      
      return ratings[organizationName] || (Math.random() * 1.5 + 3.5); // Random between 3.5-5.0
    };

    const organizationsWithLogos = organizations.map(organization => {
      let logoPath = logoMap[organization.name];
      
      // If no exact match found, try some common variations
      if (!logoPath) {
        const cleanName = organization.name.toLowerCase().replace(/\s+/g, '');
        logoPath = `/logos/${cleanName}.png`;
      }
      
      console.log(`Government Organization: "${organization.name}" -> Logo: ${logoPath || 'NOT FOUND'}`);
      
      return {
        ...organization,
        logo: logoPath || null,
        rating: generateRating(organization.name) // Add rating
      };
    });

    res.status(200).json(organizationsWithLogos);
    
  } catch (error) {
    console.error('Government Organizations API Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch government organizations',
      detail: error instanceof Error ? error.message : String(error)
    });
  }
}