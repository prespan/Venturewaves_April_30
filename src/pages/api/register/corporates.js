import { prisma } from '@/lib/prisma';

// Demo data for Corporate registration (matching your Prisma schema)
const DEMO_DATA = {
  id: 1,
  name: "Siemens",
  website: "https://www.siemens.com",
  address: "Munich, Germany", 
  description: "A global leader in electrification, automation, and digitalization.",
  industryTags: ["Technology", "Industrial", "Energy", "Healthcare"],
  notableProducts: ["Industrial Automation Systems", "Energy Management Solutions", "Medical Imaging Equipment"],
  logo: "/logos/siemens.png"
};

export default async function handler(req, res) {
  console.log('🔧 Corporate registration API called:', req.method);
  
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
      
      // Handle industryTags field
      let industryTags = [];
      if (formData.industryTags) {
        if (typeof formData.industryTags === 'string') {
          industryTags = formData.industryTags.split(',').map(tag => tag.trim()).filter(tag => tag);
        } else if (Array.isArray(formData.industryTags)) {
          industryTags = formData.industryTags;
        }
      }
      
      // Handle notableProducts field  
      let notableProducts = [];
      if (formData.notableProducts) {
        if (typeof formData.notableProducts === 'string') {
          notableProducts = formData.notableProducts.split(',').map(product => product.trim()).filter(product => product);
        } else if (Array.isArray(formData.notableProducts)) {
          notableProducts = formData.notableProducts;
        }
      }
      
      console.log('🏷️ Processed industryTags:', industryTags);
      console.log('📦 Processed notableProducts:', notableProducts);
      
      // Prepare data for database
      const corporateData = {
        name: formData.name,
        website: formData.website,
        address: formData.address,
        description: formData.description,
        industryTags: industryTags,
        notableProducts: notableProducts,
        logo: formData.logo || null
      };
      
      console.log('💾 Data to be saved:', JSON.stringify(corporateData, null, 2));
      
      // Check if corporate already exists by name
      const existingCorporate = await prisma.corporate.findFirst({
        where: { name: formData.name }
      });
      
      let corporate;
      
      if (existingCorporate) {
        console.log('🔄 Updating existing corporate:', existingCorporate.id);
        // Update existing corporate
        corporate = await prisma.corporate.update({
          where: { id: existingCorporate.id },
          data: corporateData
        });
      } else {
        console.log('🆕 Creating new corporate');
        // Create new corporate
        corporate = await prisma.corporate.create({
          data: {
            ...corporateData,
            id: formData.name === "Siemens" ? 1 : undefined // Preserve demo ID for Siemens
          }
        });
      }
      
      console.log('✅ Corporate saved successfully:', corporate.id);
      return res.status(200).json(corporate);
      
    } catch (error) {
      console.error('❌ Corporate registration error details:', {
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