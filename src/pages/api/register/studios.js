import { prisma } from '@/lib/prisma';

// Demo data for studio registration
const DEMO_DATA = {
  name: "Founders Factory",
  website: "https://foundersfactory.com",
  address: "UK",
  description: "Corporate-backed venture studio and accelerator.",
  keyStartups: ["Habito", "Zego", "Onfido"],
  logo: null
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Return demo data for form population
    return res.status(200).json(DEMO_DATA);
  }
  
  if (req.method === 'POST') {
    try {
      const formData = req.body;
      console.log('Studio registration attempt for:', formData.name);
      
      // Check if studio exists first, then update or create
      const existingStudio = await prisma.studio.findFirst({
        where: { name: formData.name }
      });

      let studio;
      
      if (existingStudio) {
        // Update existing studio
        studio = await prisma.studio.update({
          where: { id: existingStudio.id },
          data: {
            website: formData.website,
            address: formData.address,
            description: formData.description,
            keyStartups: formData.keyStartups,
            logo: formData.logo
          }
        });
        console.log('Studio updated:', studio.name, 'ID:', studio.id);
      } else {
        // Create new studio
        studio = await prisma.studio.create({
          data: {
            name: formData.name,
            website: formData.website,
            address: formData.address,
            description: formData.description,
            keyStartups: formData.keyStartups,
            logo: formData.logo
          }
        });
        console.log('Studio created:', studio.name, 'ID:', studio.id);
      }

      return res.status(200).json(studio);
      
    } catch (error) {
      console.error('Studio registration error:', error);
      return res.status(500).json({ 
        error: 'Registration failed',
        details: error.message 
      });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}