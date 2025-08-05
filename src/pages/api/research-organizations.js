// src/pages/api/research-organizations.js
import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const organizations = await prisma.researchOrganization.findMany({
      distinct: ['name'],
      orderBy: {
        name: 'asc'
      }
    });

    // Enhanced logo mapping for research organizations
    const logoMap = {
      'MIT': '/logos/mit.png',
      'Stanford University': '/logos/stanford.png',
      'Harvard University': '/logos/harvard.png',
      'Cambridge University': '/logos/cambridge.png',
      'Oxford University': '/logos/oxford.png',
      'Berkeley': '/logos/berkeley.png',
      'Caltech': '/logos/caltech.png',
      'Carnegie Mellon': '/logos/cmu.png',
      'ETH Zurich': '/logos/eth.png',
      'Imperial College London': '/logos/imperial.png',
      'CERN': '/logos/cern.png',
      'NASA': '/logos/nasa.png',
      'NIH': '/logos/nih.png',
      'NSF': '/logos/nsf.png',
      'Max Planck Institute': '/logos/maxplanck.png',
      'Fraunhofer Institute': '/logos/fraunhofer.png',
      'CNRS': '/logos/cnrs.png',
      'RIKEN': '/logos/riken.png',
      'Chinese Academy of Sciences': '/logos/cas.png',
      'Wellcome Trust': '/logos/wellcome.png',
      'Allen Institute': '/logos/allen.png',
      'Broad Institute': '/logos/broad.png',
      'Cold Spring Harbor': '/logos/cshl.png',
      'Salk Institute': '/logos/salk.png',
      'Scripps Research': '/logos/scripps.png',
      'Pasteur Institute': '/logos/pasteur.png',
      'Karolinska Institute': '/logos/karolinska.png',
      'Institute for Advanced Study': '/logos/ias.png',
      'Santa Fe Institute': '/logos/sfi.png',
      'Woods Hole': '/logos/whoi.png'
    };

    // Generate realistic ratings for research organizations
    const generateRating = (organizationName) => {
      const ratings = {
        'MIT': 4.8,
        'Stanford University': 4.7,
        'Harvard University': 4.6,
        'Cambridge University': 4.5,
        'Oxford University': 4.5,
        'Berkeley': 4.4,
        'Caltech': 4.6,
        'Carnegie Mellon': 4.3,
        'ETH Zurich': 4.4,
        'Imperial College London': 4.3,
        'CERN': 4.7,
        'NASA': 4.5,
        'NIH': 4.2,
        'NSF': 4.1,
        'Max Planck Institute': 4.4,
        'Fraunhofer Institute': 4.2,
        'CNRS': 4.0,
        'RIKEN': 4.3,
        'Chinese Academy of Sciences': 4.1,
        'Wellcome Trust': 4.3,
        'Allen Institute': 4.4,
        'Broad Institute': 4.5,
        'Cold Spring Harbor': 4.3,
        'Salk Institute': 4.4,
        'Scripps Research': 4.2,
        'Pasteur Institute': 4.1,
        'Karolinska Institute': 4.2,
        'Institute for Advanced Study': 4.6,
        'Santa Fe Institute': 4.3,
        'Woods Hole': 4.2
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
      
      console.log(`Research Organization: "${organization.name}" -> Logo: ${logoPath || 'NOT FOUND'}`);
      
      return {
        ...organization,
        logo: logoPath || null,
        rating: generateRating(organization.name) // Add rating
      };
    });

    res.status(200).json(organizationsWithLogos);
    
  } catch (error) {
    console.error('Research Organizations API Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch research organizations',
      detail: error instanceof Error ? error.message : String(error)
    });
  }
}