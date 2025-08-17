// scripts/seed-studio-data.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedStudioData() {
  try {
    console.log('🌱 Starting to seed studio dashboard data...');

    // Find an existing studio or use a specific one
    let studio = await prisma.studio.findFirst({
      where: { name: 'Founders Factory' }
    });

    if (!studio) {
      // If specific studio doesn't exist, find any studio
      studio = await prisma.studio.findFirst();
      
      if (!studio) {
        console.log('❌ No studio found. Creating sample studio...');
        studio = await prisma.studio.create({
          data: {
            name: 'Demo Venture Studio',
            website: 'https://demo-studio.com',
            address: 'San Francisco, CA, USA',
            description: 'Demo venture studio for collaboration platform testing.',
            keyStartups: ['StartupA', 'StartupB', 'StartupC']
          }
        });
        console.log('✅ Created demo studio:', studio.name);
      }
    }

    console.log('✅ Using studio:', studio.name, '(ID:', studio.id, ')');

    // Get or create corporates, governments, and research orgs for challenges
    const corporateData = [
      {
        name: 'Tesla Inc.',
        website: 'https://tesla.com',
        address: 'Austin, TX, USA',
        industryTags: ['Automotive', 'Energy', 'Technology'],
        description: 'Electric vehicles and sustainable energy company.',
        notableProducts: ['Model S', 'Model 3', 'Powerwall', 'Solar Panels']
      },
      {
        name: 'Pfizer Inc.',
        website: 'https://pfizer.com',
        address: 'New York, NY, USA',
        industryTags: ['Pharmaceuticals', 'Healthcare', 'Biotechnology'],
        description: 'Global pharmaceutical and biotechnology corporation.',
        notableProducts: ['COVID-19 Vaccine', 'Viagra', 'Advil']
      }
    ];

    const governmentData = [
      {
        name: 'US Department of Energy',
        website: 'https://energy.gov',
        address: 'Washington, DC, USA',
        focusAreas: ['Clean Energy', 'Nuclear Security', 'Scientific Discovery'],
        description: 'Federal agency responsible for energy policy and nuclear security.'
      }
    ];

    const researchData = [
      {
        name: 'Stanford Research Institute',
        website: 'https://sri.com',
        address: 'Menlo Park, CA, USA',
        focusDomains: ['AI', 'Robotics', 'Biomedical', 'Materials Science'],
        description: 'Independent research and development organization.'
      }
    ];

    // Create or get organizations
    const corporates = [];
    for (const corpData of corporateData) {
      let corp = await prisma.corporate.findFirst({
        where: { name: corpData.name }
      });
      if (!corp) {
        corp = await prisma.corporate.create({ data: corpData });
        console.log(`✅ Created corporate: ${corp.name}`);
      }
      corporates.push(corp);
    }

    const governments = [];
    for (const govData of governmentData) {
      let gov = await prisma.government.findFirst({
        where: { name: govData.name }
      });
      if (!gov) {
        gov = await prisma.government.create({ data: govData });
        console.log(`✅ Created government: ${gov.name}`);
      }
      governments.push(gov);
    }

    const researchOrgs = [];
    for (const resData of researchData) {
      let research = await prisma.researchOrganization.findFirst({
        where: { name: resData.name }
      });
      if (!research) {
        research = await prisma.researchOrganization.create({ data: resData });
        console.log(`✅ Created research org: ${research.name}`);
      }
      researchOrgs.push(research);
    }

    // Create diverse challenges from different organizations
    const challengeData = [
      // Corporate challenges
      {
        title: 'Autonomous Vehicle Safety Systems',
        description: 'Develop advanced AI systems for autonomous vehicle safety and collision avoidance.',
        submittedBy: `${corporates[0].name} Engineering Team`,
        deadline: new Date('2025-09-15'),
        postedAt: new Date('2025-01-15'),
        phase1Budget: 250000000, // $2.5M
        capitalCommitment: 250000000,
        equityOffered: 12,
        hasProposals: false,
        projectLinked: false,
        corporateId: corporates[0].id
      },
      {
        title: 'Next-Gen Drug Delivery Platform',
        description: 'Revolutionary drug delivery system using nanotechnology for targeted therapy.',
        submittedBy: `${corporates[1].name} R&D Division`,
        deadline: new Date('2025-10-30'),
        postedAt: new Date('2025-01-20'),
        phase1Budget: 300000000, // $3M
        capitalCommitment: 300000000,
        equityOffered: 15,
        hasProposals: false,
        projectLinked: false,
        corporateId: corporates[1].id
      },
      // Government challenge
      {
        title: 'Smart Grid Energy Optimization',
        description: 'AI-powered optimization system for national electrical grid efficiency and renewable energy integration.',
        submittedBy: `${governments[0].name} Innovation Lab`,
        deadline: new Date('2025-11-20'),
        postedAt: new Date('2025-01-25'),
        phase1Budget: 400000000, // $4M
        capitalCommitment: 400000000,
        equityOffered: 10,
        hasProposals: false,
        projectLinked: false,
        governmentId: governments[0].id
      },
      // Research organization challenge
      {
        title: 'Quantum-Classical Computing Bridge',
        description: 'Development of hybrid computing systems that seamlessly integrate quantum and classical processing.',
        submittedBy: `${researchOrgs[0].name} Quantum Lab`,
        deadline: new Date('2025-08-25'),
        postedAt: new Date('2025-01-10'),
        phase1Budget: 350000000, // $3.5M
        capitalCommitment: 350000000,
        equityOffered: 18,
        hasProposals: true,
        projectLinked: true,
        researchOrgId: researchOrgs[0].id
      },
      // Additional challenges for variety
      {
        title: 'Carbon Capture Innovation',
        description: 'Scalable carbon capture and utilization technology for industrial applications.',
        submittedBy: `${corporates[0].name} Sustainability Team`,
        deadline: new Date('2025-12-15'),
        postedAt: new Date('2025-02-01'),
        phase1Budget: 200000000, // $2M
        capitalCommitment: 200000000,
        equityOffered: 20,
        hasProposals: false,
        projectLinked: false,
        corporateId: corporates[0].id
      }
    ];

    const createdChallenges = [];
    for (const challengeInfo of challengeData) {
      const existingChallenge = await prisma.challenge.findFirst({
        where: { title: challengeInfo.title }
      });
      
      if (!existingChallenge) {
        const challenge = await prisma.challenge.create({
          data: challengeInfo
        });
        createdChallenges.push(challenge);
        console.log(`✅ Challenge created: "${challenge.title}" (ID: ${challenge.id})`);
      } else {
        createdChallenges.push(existingChallenge);
        console.log(`ℹ️ Challenge already exists: "${challengeInfo.title}"`);
      }
    }

    // Create studio proposals for various challenges
    const proposalData = [
      {
        challengeId: createdChallenges[0].id, // Autonomous Vehicle Safety
        studioId: studio.id,
        title: 'AI-VisionGuard: Advanced Collision Prevention',
        description: 'Machine learning system combining computer vision, LiDAR, and predictive analytics for real-time collision avoidance.',
        actionPlan: [
          'Phase 1: Computer Vision Algorithm Development (4 months)',
          'Phase 2: LiDAR Integration & Testing (3 months)',
          'Phase 3: Real-world Validation & Optimization (5 months)'
        ],
        submittedBy: studio.name,
        status: 'APPROVED',
        partOfProject: true
      },
      {
        challengeId: createdChallenges[1].id, // Drug Delivery Platform
        studioId: studio.id,
        title: 'NanoMed Delivery System',
        description: 'Biocompatible nanoparticle platform for targeted drug delivery with real-time monitoring capabilities.',
        actionPlan: [
          'Phase 1: Nanoparticle Design & Synthesis (6 months)',
          'Phase 2: Biocompatibility Testing (4 months)',
          'Phase 3: Clinical Trial Preparation (6 months)'
        ],
        submittedBy: studio.name,
        status: 'UNDER_REVIEW',
        partOfProject: false
      },
      {
        challengeId: createdChallenges[2].id, // Smart Grid
        studioId: studio.id,
        title: 'GridAI Optimization Platform',
        description: 'AI-powered platform for real-time energy grid optimization and renewable energy integration.',
        actionPlan: [
          'Phase 1: AI Model Development (5 months)',
          'Phase 2: Grid Integration Testing (4 months)',
          'Phase 3: Nationwide Deployment (8 months)'
        ],
        submittedBy: studio.name,
        status: 'PENDING',
        partOfProject: false
      },
      {
        challengeId: createdChallenges[3].id, // Quantum-Classical Bridge
        studioId: studio.id,
        title: 'QuantumBridge Computing Platform',
        description: 'Hybrid computing architecture that seamlessly transitions workloads between quantum and classical processors.',
        actionPlan: [
          'Phase 1: Architecture Design (4 months)',
          'Phase 2: Prototype Development (6 months)',
          'Phase 3: Performance Optimization (4 months)'
        ],
        submittedBy: studio.name,
        status: 'APPROVED',
        partOfProject: true
      }
    ];

    const createdProposals = [];
    for (const proposalInfo of proposalData) {
      const existingProposal = await prisma.proposal.findFirst({
        where: { 
          title: proposalInfo.title,
          challengeId: proposalInfo.challengeId,
          studioId: studio.id
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

    // Create projects from approved proposals
    const approvedProposals = createdProposals.filter(p => p.status === 'APPROVED');
    
    for (const approvedProposal of approvedProposals) {
      const existingProject = await prisma.project.findFirst({
        where: { proposalId: approvedProposal.id }
      });
      
      if (!existingProject) {
        const challenge = createdChallenges.find(c => c.id === approvedProposal.challengeId);
        
        let investment, milestones;
        if (challenge.title.includes('Autonomous') || challenge.title.includes('Vehicle')) {
          investment = 250000000; // $2.5M
          milestones = [
            'Computer Vision Algorithm Complete',
            'LiDAR Integration Successful',
            'Real-world Validation Complete'
          ];
        } else if (challenge.title.includes('Quantum')) {
          investment = 350000000; // $3.5M
          milestones = [
            'Architecture Design Complete',
            'Prototype Development',
            'Performance Optimization'
          ];
        } else if (challenge.title.includes('Drug')) {
          investment = 300000000; // $3M
          milestones = [
            'Nanoparticle Design Complete',
            'Biocompatibility Testing',
            'Clinical Trial Preparation'
          ];
        } else {
          investment = 200000000; // $2M
          milestones = [
            'Initial Development',
            'Testing Phase',
            'Deployment'
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
            studioId: studio.id,
            role: challenge.title.includes('Autonomous') ? 'AI Safety Lead' :
                  challenge.title.includes('Quantum') ? 'Quantum Systems Lead' :
                  challenge.title.includes('Drug') ? 'Biotech Research Lead' : 'Technical Lead'
          }
        });

        console.log(`✅ Project created for "${challenge.title}" (ID: ${project.id})`);
      } else {
        console.log(`ℹ️ Project already exists for proposal: "${approvedProposal.title}"`);
      }
    }

    // Create some additional collaborators for diversity
    const investors = await prisma.investor.findMany({ take: 2 });
    if (investors.length > 0) {
      const projects = await prisma.project.findMany({
        where: {
          collaborators: {
            some: { studioId: studio.id }
          }
        }
      });

      for (const project of projects.slice(0, 2)) {
        const existingInvestorCollab = await prisma.projectCollaborator.findFirst({
          where: {
            projectId: project.id,
            investorId: investors[0].id
          }
        });

        if (!existingInvestorCollab) {
          await prisma.projectCollaborator.create({
            data: {
              projectId: project.id,
              investorId: investors[0].id,
              role: 'Strategic Investor'
            }
          });
          console.log(`✅ Added investor collaborator to project ${project.id}`);
        }
      }
    }

    // Update challenge flags
    const challengeIds = createdChallenges.map(c => c.id);
    await prisma.challenge.updateMany({
      where: { id: { in: challengeIds } },
      data: { hasProposals: true }
    });

    // Mark challenges with projects as linked
    const projectChallengeIds = approvedProposals.map(p => p.challengeId);
    await prisma.challenge.updateMany({
      where: { id: { in: projectChallengeIds } },
      data: { projectLinked: true }
    });

    // Create some additional studios for more realistic collaboration data
    const additionalStudios = [
      {
        name: 'TechStars',
        website: 'https://techstars.com',
        address: 'Boulder, CO, USA',
        description: 'Global startup accelerator and venture capital firm.',
        keyStartups: ['SendGrid', 'ClassPass', 'PillPack']
      },
      {
        name: 'Y Combinator',
        website: 'https://ycombinator.com',
        address: 'Mountain View, CA, USA',
        description: 'American startup accelerator and venture capital firm.',
        keyStartups: ['Airbnb', 'Stripe', 'Dropbox']
      }
    ];

    for (const studioData of additionalStudios) {
      const existingStudio = await prisma.studio.findFirst({
        where: { name: studioData.name }
      });

      if (!existingStudio) {
        await prisma.studio.create({ data: studioData });
        console.log(`✅ Created additional studio: ${studioData.name}`);
      }
    }

    // Create competitive proposals from other studios for some challenges
    const otherStudios = await prisma.studio.findMany({
      where: { id: { not: studio.id } }
    });

    if (otherStudios.length > 0) {
      const competitiveProposals = [
        {
          challengeId: createdChallenges[0].id, // Autonomous Vehicle
          studioId: otherStudios[0]?.id,
          title: 'SafeDrive AI Platform',
          description: 'Alternative AI-powered safety system focusing on predictive analytics and driver behavior modeling.',
          actionPlan: [
            'Phase 1: Driver Behavior Analysis (3 months)',
            'Phase 2: Predictive Model Development (4 months)',
            'Phase 3: System Integration (3 months)'
          ],
          submittedBy: otherStudios[0]?.name || 'Other Studio',
          status: 'PENDING',
          partOfProject: false
        }
      ];

      for (const compProposal of competitiveProposals) {
        if (compProposal.studioId) {
          const existing = await prisma.proposal.findFirst({
            where: {
              title: compProposal.title,
              challengeId: compProposal.challengeId
            }
          });

          if (!existing) {
            await prisma.proposal.create({ data: compProposal });
            console.log(`✅ Created competitive proposal: ${compProposal.title}`);
          }
        }
      }
    }

    // Final verification
    const finalProposals = await prisma.proposal.findMany({
      where: { studioId: studio.id },
      include: { challenge: true }
    });

    const finalProjects = await prisma.project.findMany({
      where: {
        collaborators: {
          some: { studioId: studio.id }
        }
      },
      include: { challenge: true, proposal: true }
    });

    const availableChallenges = await prisma.challenge.findMany({
      where: {
        deadline: { gte: new Date() }
      },
      include: {
        proposals: {
          where: { studioId: studio.id }
        }
      }
    });

    console.log('\n📊 Final Summary:');
    console.log(`Studio: ${studio.name} (ID: ${studio.id})`);
    console.log(`Studio Proposals: ${finalProposals.length}`);
    console.log(`Studio Projects: ${finalProjects.length}`);
    console.log(`Available Challenges: ${availableChallenges.length}`);
    console.log(`Total Organizations: ${corporates.length + governments.length + researchOrgs.length}`);

    // Create sample messages for the studio
    const sampleMessages = [
      {
        sender: 'Tesla Inc.',
        recipient: studio.name,
        content: 'We are impressed with your AI-VisionGuard proposal. Would you like to schedule a technical review meeting?'
      },
      {
        sender: studio.name,
        recipient: 'US Department of Energy',
        content: 'Thank you for the opportunity. We have submitted our proposal for the Smart Grid project and are available for any questions.'
      },
      {
        sender: 'Stanford Research Institute',
        recipient: studio.name,
        content: 'Your QuantumBridge proposal aligns perfectly with our research goals. Let\'s discuss potential collaboration.'
      },
      {
        sender: 'Sequoia Capital',
        recipient: studio.name,
        content: 'We are interested in your portfolio of AI and quantum computing projects. Can we arrange a meeting?'
      },
      {
        sender: studio.name,
        recipient: 'Pfizer Inc.',
        content: 'We have expertise in biotech platforms and would love to discuss your upcoming drug delivery challenges.'
      }
    ];

    for (const messageData of sampleMessages) {
      const existingMessage = await prisma.message.findFirst({
        where: {
          sender: messageData.sender,
          recipient: messageData.recipient,
          content: messageData.content
        }
      });

      if (!existingMessage) {
        await prisma.message.create({
          data: {
            ...messageData,
            createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Random time in last 7 days
          }
        });
        console.log(`✅ Message created: ${messageData.sender} → ${messageData.recipient}`);
      }
    }

    console.log('\n🎉 Studio dashboard data seeded successfully!');
    console.log(`Your studio dashboard at /dashboard/studio?id=${studio.id} should now show real data.`);

    // Log specific URLs for testing
    console.log('\n🔗 Test these API endpoints:');
    console.log(`- GET /api/studios/${studio.id}/dashboard`);
    console.log(`- GET /api/studios/${studio.id}/saved-challenges`);
    console.log(`- GET /api/studios/${studio.id}/proposals`);
    console.log(`- GET /api/studios/${studio.id}/projects`);
    console.log(`- GET /api/studios/${studio.id}/partners`);
    console.log(`- GET /api/studios/${studio.id}/messages`);
    console.log(`- GET /api/studios/${studio.id}/challenges`);

  } catch (error) {
    console.error('❌ Error seeding studio data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedStudioData()
  .catch((error) => {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  });