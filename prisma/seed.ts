// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ✅ Correct imports for JSON files (default export)
import studiosData from './seed-data/studios.json';
import corporatesData from './seed-data/corporates.json';
import governmentsData from './seed-data/governments.json';
import researchData from './seed-data/research.json';
import investorsData from './seed-data/investors.json';
import challengesData from './seed-data/challenges.json';
import proposalsData from './seed-data/proposals.json';

async function main() {
  // Clean slate
  await prisma.proposal.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.investor.deleteMany();
  await prisma.researchOrganization.deleteMany();
  await prisma.government.deleteMany();
  await prisma.corporate.deleteMany();
  await prisma.studio.deleteMany();

  // Seed studios
  await prisma.studio.createMany({
    data: studiosData.map((s) => ({
      name: s.name,
      website: s.url,
      address: s.country,
      description: s.description,
      keyStartups: s.keyStartups,
      logo: s.logo || null,
    })),
  });

  // Seed corporates
  await prisma.corporate.createMany({
    data: corporatesData.map((c) => ({
      name: c.name,
      website: c.url,
      address: c.country,
      industryTags: c.industryTags,
      description: c.description,
      notableProducts: c.challenges,
      logo: c.logo || null,
    })),
  });

  // Seed governments
  await prisma.government.createMany({
    data: governmentsData.map((g) => ({
      name: g.name,
      address: g.region,
      website: g.website,
      focusAreas: g.focusAreas,
      description: g.description,
      logo: g.logo || null,
    })),
  });

  // Seed research organizations
  await prisma.researchOrganization.createMany({
    data: researchData.map((r) => ({
      name: r.name,
      website: r.website,
      address: r.country,
      focusDomains: r.domains,
      description: r.description,
      logo: r.logo || null,
    })),
  });

  // Seed investors
  await prisma.investor.createMany({
    data: investorsData.map((i) => ({
      name: i.name,
      website: i.website,
      address: i.hq,
      focus: i.focus,
      notableInvestments: i.notableInvestments,
      logo: i.logo || null,
    })),
  });

  // Seed challenges
  await prisma.challenge.createMany({
    data: challengesData.map((c) => ({
      title: c.title,
      description: c.description,
      submittedBy: c.postedBy,
      deadline: new Date(c.deadline),
      postedAt: new Date(c.postedAt),
      phase1Budget: c.phase1Budget,
      capitalCommitment: c.capitalCommitment,
      equityOffered: c.equityOffered,
    })),
  });

  // Seed proposals
  await prisma.proposal.createMany({
    data: proposalsData.map((p) => ({
      challengeId: p.challengeId,
      title: p.title,
      description: p.description,
      actionPlan: p.actionPlan,
      submittedBy: p.submittedBy,
      submittedAt: new Date(p.submittedAt),
      status: p.status,
    })),
  });

  console.log('✅ Seed complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
