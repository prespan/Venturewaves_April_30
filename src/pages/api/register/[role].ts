// src/pages/api/register/[role].ts

import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Sample demo data for each organization type
const sampleData = {
  corporate: {
    name: "Siemens",
    website: "https://www.siemens.com",
    address: "Munich, Germany",
    industryTags: ["Mobility", "Energy", "Automation"],
    description: "A global leader in electrification, automation, and digitalization.",
    notableProducts: ["Smart Grid Optimization", "Sustainable Urban Mobility"],
    logo: "/logos/siemens.png"
  },
  studio: {
    name: "Antler",
    website: "https://www.antler.co",
    address: "Singapore",
    description: "Global early-stage VC and startup generator.",
    keyStartups: ["Airalo", "Reebelo", "TrustingSocial"],
    logo: "/logos/antler.png"
  },
  government: {
    name: "Innovate UK",
    website: "https://www.gov.uk/government/organisations/innovate-uk",
    address: "Swindon, UK",
    focusAreas: ["Smart Cities", "Digital Health", "Climate Tech"],
    description: "UK's innovation agency driving productivity and economic growth.",
    logo: "/logos/innovateuk.png"
  },
  investor: {
    name: "Temasek",
    website: "https://www.temasek.com.sg",
    address: "Singapore",
    focus: ["Deep Tech", "Sustainability", "Healthcare"],
    notableInvestments: ["Grab", "Sea Limited", "Shopee"],
    logo: "/logos/temasek.png"
  },
  research: {
    name: "Fraunhofer Institute",
    website: "https://www.fraunhofer.de",
    address: "Munich, Germany",
    focusDomains: ["AI/ML", "Robotics", "Materials Science"],
    description: "Europe's largest application-oriented research organization.",
    logo: "/logos/fraunhofer.png"
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { role } = req.query

  // Handle GET requests (for demo data)
  if (req.method === 'GET') {
    const sample = sampleData[role as keyof typeof sampleData]
    if (sample) {
      return res.status(200).json(sample)
    } else {
      return res.status(404).json({ error: `No sample data for role: ${role}` })
    }
  }

  // Handle POST requests (for actual registration)
  if (req.method === 'POST') {
    try {
      let result

      switch (role) {
        case 'corporate':
          result = await prisma.corporate.create({
            data: {
              name: req.body.name,
              website: req.body.website,
              address: req.body.address,
              industryTags: req.body.industryTags || [],
              description: req.body.description,
              notableProducts: req.body.notableProducts || [],
              logo: req.body.logo || null,
            }
          })
          break

        case 'studio':
          result = await prisma.studio.create({
            data: {
              name: req.body.name,
              website: req.body.website,
              address: req.body.address,
              description: req.body.description,
              keyStartups: req.body.keyStartups || [],
              logo: req.body.logo || null,
            }
          })
          break

        case 'government':
          result = await prisma.government.create({
            data: {
              name: req.body.name,
              address: req.body.address,
              website: req.body.website,
              focusAreas: req.body.focusAreas || [],
              description: req.body.description,
              logo: req.body.logo || null,
            }
          })
          break

        case 'investor':
          result = await prisma.investor.create({
            data: {
              name: req.body.name,
              website: req.body.website,
              address: req.body.address,
              focus: req.body.focus || [],
              notableInvestments: req.body.notableInvestments || [],
              logo: req.body.logo || null,
            }
          })
          break

        case 'research':
          result = await prisma.researchOrganization.create({
            data: {
              name: req.body.name,
              website: req.body.website,
              address: req.body.address,
              focusDomains: req.body.focusDomains || [],
              description: req.body.description,
              logo: req.body.logo || null,
            }
          })
          break

        default:
          return res.status(400).json({ error: 'Invalid role' })
      }

      res.status(201).json(result)
    } catch (error) {
      console.error('Registration error:', error)
      res.status(500).json({ error: 'Registration failed' })
    } finally {
      await prisma.$disconnect()
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}