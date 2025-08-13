import { prisma } from '@/lib/prisma';

// Demo data for government registration
const DEMO_DATA = {
  name: "UK Government Innovation",
  website: "https://www.gov.uk/innovation",
  address: "London, UK",
  description: "Supporting innovation and entrepreneurship across the UK.",
  focusAreas: ["Digital Innovation", "Green Technology", "Healthcare"],
  logo: "/logos/uk-gov.png"
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Return demo data for form population
    return res.status(200).json(DEMO_DATA);
  }
  
  if (req.method === 'POST') {
    try {
      const formData = req.body;
      console.log('Government registration attempt for:', formData.name);
      
      // Check if government exists first, then update or create
      const existingGovernment = await prisma.government.findFirst({
        where: { name: formData.name }
      });

      let government;
      
      if (existingGovernment) {
        // Update existing government
        government = await prisma.government.update({
          where: { id: existingGovernment.id },
          data: {
            website: formData.website,
            address: formData.address,
            description: formData.description,
            focusAreas: formData.focusAreas,
            logo: formData.logo
          }
        });
        console.log('Government updated:', government.name, 'ID:', government.id);
      } else {
        // Create new government
        government = await prisma.government.create({
          data: {
            name: formData.name,
            website: formData.website,
            address: formData.address,
            description: formData.description,
            focusAreas: formData.focusAreas,
            logo: formData.logo
          }
        });
        console.log('Government created:', government.name, 'ID:', government.id);
      }

      return res.status(200).json(government);
      
    } catch (error) {
      console.error('Government registration error:', error);
      return res.status(500).json({ 
        error: 'Registration failed',
        details: error.message 
      });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}