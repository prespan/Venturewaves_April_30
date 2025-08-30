import { prisma } from '@/lib/prisma';

// Demo data for investor registration - matching InvestorForm fields
const DEMO_DATA = {
  id: 40,
  name: "Temasek",
  website: "https://www.temasek.com.sg",
  address: "Singapore",
  focus: ["Growth Capital", "Technology", "Financial Services", "Healthcare"],
  notableInvestments: ["Alibaba", "Tencent", "ByteDance", "Standard Chartered"],
  logo: "/logos/temasek.png"
};

export default async function handler(req, res) {
  console.log('💰 Investor registration API called:', req.method);
  
  if (req.method === 'GET') {
    console.log('📤 Returning demo data for Temasek');
    return res.status(200).json(DEMO_DATA);
  }
  
  if (req.method === 'POST') {
    try {
      console.log('📝 Form data received:', JSON.stringify(req.body, null, 2));
      
      const formData = req.body;
      
      // Check if this is demo/preloaded data - don't save to database
      if (formData.name === "Temasek" || formData.name === "Sequoia Capital") {
        console.log('🚫 Skipping database save for preloaded demo data:', formData.name);
        return res.status(200).json({
          ...DEMO_DATA,
          message: "Demo registration - not saved to database"
        });
      }
      
      // Validate required fields for real registrations
      if (!formData.name || !formData.website || !formData.address) {
        console.log('❌ Missing required fields');
        return res.status(400).json({ 
          error: 'Missing required fields',
          missing: {
            name: !formData.name,
            website: !formData.website,
            address: !formData.address
          }
        });
      }
      
      // Handle focus field
      let focus = [];
      if (formData.focus) {
        if (typeof formData.focus === 'string') {
          focus = formData.focus.split(',').map(item => item.trim()).filter(item => item);
        } else if (Array.isArray(formData.focus)) {
          focus = formData.focus;
        }
      }
      
      // Handle notableInvestments field  
      let notableInvestments = [];
      if (formData.notableInvestments) {
        if (typeof formData.notableInvestments === 'string') {
          notableInvestments = formData.notableInvestments.split(',').map(investment => investment.trim()).filter(investment => investment);
        } else if (Array.isArray(formData.notableInvestments)) {
          notableInvestments = formData.notableInvestments;
        }
      }
      
      console.log('🎯 Processed focus:', focus);
      console.log('💼 Processed notableInvestments:', notableInvestments);
      
      // Prepare data for database
      const investorData = {
        name: formData.name,
        website: formData.website,
        address: formData.address,
        focus: focus,
        notableInvestments: notableInvestments,
        logo: formData.logo || null
      };
      
      console.log('💾 Data to be saved:', JSON.stringify(investorData, null, 2));
      
      // Check if investor already exists by name
      const existingInvestor = await prisma.investor.findFirst({
        where: { name: formData.name }
      });

      let investor;
      
      if (existingInvestor) {
        console.log('🔄 Updating existing investor:', existingInvestor.id);
        investor = await prisma.investor.update({
          where: { id: existingInvestor.id },
          data: investorData
        });
      } else {
        console.log('🆕 Creating new investor');
        investor = await prisma.investor.create({
          data: investorData
        });
      }
      
      console.log('✅ Investor saved successfully:', investor.id);
      return res.status(200).json(investor);
      
    } catch (error) {
      console.error('❌ Investor registration error details:', {
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