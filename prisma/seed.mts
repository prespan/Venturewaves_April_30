import { PrismaClient } from '@prisma/client';

// Importing JSON data (ESM supports JSON imports only if node supports them or using tsconfig json module import)
import studios from './seed-data/studios.json' assert { type: 'json' };
import corporates from './seed-data/corporates.json' assert { type: 'json' };
import governments from './seed-data/governments.json' assert { type: 'json' };
import research from './seed-data/research.json' assert { type: 'json' };
import investors from './seed-data/investors.json' assert { type: 'json' };
import challenges from './seed-data/challenges.json' assert { type: 'json' };
import proposals from './seed-data/proposals.json' assert { type: 'json' };
import projects from './seed-data/projects.json' assert { type: 'json' };

const prisma = new PrismaClient();

async function main() {
  console.log('⚙️ Resetting database...');

  // Respecting relation deletion order
  await prisma.projectCollaborator.deleteMany();
  await prisma.project.deleteMany();
  await prisma.proposal.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.investor.deleteMany();
  await prisma.researchOrganization.deleteMany();
  await prisma.government.deleteMany();
  await prisma.corporate.deleteMany();
  await prisma.studio.deleteMany();

  console.log('🌱 Seeding Studios...');
  await prisma.studio.createMany({
    data: studios
  });

  console.log('🌱 Seeding Corporates...');
  await prisma.corporate.createMany({
    data: corporates
  });

  console.log('🌱 Seeding Governments...');
  await prisma.government.createMany({
    data: governments
  });

  console.log('🌱 Seeding Research Organizations...');
  await prisma.researchOrganization.createMany({
    data: research
  });

  console.log('🌱 Seeding Investors...');
  await prisma.investor.createMany({
    data: investors
  });

  console.log('🌱 Seeding Challenges...');
  await prisma.challenge.createMany({
    data: challenges.map(c => ({
      title: c.title,
      description: c.description,
      submittedBy: c.submittedBy,
      deadline: new Date(c.deadline),
      postedAt: new Date(c.postedAt),
      phase1Budget: c.phase1Budget,
      capitalCommitment: c.capitalCommitment,
      equityOffered: c.equityOffered,
      corporateId: c.corporateId ?? null,
      governmentId: c.governmentId ?? null,
      researchOrgId: c.researchOrgId ?? null,
      hasProposals: c.hasProposals ?? false,
      projectLinked: c.projectLinked ?? false
    }))
  });

  console.log('🌱 Seeding Proposals...');
  await prisma.proposal.createMany({
    data: proposals.map(p => ({
      challengeId: p.challengeId,
      title: p.title,
      description: p.description,
      actionPlan: p.actionPlan,
      submittedBy: p.submittedBy,
      submittedAt: new Date(p.submittedAt),
      status: p.status,
      studioId: p.studioId ?? null
    }))
  });

  console.log('🌱 Seeding Projects...');
  await prisma.project.createMany({
    data: projects.map(p => ({
      challengeId: p.challengeId,
      proposalId: p.proposalId,
      investment: p.investment,
      milestones: p.milestones,
      createdAt: new Date(p.createdAt)
    }))
  });

  console.log('✅ Database successfully seeded.');
}

main()
  .catch(e => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });