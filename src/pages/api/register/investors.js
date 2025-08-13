import { prisma } from '@/lib/prisma';

// Demo data for investor registration - matching InvestorForm fields
const DEMO_DATA = {
  name: "Sequoia Capital",
  website: "https://www.sequoiacap.com",
  address: "Menlo Park, CA",
  focus: ["Early Stage", "SaaS", "FinTech", "Climate Tech"],
  notableInvestments: ["Stripe", "Airbnb", "WhatsApp", "Google"],
  logo: "/logos/sequoia.png"
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Return demo data for form population
    return res.status(200).json(DEMO_DATA);
  }
  
  if (req.method === 'POST') {
    try {
      const formData = req.body;
      console.log('Investor registration attempt for:', formData.name);
      
      // Check if investor exists first, then update or create
      const existingInvestor = await prisma.investor.findFirst({
        where: { name: formData.name }
      });

      let investor;
      
      if (existingInvestor) {
        // Update existing investor
        investor = await prisma.investor.update({
          where: { id: existingInvestor.id },
          data: {
            website: formData.website,
            address: formData.address,
            focus: formData.focus,
            notableInvestments: formData.notableInvestments,
            logo: formData.logo
          }
        });
        console.log('Investor updated:', investor.name, 'ID:', investor.id);
      } else {
        // Create new investor
        investor = await prisma.investor.create({
          data: {
            name: formData.name,
            website: formData.website,
            address: formData.address,
            focus: formData.focus,
            notableInvestments: formData.notableInvestments,
            logo: formData.logo
          }
        });
        console.log('Investor created:', investor.name, 'ID:', investor.id);
      }

      return res.status(200).json(investor);
      
    } catch (error) {
      console.error('Investor registration error:', error);
      return res.status(500).json({ 
        error: 'Registration failed',
        details: error.message 
      });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}