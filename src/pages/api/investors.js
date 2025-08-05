// src/pages/api/investors.js
import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const investors = await prisma.investor.findMany({
      distinct: ['name'],
      orderBy: {
        name: 'asc'
      }
    });

    // Enhanced logo mapping for investors
    const logoMap = {
      'Sequoia Capital': '/logos/sequoia.png',
      'Andreessen Horowitz': '/logos/a16z.png',
      'Kleiner Perkins': '/logos/kleinerperkins.png',
      'Accel': '/logos/accel.png',
      'Benchmark': '/logos/benchmark.png',
      'Greylock Partners': '/logos/greylock.png',
      'First Round Capital': '/logos/firstround.png',
      'Union Square Ventures': '/logos/usv.png',
      'Founders Fund': '/logos/foundersfund.png',
      'Bessemer Venture Partners': '/logos/bessemer.png',
      'General Catalyst': '/logos/generalcatalyst.png',
      'NEA': '/logos/nea.png',
      'Lightspeed Venture Partners': '/logos/lightspeed.png',
      'IVP': '/logos/ivp.png',
      'GV': '/logos/gv.png',
      'Intel Capital': '/logos/intelcapital.png',
      'Qualcomm Ventures': '/logos/qualcommventures.png',
      'Corporate Venture Capital': '/logos/cvc.png',
      'SoftBank Vision Fund': '/logos/softbank.png',
      'Tiger Global Management': '/logos/tigerglobal.png',
      'Coatue Management': '/logos/coatue.png',
      'DST Global': '/logos/dst.png',
      'Insight Partners': '/logos/insight.png',
      'General Atlantic': '/logos/generalatlantic.png',
      'TPG': '/logos/tpg.png',
      'KKR': '/logos/kkr.png',
      'Blackstone': '/logos/blackstone.png',
      'Apollo Global Management': '/logos/apollo.png',
      'Carlyle Group': '/logos/carlyle.png',
      'Bain Capital': '/logos/baincapital.png',
      'Warburg Pincus': '/logos/warburgpincus.png',
      'Silver Lake': '/logos/silverlake.png',
      'Thoma Bravo': '/logos/thomabravo.png',
      'Vista Equity Partners': '/logos/vista.png',
      'Francisco Partners': '/logos/franciscopartners.png',
      'Y Combinator': '/logos/ycombinator.png',
      'Techstars': '/logos/techstars.png',
      '500 Startups': '/logos/500startups.png',
      'Plug and Play': '/logos/plugandplay.png',
      'Rocket Internet': '/logos/rocketinternet.png',
      'Index Ventures': '/logos/indexventures.png',
      'Atomico': '/logos/atomico.png',
      'Balderton Capital': '/logos/balderton.png',
      'Acton Capital': '/logos/actoncapital.png'
    };

    // Generate realistic ratings for investors
    const generateRating = (investorName) => {
      const ratings = {
        'Sequoia Capital': 4.8,
        'Andreessen Horowitz': 4.7,
        'Kleiner Perkins': 4.6,
        'Accel': 4.5,
        'Benchmark': 4.6,
        'Greylock Partners': 4.4,
        'First Round Capital': 4.5,
        'Union Square Ventures': 4.4,
        'Founders Fund': 4.5,
        'Bessemer Venture Partners': 4.3,
        'General Catalyst': 4.4,
        'NEA': 4.2,
        'Lightspeed Venture Partners': 4.4,
        'IVP': 4.3,
        'GV': 4.2,
        'Intel Capital': 4.1,
        'Qualcomm Ventures': 4.0,
        'SoftBank Vision Fund': 4.0,
        'Tiger Global Management': 4.2,
        'Coatue Management': 4.1,
        'DST Global': 4.0,
        'Insight Partners': 4.2,
        'General Atlantic': 4.3,
        'TPG': 4.1,
        'KKR': 4.2,
        'Blackstone': 4.3,
        'Apollo Global Management': 4.1,
        'Carlyle Group': 4.0,
        'Bain Capital': 4.2,
        'Warburg Pincus': 4.1,
        'Silver Lake': 4.3,
        'Thoma Bravo': 4.2,
        'Vista Equity Partners': 4.4,
        'Francisco Partners': 4.1,
        'Y Combinator': 4.6,
        'Techstars': 4.3,
        '500 Startups': 4.1,
        'Plug and Play': 4.0,
        'Rocket Internet': 3.9,
        'Index Ventures': 4.3,
        'Atomico': 4.2,
        'Balderton Capital': 4.1,
        'Acton Capital': 4.0
      };
      
      return ratings[investorName] || (Math.random() * 1.5 + 3.5); // Random between 3.5-5.0
    };

    const investorsWithLogos = investors.map(investor => {
      let logoPath = logoMap[investor.name];
      
      // If no exact match found, try some common variations
      if (!logoPath) {
        const cleanName = investor.name.toLowerCase().replace(/\s+/g, '');
        logoPath = `/logos/${cleanName}.png`;
      }
      
      console.log(`Investor: "${investor.name}" -> Logo: ${logoPath || 'NOT FOUND'}`);
      
      return {
        ...investor,
        logo: logoPath || null,
        rating: generateRating(investor.name) // Add rating
      };
    });

    res.status(200).json(investorsWithLogos);
    
  } catch (error) {
    console.error('Investors API Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch investors',
      detail: error instanceof Error ? error.message : String(error)
    });
  }
}