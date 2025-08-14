import { prisma } from '@/lib/prisma';

// Demo data for Government registration
const DEMO_DATA = {
  id: 1, // or whatever ID you want for demo government
  name: "Innovate UK",
  website: "https://www.gov.uk/government/organisations/innovate-uk",
  address: "Swindon, United Kingdom",
  description: "UK's innovation agency driving productivity and economic growth through innovation.",
  focusAreas: ["Digital Health", "Climate Technology", "Smart Cities", "Clean Technology"],
  logo: "/logos/innovate-uk.png"
};

export default async function handler(req, res) {
  console.log('🔧 Government registration API called:', req.method);
  
  if (req.method === 'GET') {
    console.log('📤 Returning demo data');
    return res.status(200).json(DEMO_DATA);
  }
  
  if (req.method === 'POST') {
    try {
      console.log('📝 Form data received:', JSON.stringify(req.body, null, 2));
      
      const formData = req.body;
      
      // Validate required fields
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
      
      // Handle focusAreas field
      let focusAreas = [];
      if (formData.focusAreas) {
        if (typeof formData.focusAreas === 'string') {
          focusAreas = formData.focusAreas.split(',').map(area => area.trim()).filter(area => area);
        } else if (Array.isArray(formData.focusAreas)) {
          focusAreas = formData.focusAreas;
        }
      }
      
      console.log('🎯 Processed focusAreas:', focusAreas);
      
      // Prepare data for database
      const governmentData = {
        name: formData.name,
        website: formData.website,
        address: formData.address,
        description: formData.description,
        focusAreas: focusAreas,
        logo: formData.logo || null
      };
      
      console.log('💾 Data to be saved:', JSON.stringify(governmentData, null, 2));
      
      // Check if government already exists by name
      const existingGovernment = await prisma.government.findFirst({
        where: { name: formData.name }
      });
      
      let government;
      
      if (existingGovernment) {
        console.log('🔄 Updating existing government:', existingGovernment.id);
        // Update existing government
        government = await prisma.government.update({
          where: { id: existingGovernment.id },
          data: governmentData
        });
      } else if (formData.name === "Innovate UK") {
        console.log('🚫 Demo registration - not creating new record');
        // For demo Innovate UK, return demo data without creating a new record
        government = {
          id: 1,
          ...governmentData,
          createdAt: new Date()
        };
      } else {
        console.log('🆕 Creating new government for non-demo registration');
        // Create new government for real registrations (non-demo)
        government = await prisma.government.create({
          data: governmentData
        });
      }
      
      console.log('✅ Government saved successfully:', government.id);
      return res.status(200).json(government);
      
    } catch (error) {
      console.error('❌ Government registration error details:', {
        message: error.message,
        code: error.code,
        meta: error.meta,
        stack: error.stack
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