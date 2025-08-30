import { prisma } from '@/lib/prisma';

// Demo data for studio registration - updated to Antler
const DEMO_DATA = {
  id: 2,
  name: "Antler",
  website: "https://www.antler.co",
  address: "London, UK",
  description: "Global early-stage venture capital firm and startup generator.",
  keyStartups: ["Grab", "Pomelo", "Klarna", "Carsome"],
  logo: "/logos/antler.png"
};

export default async function handler(req, res) {
  console.log('🏢 Studio registration API called:', req.method);
  
  if (req.method === 'GET') {
    try {
      // First, try to get Antler from the database
      const antlerStudio = await prisma.studio.findFirst({
        where: { name: 'Antler' }
      });
      
      if (antlerStudio) {
        console.log('📤 Returning Antler data from database');
        return res.status(200).json(antlerStudio);
      } else {
        // Fallback to demo data if not found in database
        console.log('📤 Returning demo data for Antler');
        return res.status(200).json(DEMO_DATA);
      }
    } catch (error) {
      console.error('Database error, returning demo data:', error);
      return res.status(200).json(DEMO_DATA);
    }
  }
  
  if (req.method === 'POST') {
    try {
      console.log('📝 Form data received:', JSON.stringify(req.body, null, 2));
      
      const formData = req.body;
      
      // Check if this is demo/preloaded data - don't save to database
      if (formData.name === "Antler" || formData.name === "Founders Factory") {
        console.log('🚫 Skipping database save for preloaded demo data:', formData.name);
        return res.status(200).json({
          ...DEMO_DATA,
          message: "Demo registration - not saved to database"
        });
      }
      
      // Validate required fields for real registrations
      if (!formData.name || !formData.website || !formData.address || !formData.description) {
        console.log('❌ Missing required fields');
        return res.status(400).json({ 
          error: 'Missing required fields',
          missing: {
            name: !formData.name,
            website: !formData.website,
            address: !formData.address,
            description: !formData.description
          }
        });
      }
      
      // Handle keyStartups field
      let keyStartups = [];
      if (formData.keyStartups) {
        if (typeof formData.keyStartups === 'string') {
          keyStartups = formData.keyStartups.split(',').map(startup => startup.trim()).filter(startup => startup);
        } else if (Array.isArray(formData.keyStartups)) {
          keyStartups = formData.keyStartups;
        }
      }
      
      console.log('🚀 Processed keyStartups:', keyStartups);
      
      // Prepare data for database
      const studioData = {
        name: formData.name,
        website: formData.website,
        address: formData.address,
        description: formData.description,
        keyStartups: keyStartups,
        logo: formData.logo || null
      };
      
      console.log('💾 Data to be saved:', JSON.stringify(studioData, null, 2));
      
      // Check if studio exists first, then update or create
      const existingStudio = await prisma.studio.findFirst({
        where: { name: formData.name }
      });

      let studio;
      
      if (existingStudio) {
        console.log('🔄 Updating existing studio:', existingStudio.id);
        studio = await prisma.studio.update({
          where: { id: existingStudio.id },
          data: studioData
        });
      } else {
        console.log('🆕 Creating new studio');
        studio = await prisma.studio.create({
          data: {
            ...studioData,
            id: formData.name === "Antler" ? 2 : undefined // Preserve demo ID for Antler
          }
        });
      }
      
      console.log('✅ Studio saved successfully:', studio.id);
      return res.status(200).json(studio);
      
    } catch (error) {
      console.error('❌ Studio registration error details:', {
        message: error.message,
        code: error.code,
        meta: error.meta
      });
      
      return res.status(500).json({ 
        error: 'Registration failed',
        details: error.message,
        code: error.code
      });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}