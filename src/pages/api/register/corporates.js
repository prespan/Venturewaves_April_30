import { prisma } from '@/lib/prisma';

// Demo data for corporate registration
const DEMO_DATA = {
  name: "Siemens",
  website: "https://www.siemens.com",
  address: "Munich, Germany",
  industryTags: ["Mobility", "Energy", "Automation"],
  description: "A global leader in electrification, automation, and digitalization.",
  notableProducts: ["Smart Grid Systems", "Industrial IoT", "Digital Factory"],
  logo: "/logos/siemens.png"
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Return demo data for form population
    return res.status(200).json(DEMO_DATA);
  }
  
  if (req.method === 'POST') {
    try {
      const formData = req.body;
      console.log('Registration attempt for:', formData.name);
      
      // SOLUTION: Check if corporate exists first, then update or create
      const existingCorporate = await prisma.corporate.findFirst({
        where: { name: formData.name }
      });

      let corporate;
      
      if (existingCorporate) {
        // Update existing corporate
        corporate = await prisma.corporate.update({
          where: { id: existingCorporate.id },
          data: {
            website: formData.website,
            address: formData.address,
            industryTags: formData.industryTags,
            description: formData.description,
            notableProducts: formData.notableProducts,
            logo: formData.logo
            // Removed updatedAt since it doesn't exist in schema
          }
        });
        console.log('Corporate updated:', corporate.name, 'ID:', corporate.id);
      } else {
        // Create new corporate
        corporate = await prisma.corporate.create({
          data: {
            name: formData.name,
            website: formData.website,
            address: formData.address,
            industryTags: formData.industryTags,
            description: formData.description,
            notableProducts: formData.notableProducts,
            logo: formData.logo
            // Removed createdAt since it's auto-generated
          }
        });
        console.log('Corporate created:', corporate.name, 'ID:', corporate.id);
      }

      return res.status(200).json(corporate);
      
    } catch (error) {
      console.error('Corporate registration error:', error);
      return res.status(500).json({ 
        error: 'Registration failed',
        details: error.message 
      });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}