// prisma/seed.mts
import { PrismaClient } from '@prisma/client'
import studios from './seed-data/studios.json' assert { type: 'json' }
import corporates from './seed-data/corporates.json' assert { type: 'json' }
import governments from './seed-data/governments.json' assert { type: 'json' }
import research from './seed-data/research.json' assert { type: 'json' }
import investors from './seed-data/investors.json' assert { type: 'json' }
import challenges from './seed-data/challenges.json' assert { type: 'json' }
import proposals from './seed-data/proposals.json' assert { type: 'json' }

const prisma = new PrismaClient()

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
      keyStartups: s.keyStartups,
      logo: s.logo || null
    }))
  })

  await prisma.corporate.createMany({
    data: corporates.map(c => ({
      name: c.name,
      website: c.url,
      address: c.country,
      industryTags: c.industryTags,
      description: c.description,
      notableProducts: c.challenges,
      logo: c.logo || null
    }))
  })

  await prisma.government.createMany({
    data: governments.map(g => ({
      name: g.name,
      address: g.region,
      website: g.website,
      focusAreas: g.focusAreas,
      description: g.description,
      logo: g.logo || null
    }))
  })

  await prisma.researchOrganization.createMany({
    data: research.map(r => ({
      name: r.name,
      website: r.website,
      address: r.country,
      focusDomains: r.domains,
      description: r.description,
      logo: r.logo || null
    }))
  })

  await prisma.investor.createMany({
    data: investors.map(i => ({
      name: i.name,
      website: i.website,
      address: i.hq,
      focus: i.focus,
      notableInvestments: i.notableInvestments,
      logo: i.logo || null
    }))
  })

  await prisma.challenge.createMany({
    data: challenges.map(c => ({
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
      actionPlan: p.actionPlan,
      submittedBy: p.submittedBy,
      submittedAt: new Date(p.submittedAt),
      status: p.status
    }))
  })

  console.log('✅ Database successfully seeded.')
}

main()
  .catch(e => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
