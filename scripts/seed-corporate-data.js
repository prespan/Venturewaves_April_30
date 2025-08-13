// scripts/seed-corporate-data.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedCorporateData() {
  try {
    console.log('🌱 Starting to seed corporate dashboard data...');

    // Create or find Siemens (ID should be 92 based on your URL)
    let siemens = await prisma.corporate.upsert({
      where: { id: 92 },
      update: {},
      create: {
        id: 92,
        name: 'Siemens AG',
        website: 'https://www.siemens.com',
        address: 'Munich, Germany',
        description: 'Global technology company focused on industry, energy, and healthcare solutions.',
        industryTags: JSON.stringify(['Technology', 'Industrial', 'Energy', 'Healthcare']),
        notableProducts: JSON.stringify([
          'Industrial Automation Systems',
          'Energy Management Solutions', 
          'Medical Imaging Equipment',
          'Smart Grid Technology'
        ]),
        logo: '/logos/siemens.png'
      }
    });

    console.log('✅ Siemens corporate entity ready:', siemens.id);

    // Create studios for partners
    const studios = await Promise.all([
      prisma.studio.upsert({
        where: { name: 'Betaworks' },
        update: {},
        create: {
          name: 'Betaworks',
          website: 'https://betaworks.com',
          address: 'New York, USA',
          description: 'Product-focused studio for consumer apps and emerging technologies.',
          keyStartups: JSON.stringify(['Giphy', 'Tumblr', 'Twitter'])
        }
      }),
      prisma.studio.upsert({
        where: { name: 'Antler' },
        update: {},
        create: {
          name: 'Antler',
          website: 'https://antler.co',
          address: 'London, UK', 
          description: 'Global startup generator and early-stage investor.',
          keyStartups: JSON.stringify(['Pomelo', 'Airalo', 'Fini'])
        }
      }),
      prisma.studio.upsert({
        where: { name: 'eFounders' },
        update: {},
        create: {
          name: 'eFounders',
          website: 'https://efounders.com',
          address: 'Paris, France',
          description: 'Startup studio focused on SaaS companies.',
          keyStartups: JSON.stringify(['Aircall', 'Spendesk', 'Front'])
        }
      })
    ]);

    console.log('✅ Studios created:', studios.length);

    // Create challenges
    const challenges = [
      {
        title: 'Smart Energy Grid Optimization',
        description: 'Enhance grid efficiency using AI and IoT. Looking for innovative solutions to optimize energy distribution and reduce carbon footprint.',
        submittedBy: 'Siemens AG Energy Division',
        deadline: new Date('2025-07-30'),
        postedAt: new Date('2025-01-15'),
        phase1Budget: 50000000, // $500,000 in cents
        capitalCommitment: 200000000, // $2,000,000 in cents
        equityOffered: 15,
        corporateId: siemens.id
      },
      {
        title: 'Predictive Maintenance for Industrial Equipment',
        description: 'Predict failures using machine learning models. Reduce downtime and maintenance costs through advanced analytics.',
        submittedBy: 'Siemens AG Digital Industries',
        deadline: new Date('2025-08-15'),
        postedAt: new Date('2025-01-20'),
        phase1Budget: 70000000, // $700,000 in cents
        capitalCommitment: 280000000, // $2,800,000 in cents
        equityOffered: 12,
        corporateId: siemens.id
      },
      {
        title: 'Green Building Energy Management',
        description: 'Optimize building energy consumption. Develop smart systems for sustainable urban development.',
        submittedBy: 'Siemens AG Smart Infrastructure',
        deadline: new Date('2025-09-01'),
        postedAt: new Date('2025-01-25'),
        phase1Budget: 90000000, // $900,000 in cents
        capitalCommitment: 360000000, // $3,600,000 in cents
        equityOffered: 20,
        corporateId: siemens.id
      }
    ];

    const createdChallenges = [];
    for (const challengeData of challenges) {
      const challenge = await prisma.challenge.upsert({
        where: { title: challengeData.title },
        update: challengeData,
        create: challengeData
      });
      createdChallenges.push(challenge);
      console.log(`✅ Challenge created: "${challenge.title}" (ID: ${challenge.id})`);
    }

    // Create proposals for these challenges
    const proposals = [
      {
        challengeId: createdChallenges[0].id, // Smart Energy Grid
        studioId: studios[1].id, // Antler
        title: 'GridIQ - AI-Powered Energy Distribution',
        description: 'Revolutionary AI platform that optimizes energy grid distribution in real-time using machine learning algorithms.',
        actionPlan: JSON.stringify([
          'Phase 1: Algorithm Development (3 months)',
          'Phase 2: Pilot Testing (4 months)', 
          'Phase 3: Scale Implementation (6 months)'
        ]),
        submittedBy: 'Antler Portfolio Team',
        status: 'PENDING'
      },
      {
        challengeId: createdChallenges[0].id, // Smart Energy Grid
        studioId: studios[0].id, // Betaworks
        title: 'SmartGrid X - Consumer Energy Platform',
        description: 'Consumer-facing platform that gamifies energy consumption and integrates with smart grid infrastructure.',
        actionPlan: JSON.stringify([
          'Phase 1: MVP Development (2 months)',
          'Phase 2: User Testing (3 months)',
          'Phase 3: Grid Integration (4 months)'
        ]),
        submittedBy: 'Betaworks Product Team',
        status: 'UNDER_REVIEW'
      },
      {
        challengeId: createdChallenges[1].id, // Predictive Maintenance
        studioId: studios[2].id, // eFounders
        title: 'EquipPredict - Industrial IoT Analytics',
        description: 'SaaS platform providing predictive maintenance analytics for industrial equipment using IoT sensors.',
        actionPlan: JSON.stringify([
          'Phase 1: Sensor Integration (3 months)',
          'Phase 2: ML Model Training (4 months)',
          'Phase 3: Customer Pilot (3 months)'
        ]),
        submittedBy: 'eFounders Technical Team',
        status: 'APPROVED'
      }
    ];

    const createdProposals = [];
    for (const proposalData of proposals) {
      const proposal = await prisma.proposal.create({
        data: proposalData
      });
      createdProposals.push(proposal);
      console.log(`✅ Proposal created: "${proposal.title}" (ID: ${proposal.id})`);
    }

    // Create a project from the approved proposal
    const approvedProposal = createdProposals.find(p => p.status === 'APPROVED');
    if (approvedProposal) {
      const project = await prisma.project.create({
        data: {
          challengeId: approvedProposal.challengeId,
          proposalId: approvedProposal.id,
          investment: 70000000, // $700,000 in cents
          milestones: JSON.stringify([
            'Sensor Integration Complete',
            'ML Model Training In Progress', 
            'Customer Pilot Preparation',
            'Scale Deployment Planning'
          ])
        }
      });

      // Add project collaborators
      await prisma.projectCollaborator.create({
        data: {
          projectId: project.id,
          studioId: studios[2].id, // eFounders
          role: 'Lead Developer'
        }
      });

      console.log(`✅ Project created: ID ${project.id}`);
    }

    // Verify everything was created
    const finalChallenges = await prisma.challenge.findMany({
      where: { corporateId: siemens.id },
      include: { proposals: true, project: true }
    });

    const finalProposals = await prisma.proposal.findMany({
      where: { challenge: { corporateId: siemens.id } },
      include: { challenge: true, Studio: true }
    });

    const finalProjects = await prisma.project.findMany({
      where: { challenge: { corporateId: siemens.id } },
      include: { challenge: true, proposal: true }
    });

    console.log('\n📊 Final Summary:');
    console.log(`Corporate: ${siemens.name} (ID: ${siemens.id})`);
    console.log(`Challenges: ${finalChallenges.length}`);
    console.log(`Proposals: ${finalProposals.length}`);
    console.log(`Projects: ${finalProjects.length}`);
    console.log(`Studios: ${studios.length}`);

    console.log('\n🎉 Corporate dashboard data seeded successfully!');
    console.log(`Your dashboard at /dashboard/corporate?id=${siemens.id} should now show real data.`);

  } catch (error) {
    console.error('❌ Error seeding corporate data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedCorporateData()
  .catch((error) => {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  });