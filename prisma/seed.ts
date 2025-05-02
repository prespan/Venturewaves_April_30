import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { studios } from './seed-data/studios.json';
import { corporates } from './seed-data/corporates.json';
import { governments } from './seed-data/governments.json';
import { research } from './seed-data/research.json';
import { investors } from './seed-data/investors.json';
import { challenges } from './seed-data/challenges.json';
import { proposals } from './seed-data/proposals.json';

async function main() {
  await prisma.proposal.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.investor.deleteMany();
  await prisma.researchOrganization.deleteMany();
  await prisma.government.deleteMany();
  await prisma.corporate.deleteMany();
  await prisma.studio.deleteMany();

  await prisma.studio.createMany({
    data: studios.map((s: any) => ({
      name: s.name,
      website: s.url,
      address: s.country,
      description: s.description,
      keyStartups: s.keyStartups,
      logo: s.logo || ''
    }))
  });

  await prisma.corporate.createMany({
    data: corporates.map((c: any) => ({
      name: c.name,
      website: c.url,
      address: c.country,
      industryTags: c.industryTags,
      description: c.description,
      notableProducts: c.challenges,
      logo: c.logo || ''
    }))
  });

  await prisma.government.createMany({
    data: governments.map((g: any) => ({
      name: g.name,
      address: g.region,
      website: g.website,
      focusAreas: g.focusAreas,
      description: g.description,
      logo: g.logo || ''
    }))
  });

  await prisma.researchOrganization.createMany({
    data: research.map((r: any) => ({
      name: r.name,
      website: r.website,
      address: r.country,
      focusDomains: r.domains,
      description: r.description,
      logo: r.logo || ''
    }))
  });

  await prisma.investor.createMany({
    data: investors.map((i: any) => ({
      name: i.name,
      website: i.website,
      address: i.hq,
      focus: i.focus,
      notableInvestments: i.notableInvestments,
      logo: i.logo || ''
    }))
  });

  await prisma.challenge.createMany({
    data: challenges.map((c: any) => ({
      title: c.title,
      description: c.description,
      submittedBy: c.postedBy,
      deadline: new Date(c.deadline),
      postedAt: new Date(c.postedAt),
      phase1Budget: c.phase1Budget,
      capitalCommitment: c.capitalCommitment,
      equityOffered: c.equityOffered
    }))
  });

  await prisma.proposal.createMany({
    data: proposals.map((p: any) => ({
      challengeId: p.challengeId,
      title: p.title,
      description: p.description,
      actionPlan: p.actionPlan,
      submittedBy: p.submittedBy,
      submittedAt: new Date(p.submittedAt),
      status: p.status
    }))
  });

  console.log('✅ Database successfully seeded with preloaded data.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
