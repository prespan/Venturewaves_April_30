import { prisma } from '@/lib/prisma';

// Demo data for research organization registration - matching ResearchForm fields
const DEMO_DATA = {
  name: "MIT Research Lab",
  website: "https://www.mit.edu",
  address: "Cambridge, MA",
  focusDomains: ["AI/ML", "Robotics", "Materials Science", "Biotech"],
  description: "Leading research institution focused on technology and innovation.",
  logo: "/logos/mit.png"
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Return demo data for form population
    return res.status(200).json(DEMO_DATA);
  }
  
  if (req.method === 'POST') {
    try {
      const formData = req.body;
      console.log('Research organization registration attempt for:', formData.name);
      
      // Check if research organization exists first, then update or create
      const existingResearch = await prisma.researchOrganization.findFirst({
        where: { name: formData.name }
      });

      let research;
      
      if (existingResearch) {
        // Update existing research organization
        research = await prisma.researchOrganization.update({
          where: { id: existingResearch.id },
          data: {
            website: formData.website,
            address: formData.address,
            focusDomains: formData.focusDomains,
            description: formData.description,
            logo: formData.logo
          }
        });
        console.log('Research organization updated:', research.name, 'ID:', research.id);
      } else {
        // Create new research organization
        research = await prisma.researchOrganization.create({
          data: {
            name: formData.name,
            website: formData.website,
            address: formData.address,
            focusDomains: formData.focusDomains,
            description: formData.description,
            logo: formData.logo
          }
        });
        console.log('Research organization created:', research.name, 'ID:', research.id);
      }

      return res.status(200).json(research);
      
    } catch (error) {
      console.error('Research organization registration error:', error);
      return res.status(500).json({ 
        error: 'Registration failed',
        details: error.message 
      });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}