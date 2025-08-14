// scripts/seed-research-data.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedResearchData() {
  try {
    console.log('🌱 Starting to seed research organization dashboard data...');

    // The script should be run when you're logged in as a research organization
    // We'll populate data for whichever research org you specify when running the script
    
    // For now, let's use the research org that matches the registration form (MIT Research Lab)
    let researchOrg = await prisma.researchOrganization.findFirst({
      where: { name: 'MIT Research Lab' }
    });

    if (!researchOrg) {
      // If MIT Research Lab doesn't exist, find any research organization
      researchOrg = await prisma.researchOrganization.findFirst();
      
      if (!researchOrg) {
        console.log('❌ No research organization found. Please register first.');
        return;
      }
      
      console.log('✅ Found research organization:', researchOrg.name, '(ID:', researchOrg.id, ')');
      console.log('ℹ️ Populating data for this organization');
    } else {
      console.log('✅ Found MIT Research Lab (ID:', researchOrg.id, ')');
    }

    // Get or create studios for partners
    const studioData = [
      {
        name: 'Founders Factory',
        website: 'https://foundersfactory.com',
        address: 'London, UK',
        description: 'Corporate-backed startup studio building solutions for societal challenges.',
        keyStartups: ['Gravity Sketch', 'Onfido', 'EDITED']
      },
      {
        name: 'Idealab',
        website: 'https://idealab.com',
        address: 'Pasadena, CA, USA',
        description: 'Technology incubator focused on breakthrough innovations.',
        keyStartups: ['Overture', 'GoTo', 'CitySearch']
      },
      {
        name: 'Antler',
        website: 'https://antler.co',
        address: 'London, UK',
        description: 'Global startup generator and early-stage investor.',
        keyStartups: ['Pomelo', 'Airalo', 'Fini']
      },
      {
        name: 'High Alpha',
        website: 'https://highalpha.com',
        address: 'Indianapolis, IN, USA',
        description: 'Venture studio building B2B SaaS companies.',
        keyStartups: ['Lessonly', 'Zylo', 'Visible']
      },
      {
        name: 'Rocket Internet',
        website: 'https://rocket-internet.com',
        address: 'Berlin, Germany',
        description: 'Global venture builder focused on scaling digital businesses.',
        keyStartups: ['Zalando', 'HelloFresh', 'Delivery Hero']
      }
    ];

    const studios = [];
    for (const studioInfo of studioData) {
      // Check if studio already exists
      const existingStudio = await prisma.studio.findFirst({
        where: { name: studioInfo.name }
      });

      if (existingStudio) {
        studios.push(existingStudio);
        console.log(`🔄 Using existing studio: ${existingStudio.name}`);
      } else {
        // Create new studio
        const newStudio = await prisma.studio.create({
          data: studioInfo
        });
        studios.push(newStudio);
        console.log(`🆕 Created studio: ${newStudio.name}`);
      }
    }

    console.log('✅ Studios ready:', studios.length);

    // Create 3 research challenges
    const challengeData = [
      {
        title: 'AI-Powered Drug Discovery Platform',
        description: 'Develop machine learning algorithms to accelerate pharmaceutical research and identify promising drug compounds.',
        submittedBy: `${researchOrg.name} AI Lab`,
        deadline: new Date('2025-08-30'),
        postedAt: new Date('2025-01-10'),
        phase1Budget: 200000000, // $2,000,000 in cents
        capitalCommitment: 200000000,
        equityOffered: 15,
        hasProposals: true,
        projectLinked: true,
        researchOrgId: researchOrg.id
      },
      {
        title: 'Quantum Computing Error Correction',
        description: 'Research novel error correction methods for quantum computing systems to improve stability and performance.',
        submittedBy: `${researchOrg.name} Quantum Lab`,
        deadline: new Date('2025-09-30'),
        postedAt: new Date('2025-01-15'),
        phase1Budget: 300000000, // $3,000,000 in cents
        capitalCommitment: 300000000,
        equityOffered: 12,
        hasProposals: true,
        projectLinked: true,
        researchOrgId: researchOrg.id
      },
      {
        title: 'Sustainable Materials Innovation',
        description: 'Investigate biodegradable materials for packaging and manufacturing to reduce environmental impact.',
        submittedBy: `${researchOrg.name} Materials Science`,
        deadline: new Date('2025-10-15'),
        postedAt: new Date('2025-01-20'),
        phase1Budget: 150000000, // $1,500,000 in cents
        capitalCommitment: 150000000,
        equityOffered: 18,
        hasProposals: true,
        projectLinked: false,
        researchOrgId: researchOrg.id
      }
    ];

    const createdChallenges = [];
    
    // Get existing challenges for this research org
    const existingChallenges = await prisma.challenge.findMany({
      where: { researchOrgId: researchOrg.id }
    });
    
    // Add existing challenges to our list
    createdChallenges.push(...existingChallenges);
    
    // Create new challenges if needed
    for (const challengeInfo of challengeData) {
      const existingChallenge = existingChallenges.find(c => c.title === challengeInfo.title);
      if (!existingChallenge) {
        const challenge = await prisma.challenge.create({
          data: challengeInfo
        });
        createdChallenges.push(challenge);
        console.log(`✅ Challenge created: "${challenge.title}" (ID: ${challenge.id})`);
      } else {
        console.log(`ℹ️ Challenge already exists: "${challengeInfo.title}"`);
      }
    }

    // Create 5 proposals across the challenges
    const proposalData = [
      // 2 proposals for AI Drug Discovery
      {
        challengeId: createdChallenges[0].id,
        studioId: studios[0].id, // Founders Factory
        title: 'DrugAI Platform by Founders Factory',
        description: 'AI-powered platform that analyzes molecular structures to predict drug efficacy and side effects.',
        actionPlan: [
          'Phase 1: Algorithm Development (6 months)',
          'Phase 2: Clinical Data Integration (4 months)', 
          'Phase 3: Pharmaceutical Partnerships (6 months)'
        ],
        submittedBy: 'Founders Factory',
        status: 'APPROVED',
        partOfProject: true
      },
      {
        challengeId: createdChallenges[0].id,
        studioId: studios[1].id, // Idealab
        title: 'MolecuLearn by Idealab',
        description: 'Machine learning system for rapid compound screening and optimization.',
        actionPlan: [
          'Phase 1: Data Pipeline Creation (3 months)',
          'Phase 2: ML Model Training (5 months)',
          'Phase 3: Validation Studies (4 months)'
        ],
        submittedBy: 'Idealab',
        status: 'UNDER_REVIEW',
        partOfProject: false
      },
      // 2 proposals for Quantum Computing
      {
        challengeId: createdChallenges[1]?.id || createdChallenges[0].id,
        studioId: studios[2].id, // Antler
        title: 'QuantumShield by Antler',
        description: 'Advanced error correction protocols using topological quantum error correction.',
        actionPlan: [
          'Phase 1: Theoretical Framework (4 months)',
          'Phase 2: Simulation Testing (6 months)',
          'Phase 3: Hardware Implementation (8 months)'
        ],
        submittedBy: 'Antler',
        status: 'APPROVED',
        partOfProject: true
      },
      {
        challengeId: createdChallenges[1]?.id || createdChallenges[0].id,
        studioId: studios[3].id, // High Alpha
        title: 'QErrorFix by High Alpha',
        description: 'Software suite for real-time quantum error detection and correction.',
        actionPlan: [
          'Phase 1: Software Architecture (3 months)',
          'Phase 2: Algorithm Optimization (5 months)',
          'Phase 3: System Integration (4 months)'
        ],
        submittedBy: 'High Alpha',
        status: 'PENDING',
        partOfProject: false
      },
      // 1 proposal for Sustainable Materials
      {
        challengeId: createdChallenges[2]?.id || createdChallenges[0].id,
        studioId: studios[4].id, // Rocket Internet
        title: 'BioPack Solutions by Rocket Internet',
        description: 'Biodegradable packaging materials made from agricultural waste.',
        actionPlan: [
          'Phase 1: Material Research (5 months)',
          'Phase 2: Manufacturing Process (6 months)',
          'Phase 3: Market Testing (4 months)'
        ],
        submittedBy: 'Rocket Internet',
        status: 'APPROVED',
        partOfProject: false
      }
    ];

    const createdProposals = [];
    for (const proposalInfo of proposalData) {
      // Check if proposal already exists
      const existingProposal = await prisma.proposal.findFirst({
        where: { 
          title: proposalInfo.title,
          challengeId: proposalInfo.challengeId 
        }
      });
      
      if (!existingProposal) {
        const proposal = await prisma.proposal.create({
          data: proposalInfo
        });
        createdProposals.push(proposal);
        console.log(`✅ Proposal created: "${proposal.title}" (ID: ${proposal.id})`);
      } else {
        createdProposals.push(existingProposal);
        console.log(`ℹ️ Proposal already exists: "${proposalInfo.title}"`);
      }
    }

    // Create 3 projects from the approved proposals
    const approvedProposals = createdProposals.filter(p => p.status === 'APPROVED');
    
    for (const approvedProposal of approvedProposals) {
      // Check if project already exists
      const existingProject = await prisma.project.findFirst({
        where: { proposalId: approvedProposal.id }
      });
      
      if (!existingProject) {
        const challenge = createdChallenges.find(c => c.id === approvedProposal.challengeId);
        
        let investment, milestones;
        if (challenge.title.includes('AI') || challenge.title.includes('Drug')) {
          investment = 200000000; // $2,000,000
          milestones = [
            'Algorithm Development Complete',
            'Clinical Data Integration',
            'Pharmaceutical Partnerships'
          ];
        } else if (challenge.title.includes('Quantum')) {
          investment = 300000000; // $3,000,000
          milestones = [
            'Theoretical Framework Complete',
            'Simulation Testing',
            'Hardware Implementation'
          ];
        } else { // Sustainable Materials
          investment = 150000000; // $1,500,000
          milestones = [
            'Material Research Complete',
            'Manufacturing Process',
            'Market Testing'
          ];
        }

        const project = await prisma.project.create({
          data: {
            challengeId: approvedProposal.challengeId,
            proposalId: approvedProposal.id,
            investment: investment,
            milestones: milestones
          }
        });

        // Add project collaborators
        await prisma.projectCollaborator.create({
          data: {
            projectId: project.id,
            studioId: approvedProposal.studioId,
            role: challenge.title.includes('AI') ? 'AI Research Lead' :
                  challenge.title.includes('Quantum') ? 'Quantum Systems Lead' : 'Materials Research Lead'
          }
        });

        console.log(`✅ Project created for "${challenge.title}" (ID: ${project.id})`);
      } else {
        console.log(`ℹ️ Project already exists for proposal: "${approvedProposal.title}"`);
      }
    }

    // Update challenge flags
    await prisma.challenge.updateMany({
      where: { researchOrgId: researchOrg.id },
      data: { hasProposals: true }
    });

    // Verify everything was created
    const finalChallenges = await prisma.challenge.findMany({
      where: { researchOrgId: researchOrg.id },
      include: { proposals: true, project: true }
    });

    const finalProposals = await prisma.proposal.findMany({
      where: { challenge: { researchOrgId: researchOrg.id } },
      include: { challenge: true, Studio: true }
    });

    const finalProjects = await prisma.project.findMany({
      where: { challenge: { researchOrgId: researchOrg.id } },
      include: { challenge: true, proposal: true }
    });

    console.log('\n📊 Final Summary:');
    console.log(`Research Organization: ${researchOrg.name} (ID: ${researchOrg.id})`);
    console.log(`Challenges: ${finalChallenges.length}`);
    console.log(`Proposals: ${finalProposals.length}`);
    console.log(`Projects: ${finalProjects.length}`);
    console.log(`Studios: ${studios.length}`);

    console.log('\n🎉 Research organization dashboard data seeded successfully!');
    console.log(`Your dashboard at /dashboard/research?id=${researchOrg.id} should now show real data.`);

  } catch (error) {
    console.error('❌ Error seeding research data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedResearchData()
  .catch((error) => {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  });