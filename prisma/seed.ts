// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { studios, corporates, governments, research, investors, challenges, proposals } from './seed-data'

async function main() {
  await prisma.proposal.deleteMany()
  await prisma.challenge.deleteMany()
  await prisma.investor.deleteMany()
  await prisma.researchOrganization.deleteMany()
  await prisma.government.deleteMany()
  await prisma.corporate.deleteMany()
  await prisma.studio.deleteMany()

  await prisma.studio.createMany({
    data: studios.map(s => ({
      name: s.name,
      website: s.url,
      address: s.country,
      description: s.description,
      keyStartups: JSON.stringify(s.keyStartups),
      logo: s.logo || ''
    }))
  })

  await prisma.corporate.createMany({
    data: corporates.map(c => ({
      name: c.name,
      website: c.url,
      address: c.country,
      industryTags: JSON.stringify(c.industryTags),
      description: c.description,
      notableProducts: c.challenges.join(', '),
      logo: c.logo || ''
    }))
  })

  await prisma.government.createMany({
    data: governments.map(g => ({
      name: g.name,
      address: g.region,
      website: g.website,
      focusAreas: JSON.stringify(g.focusAreas),
      description: g.description,
      logo: g.logo || ''
    }))
  })

  await prisma.researchOrganization.createMany({
    data: research.map(r => ({
      name: r.name,
      website: r.website,
      address: r.country,
      focusDomains: JSON.stringify(r.domains),
      description: r.description,
      logo: r.logo || ''
    }))
  })

  await prisma.investor.createMany({
    data: investors.map(i => ({
      name: i.name,
      website: i.website,
      address: i.hq,
      focus: JSON.stringify(i.focus),
      notableInvestments: JSON.stringify(i.notableInvestments),
      logo: i.logo || ''
    }))
  })

  await prisma.challenge.createMany({
    data: challenges.map((c, index) => ({
      title: c.title,
      description: c.description,
      submittedBy: c.postedBy,
      deadline: new Date(c.deadline),
      postedAt: new Date(c.postedAt),
      phase1Budget: c.phase1Budget,
      capitalCommitment: c.capitalCommitment,
      equityOffered: c.equityOffered
    }))
  })

  await prisma.proposal.createMany({
    data: proposals.map(p => ({
      challengeId: p.challengeId,
      title: p.title,
      description: p.description,
      actionPlan: JSON.stringify(p.actionPlan),
      submittedBy: p.submittedBy,
      submittedAt: new Date(p.submittedAt),
      status: p.status
    }))
  })

  console.log('✅ Database successfully seeded with preloaded data.')
}

main()
  .catch(e => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())

