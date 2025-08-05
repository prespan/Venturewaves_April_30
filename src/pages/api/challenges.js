// src/pages/api/challenges.js
import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // First, try to get ALL challenges from the database
    const challenges = await prisma.challenge.findMany({
      orderBy: {
        id: 'asc'
      }
      // Remove the select to get ALL fields from your schema
    });

    console.log('Database challenges found:', challenges.length);
    if (challenges.length > 0) {
      console.log('First challenge fields:', Object.keys(challenges[0]));
      console.log('First challenge data:', challenges[0]);
    }

    // Enhanced logo mapping for challenges
    const logoMap = {
      'Climate Change': '/logos/climatechange.png',
      'Renewable Energy': '/logos/renewableenergy.png',
      'Ocean Pollution': '/logos/oceanpollution.png',
      'Deforestation': '/logos/deforestation.png',
      'Water Scarcity': '/logos/waterscarcity.png',
      'Food Security': '/logos/foodsecurity.png',
      'Poverty Reduction': '/logos/poverty.png',
      'Healthcare Access': '/logos/healthcare.png',
      'Education Inequality': '/logos/education.png',
      'Digital Divide': '/logos/digitaldivide.png',
      'Cybersecurity': '/logos/cybersecurity.png',
      'Data Privacy': '/logos/dataprivacy.png',
      'AI Ethics': '/logos/aiethics.png',
      'Space Exploration': '/logos/space.png',
      'Quantum Computing': '/logos/quantum.png',
      'Biotechnology': '/logos/biotech.png',
      'Sustainable Transportation': '/logos/transport.png',
      'Smart Cities': '/logos/smartcities.png',
      'Aging Population': '/logos/aging.png',
      'Mental Health': '/logos/mentalhealth.png',
      'Social Media Impact': '/logos/socialmedia.png',
      'Financial Inclusion': '/logos/fintech.png',
      'Supply Chain': '/logos/supplychain.png',
      'Energy Storage': '/logos/energystorage.png',
      'Carbon Capture': '/logos/carboncapture.png',
      'Waste Management': '/logos/waste.png',
      'Biodiversity Loss': '/logos/biodiversity.png',
      'Drug Resistance': '/logos/drugresistance.png',
      'Pandemic Preparedness': '/logos/pandemic.png',
      'Nuclear Proliferation': '/logos/nuclear.png',
      'Economic Inequality': '/logos/inequality.png',
      'Political Polarization': '/logos/politics.png',
      'Migration Crisis': '/logos/migration.png',
      'Urban Planning': '/logos/urban.png',
      'Infrastructure': '/logos/infrastructure.png',
      'Internet Freedom': '/logos/internetfreedom.png',
      'Misinformation': '/logos/misinformation.png',
      'Gig Economy': '/logos/gigeconomy.png',
      'Automation Impact': '/logos/automation.png',
      'Gene Editing Ethics': '/logos/geneediting.png'
    };

    // Generate realistic ratings for challenges
    const generateRating = (challengeName) => {
      const ratings = {
        'Climate Change': 4.8,
        'Renewable Energy': 4.6,
        'Ocean Pollution': 4.4,
        'Deforestation': 4.5,
        'Water Scarcity': 4.7,
        'Food Security': 4.5,
        'Poverty Reduction': 4.6,
        'Healthcare Access': 4.4,
        'Education Inequality': 4.3,
        'Digital Divide': 4.2,
        'Cybersecurity': 4.7,
        'Data Privacy': 4.5,
        'AI Ethics': 4.6,
        'Space Exploration': 4.1,
        'Quantum Computing': 4.3,
        'Biotechnology': 4.4,
        'Sustainable Transportation': 4.3,
        'Smart Cities': 4.2,
        'Aging Population': 4.1,
        'Mental Health': 4.5,
        'Social Media Impact': 4.2,
        'Financial Inclusion': 4.3,
        'Supply Chain': 4.1,
        'Energy Storage': 4.4,
        'Carbon Capture': 4.2,
        'Waste Management': 4.0,
        'Biodiversity Loss': 4.4,
        'Drug Resistance': 4.3,
        'Pandemic Preparedness': 4.5,
        'Nuclear Proliferation': 4.2,
        'Economic Inequality': 4.4,
        'Political Polarization': 3.9,
        'Migration Crisis': 4.1,
        'Urban Planning': 4.0,
        'Infrastructure': 4.2,
        'Internet Freedom': 4.1,
        'Misinformation': 4.0,
        'Gig Economy': 3.9,
        'Automation Impact': 4.2,
        'Gene Editing Ethics': 4.3
      };
      
      return ratings[challengeName] || (Math.random() * 1.5 + 3.5);
    };

    // If we have database challenges, use them with their actual schema
    if (challenges.length > 0) {
      const challengesWithLogos = challenges.map(challenge => {
        let logoPath = logoMap[challenge.title];
        
        if (!logoPath) {
          const cleanName = challenge.title.toLowerCase().replace(/\s+/g, '');
          logoPath = `/logos/${cleanName}.png`;
        }
        
        console.log(`Database Challenge: "${challenge.title}" -> Logo: ${logoPath || 'NOT FOUND'}`);
        
        return {
          ...challenge,
          logo: logoPath || null,
          rating: generateRating(challenge.title)
          // Note: NOT adding fake fields - using actual database schema
        };
      });

      console.log('Returning database challenges with actual schema:', challengesWithLogos.length);
      res.status(200).json(challengesWithLogos);
      return;
    }
    // Only return sample data if no database challenges exist
    console.log('No database challenges found, returning sample data');
    const sampleChallenges = [
      {
        id: 1,
        title: "Climate Change",
        description: "Address global warming and environmental sustainability through innovative solutions",
        category: "Environmental",
        severity: "Critical",
        timeframe: "Long-term",
        stakeholders: ["Governments", "NGOs", "Corporations"],
        impact: "Global environmental preservation",
        difficulty: "Very High",
        submittedBy: "UN Environment Programme",
        logo: "/logos/climatechange.png",
        rating: 4.8
      },
      {
        id: 2,
        title: "AI for Education Equity",
        description: "Design a tool that uses AI to identify and address disparities in K-12 education access",
        category: "Technology",
        severity: "High",
        timeframe: "Medium-term",
        stakeholders: ["Educational Institutions", "Tech Companies"],
        impact: "Improved educational outcomes",
        difficulty: "High",
        submittedBy: "UNESCO",
        logo: "/logos/aiethics.png",
        rating: 3.7
      },
      {
        id: 3,
        title: "Circular City Dashboard",
        description: "Develop a digital twin platform for cities to track and optimize circular economy KPIs",
        category: "Urban Development",
        severity: "Medium",
        timeframe: "Short-term",
        stakeholders: ["City Governments", "Tech Startups"],
        impact: "Sustainable urban development",
        difficulty: "Medium",
        submittedBy: "C40 Cities Climate Leadership Group",
        logo: "/logos/smartcities.png",
        rating: 5.0
      },
      {
        id: 4,
        title: "Closed-Loop Bottle Recycling",
        description: "Prototype a city-level collection and processing system for plastic beverage bottles",
        category: "Environmental",
        severity: "High",
        timeframe: "Medium-term",
        stakeholders: ["Waste Management Companies", "City Governments"],
        impact: "Reduced plastic waste",
        difficulty: "High",
        submittedBy: "Ellen MacArthur Foundation",
        logo: "/logos/waste.png",
        rating: 4.6
      },
      {
        id: 5,
        title: "Green Building Energy Management",
        description: "Optimize building energy consumption through smart monitoring systems",
        category: "Environmental",
        severity: "Medium",
        timeframe: "Short-term",
        stakeholders: ["Property Developers", "Energy Companies"],
        impact: "Reduced energy consumption",
        difficulty: "Medium",
        submittedBy: "World Green Building Council",
        logo: "/logos/energystorage.png",
        rating: 5.0
      },
      {
        id: 6,
        title: "Predictive Maintenance for Industrial Equipment",
        description: "Predict failures using machine learning models to reduce downtime",
        category: "Technology",
        severity: "High",
        timeframe: "Short-term",
        stakeholders: ["Manufacturing Companies", "Tech Startups"],
        impact: "Reduced industrial downtime",
        difficulty: "High",
        submittedBy: "World Economic Forum",
        logo: "/logos/automation.png",
        rating: 4.2
      },
      {
        id: 7,
        title: "Ocean Plastic Pollution",
        description: "Develop innovative solutions to remove and prevent plastic pollution in oceans",
        category: "Environmental",
        severity: "Critical",
        timeframe: "Long-term",
        stakeholders: ["Marine Organizations", "Governments", "Tech Companies"],
        impact: "Ocean ecosystem preservation",
        difficulty: "Very High",
        submittedBy: "Ocean Conservancy",
        logo: "/logos/oceanpollution.png",
        rating: 4.7
      },
      {
        id: 8,
        title: "Digital Healthcare Access",
        description: "Bridge healthcare gaps in underserved communities through digital solutions",
        category: "Healthcare",
        severity: "High",
        timeframe: "Medium-term",
        stakeholders: ["Healthcare Providers", "Tech Companies", "NGOs"],
        impact: "Improved global health outcomes",
        difficulty: "High",
        submittedBy: "World Health Organization",
        logo: "/logos/healthcare.png",
        rating: 4.4
      },
      {
        id: 9,
        title: "Food Security Innovation",
        description: "Create sustainable food production systems to address global hunger",
        category: "Agriculture",
        severity: "Critical",
        timeframe: "Long-term",
        stakeholders: ["Farmers", "Governments", "Research Institutions"],
        impact: "Global food security",
        difficulty: "Very High",
        submittedBy: "World Food Programme",
        logo: "/logos/foodsecurity.png",
        rating: 4.6
      },
      {
        id: 10,
        title: "Renewable Energy Grid",
        description: "Build scalable renewable energy infrastructure for developing nations",
        category: "Energy",
        severity: "High",
        timeframe: "Long-term",
        stakeholders: ["Energy Companies", "Governments", "Investors"],
        impact: "Clean energy transition",
        difficulty: "High",
        submittedBy: "International Renewable Energy Agency",
        logo: "/logos/renewableenergy.png",
        rating: 4.5
      },
      {
        id: 11,
        title: "Water Scarcity Solutions",
        description: "Develop water purification and conservation technologies for arid regions",
        category: "Environmental",
        severity: "Critical",
        timeframe: "Medium-term",
        stakeholders: ["Water Companies", "Governments", "NGOs"],
        impact: "Clean water access",
        difficulty: "High",
        submittedBy: "Water.org",
        logo: "/logos/waterscarcity.png",
        rating: 4.8
      },
      {
        id: 12,
        title: "Cybersecurity for Small Business",
        description: "Create affordable cybersecurity solutions for small and medium enterprises",
        category: "Technology",
        severity: "High",
        timeframe: "Short-term",
        stakeholders: ["Cybersecurity Firms", "Small Businesses", "Governments"],
        impact: "Enhanced digital security",
        difficulty: "Medium",
        submittedBy: "Cybersecurity and Infrastructure Security Agency",
        logo: "/logos/cybersecurity.png",
        rating: 4.1
      },
      {
        id: 13,
        title: "Mental Health Support Systems",
        description: "Design accessible mental health platforms for underserved populations",
        category: "Healthcare",
        severity: "High",
        timeframe: "Medium-term",
        stakeholders: ["Healthcare Providers", "Tech Companies", "Communities"],
        impact: "Improved mental health outcomes",
        difficulty: "Medium",
        submittedBy: "National Alliance on Mental Illness",
        logo: "/logos/mentalhealth.png",
        rating: 4.3
      },
      {
        id: 14,
        title: "Financial Inclusion Platform",
        description: "Create banking solutions for the unbanked population in developing countries",
        category: "Finance",
        severity: "Medium",
        timeframe: "Medium-term",
        stakeholders: ["Financial Institutions", "Governments", "Tech Companies"],
        impact: "Economic empowerment",
        difficulty: "Medium",
        submittedBy: "World Bank Group",
        logo: "/logos/fintech.png",
        rating: 4.2
      },
      {
        id: 15,
        title: "Deforestation Prevention",
        description: "Implement satellite monitoring and intervention systems to prevent illegal logging",
        category: "Environmental",
        severity: "Critical",
        timeframe: "Medium-term",
        stakeholders: ["Environmental Groups", "Governments", "Tech Companies"],
        impact: "Forest conservation",
        difficulty: "High",
        submittedBy: "World Wildlife Fund",
        logo: "/logos/deforestation.png",
        rating: 4.5
      },
      {
        id: 16,
        title: "Elderly Care Technology",
        description: "Develop assistive technologies for aging populations in developed countries",
        category: "Healthcare",
        severity: "Medium",
        timeframe: "Short-term",
        stakeholders: ["Healthcare Providers", "Tech Companies", "Families"],
        impact: "Improved quality of life for elderly",
        difficulty: "Medium",
        submittedBy: "AARP Foundation",
        logo: "/logos/aging.png",
        rating: 4.0
      },
      {
        id: 17,
        title: "Space Debris Management",
        description: "Create systems to track and remove space debris threatening satellites",
        category: "Space Technology",
        severity: "Medium",
        timeframe: "Long-term",
        stakeholders: ["Space Agencies", "Satellite Companies", "Governments"],
        impact: "Safer space environment",
        difficulty: "Very High",
        submittedBy: "European Space Agency",
        logo: "/logos/space.png",
        rating: 3.9
      },
      {
        id: 18,
        title: "Drug Resistance Combat",
        description: "Develop new approaches to combat antibiotic-resistant bacteria",
        category: "Healthcare",
        severity: "Critical",
        timeframe: "Long-term",
        stakeholders: ["Pharmaceutical Companies", "Researchers", "Hospitals"],
        impact: "Global health security",
        difficulty: "Very High",
        submittedBy: "Centers for Disease Control",
        logo: "/logos/drugresistance.png",
        rating: 4.7
      },
      {
        id: 19,
        title: "Carbon Capture Innovation",
        description: "Scale carbon capture and storage technologies for industrial applications",
        category: "Environmental",
        severity: "High",
        timeframe: "Long-term",
        stakeholders: ["Industrial Companies", "Governments", "Researchers"],
        impact: "Climate change mitigation",
        difficulty: "Very High",
        submittedBy: "Global CCS Institute",
        logo: "/logos/carboncapture.png",
        rating: 4.3
      },
      {
        id: 20,
        title: "Digital Privacy Rights",
        description: "Create frameworks to protect individual privacy in the digital age",
        category: "Technology",
        severity: "Medium",
        timeframe: "Short-term",
        stakeholders: ["Tech Companies", "Governments", "Privacy Advocates"],
        impact: "Enhanced digital rights",
        difficulty: "Medium",
        submittedBy: "Electronic Frontier Foundation",
        logo: "/logos/dataprivacy.png",
        rating: 4.1
      }
    ];
    
    console.log('Returning sample challenges:', sampleChallenges);
    res.status(200).json(sampleChallenges);
    
  } catch (error) {
    console.error('Challenges API Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch challenges',
      detail: error instanceof Error ? error.message : String(error)
    });
  }
}