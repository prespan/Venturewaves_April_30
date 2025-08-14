// scripts/seed-government-data.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedGovernmentData() {
  try {
    console.log('🌱 Starting to seed government dashboard data...');

    // Find existing Innovate UK government (should be ID=1)
    let innovateUK = await prisma.government.findFirst({
      where: { name: 'Innovate UK' }
    });

    if (!innovateUK) {
      // Create Innovate UK if it doesn't exist (let DB auto-generate ID)
      innovateUK = await prisma.government.create({
        data: {
          name: 'Innovate UK',
          website: 'https://www.gov.uk/government/organisations/innovate-uk',
          address: 'Swindon, United Kingdom',
          description: 'UK\'s innovation agency driving productivity and economic growth through innovation.',
          focusAreas: [
            'Digital Health',
            'Climate Technology', 
            'Smart Cities',
            'Clean Technology',
            'AI & Data',
            'Green Energy'
          ]
        }
      });
    }

    console.log('✅ Innovate UK government entity ready:', innovateUK.id);

    // Create studios for partners (reuse existing or create new ones)
    const studioData = [
      {
        name: 'Founders Factory',
        website: 'https://foundersfactory.com',
        address: 'London, UK',
        description: 'Corporate-backed startup studio building solutions for societal challenges.',
        keyStartups: ['Gravity Sketch', 'Onfido', 'EDITED']
      },
      {
        name: 'Rocket Internet',
        website: 'https://rocket-internet.com',
        address: 'Berlin, Germany',
        description: 'Global venture builder focused on scaling digital businesses.',
        keyStartups: ['Zalando', 'HelloFresh', 'Delivery Hero']
      },
      {
        name: 'eFounders',
        website: 'https://efounders.com',
        address: 'Paris, France',
        description: 'Startup studio focused on SaaS companies.',
        keyStartups: ['Aircall', 'Spendesk', 'Front']
      },
      {
        name: 'Antler',
        website: 'https://antler.co',
        address: 'London, UK',
        description: 'Global startup generator and early-stage investor.',
        keyStartups: ['Pomelo', 'Airalo', 'Fini']
      },
      {
        name: 'BCG Digital Ventures',
        website: 'https://bcgdv.com',
        address: 'London, UK',
        description: 'Corporate investment and incubation arm of Boston Consulting Group.',
        keyStartups: ['Plataine', 'Faraday', 'Brighterion']
      }
    ];

    const studios = [];
    for (const studioInfo of studioData) {
      // Check if studio already exists
      const existingStudio = await prisma.studio.findFirst({
        where: { name: studioInfo.name }
      });

      if (existingStudio) {
        // Update existing studio
        const updatedStudio = await prisma.studio.update({
          where: { id: existingStudio.id },
          data: studioInfo
        });
        studios.push(updatedStudio);
        console.log(`🔄 Updated studio: ${updatedStudio.name}`);
      } else {
        // Create new studio
        const newStudio = await prisma.studio.create({
          data: studioInfo
        });
        studios.push(newStudio);
        console.log(`🆕 Created studio: ${newStudio.name}`);
      }
    }

    console.log('✅ Studios created/updated:', studios.length);

    // Create 2 additional challenges (you already have 1 "Waterless Hygiene Solutions")
    const additionalChallenges = [
      {
        title: 'Digital Health Records Integration',
        description: 'Create a unified digital health platform for secure patient data sharing across healthcare providers.',
        submittedBy: 'Innovate UK Health Division',
        deadline: new Date('2025-09-15'),
        postedAt: new Date('2025-01-15'),
        phase1Budget: 150000000, // $1,500,000 in cents
        capitalCommitment: 150000000,
        equityOffered: 7,
        hasProposals: true,
        projectLinked: true,
        governmentId: innovateUK.id
      },
      {
        title: 'Climate Change Monitoring System',
        description: 'Deploy advanced sensors and analytics for real-time environmental monitoring and climate impact assessment.',
        submittedBy: 'Innovate UK Environment Team',
        deadline: new Date('2025-10-01'),
        postedAt: new Date('2025-01-20'),
        phase1Budget: 300000000, // $3,000,000 in cents
        capitalCommitment: 300000000,
        equityOffered: 10,
        hasProposals: true,
        projectLinked: true,
        governmentId: innovateUK.id
      }
    ];

    const createdChallenges = [];
    
    // Get all challenges for this government
    const allChallenges = await prisma.challenge.findMany({
      where: { governmentId: innovateUK.id }
    });
    
    // Add existing challenges to our list
    createdChallenges.push(...allChallenges);
    
    // Create additional challenges if needed
    for (const challengeData of additionalChallenges) {
      const existingChallenge = allChallenges.find(c => c.title === challengeData.title);
      if (!existingChallenge) {
        const challenge = await prisma.challenge.create({
          data: challengeData
        });
        createdChallenges.push(challenge);
        console.log(`✅ Challenge created: "${challenge.title}" (ID: ${challenge.id})`);
      } else {
        console.log(`ℹ️ Challenge already exists: "${challengeData.title}"`);
      }
    }

    // Create 5 proposals across the challenges
    const proposals = [
      // 2 proposals for first challenge (Waterless Hygiene or first available)
      {
        challengeId: createdChallenges[0].id,
        studioId: studios[0].id, // Founders Factory
        title: 'HygieneTech Solution by Founders Factory',
        description: 'Innovative water-free hygiene products using advanced nano-technology for disaster relief areas.',
        actionPlan: [
          'Phase 1: Research & Development (4 months)',
          'Phase 2: Prototype Testing (3 months)', 
          'Phase 3: Market Deployment (5 months)'
        ],
        submittedBy: 'Founders Factory',
        status: 'APPROVED',
        partOfProject: true
      },
      {
        challengeId: createdChallenges[0].id,
        studioId: studios[1].id, // Rocket Internet
        title: 'CleanTech Innovation by Rocket Internet',
        description: 'Portable hygiene solutions using UV sterilization technology for remote areas.',
        actionPlan: [
          'Phase 1: Technology Integration (3 months)',
          'Phase 2: Field Testing (4 months)',
          'Phase 3: Scale Production (6 months)'
        ],
        submittedBy: 'Rocket Internet',
        status: 'PENDING',
        partOfProject: false
      },
      // 2 proposals for second challenge (if exists)
      {
        challengeId: createdChallenges[1]?.id || createdChallenges[0].id,
        studioId: studios[2].id, // eFounders
        title: 'HealthLink Platform by eFounders',
        description: 'Secure blockchain-based health record system with patient-controlled access.',
        actionPlan: [
          'Phase 1: Platform Design (3 months)',
          'Phase 2: Security Implementation (4 months)',
          'Phase 3: NHS Integration (6 months)'
        ],
        submittedBy: 'eFounders',
        status: 'APPROVED',
        partOfProject: true
      },
      {
        challengeId: createdChallenges[1]?.id || createdChallenges[0].id,
        studioId: studios[3].id, // Antler
        title: 'MedConnect by Antler',
        description: 'AI-powered health record integration with real-time patient monitoring.',
        actionPlan: [
          'Phase 1: AI Development (4 months)',
          'Phase 2: Healthcare Testing (3 months)',
          'Phase 3: System Rollout (5 months)'
        ],
        submittedBy: 'Antler',
        status: 'UNDER_REVIEW',
        partOfProject: false
      },
      // 1 proposal for third challenge (if exists)
      {
        challengeId: createdChallenges[2]?.id || createdChallenges[0].id,
        studioId: studios[4].id, // BCG Digital Ventures
        title: 'ClimateWatch by BCG Digital Ventures',
        description: 'IoT sensor network with machine learning analytics for environmental monitoring.',
        actionPlan: [
          'Phase 1: Sensor Deployment (5 months)',
          'Phase 2: Data Analytics (4 months)',
          'Phase 3: Public Dashboard (3 months)'
        ],
        submittedBy: 'BCG Digital Ventures',
        status: 'APPROVED',
        partOfProject: true
      }
    ];

    const createdProposals = [];
    for (const proposalData of proposals) {
      // Check if proposal already exists
      const existingProposal = await prisma.proposal.findFirst({
        where: { 
          title: proposalData.title,
          challengeId: proposalData.challengeId 
        }
      });
      
      if (!existingProposal) {
        const proposal = await prisma.proposal.create({
          data: proposalData
        });
        createdProposals.push(proposal);
        console.log(`✅ Proposal created: "${proposal.title}" (ID: ${proposal.id})`);
      } else {
        createdProposals.push(existingProposal);
        console.log(`ℹ️ Proposal already exists: "${proposalData.title}"`);
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
        if (challenge.title.includes('Hygiene') || challenge.title.includes('Waterless')) {
          investment = 51000000; // $510,000
          milestones = [
            'Research & Development Complete',
            'Prototype Testing In Progress',
            'Market Deployment Preparation'
          ];
        } else if (challenge.title.includes('Health')) {
          investment = 150000000; // $1,500,000
          milestones = [
            'Platform Design Complete',
            'Security Implementation Complete',
            'NHS Integration In Progress'
          ];
        } else { // Climate
          investment = 300000000; // $3,000,000
          milestones = [
            'Sensor Deployment Complete',
            'Data Analytics Complete',
            'Public Dashboard Development'
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
            role: challenge.title.includes('Hygiene') ? 'Innovation Partner' :
                  challenge.title.includes('Health') ? 'Lead Developer' : 'Technical Lead'
          }
        });

        console.log(`✅ Project created for "${challenge.title}" (ID: ${project.id})`);
      } else {
        console.log(`ℹ️ Project already exists for proposal: "${approvedProposal.title}"`);
      }
    }

    // Update challenge flags
    await prisma.challenge.updateMany({
      where: { governmentId: innovateUK.id },
      data: { hasProposals: true }
    });

    // Verify everything was created
    const finalChallenges = await prisma.challenge.findMany({
      where: { governmentId: innovateUK.id },
      include: { proposals: true, project: true }
    });

    const finalProposals = await prisma.proposal.findMany({
      where: { challenge: { governmentId: innovateUK.id } },
      include: { challenge: true, Studio: true }
    });

    const finalProjects = await prisma.project.findMany({
      where: { challenge: { governmentId: innovateUK.id } },
      include: { challenge: true, proposal: true }
    });

    console.log('\n📊 Final Summary:');
    console.log(`Government: ${innovateUK.name} (ID: ${innovateUK.id})`);
    console.log(`Challenges: ${finalChallenges.length}`);
    console.log(`Proposals: ${finalProposals.length}`);
    console.log(`Projects: ${finalProjects.length}`);
    console.log(`Studios: ${studios.length}`);

    console.log('\n🎉 Government dashboard data seeded successfully!');
    console.log(`Your dashboard at /dashboard/government?id=${innovateUK.id} should now show real data.`);

  } catch (error) {
    console.error('❌ Error seeding government data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedGovernmentData()
  .catch((error) => {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  });