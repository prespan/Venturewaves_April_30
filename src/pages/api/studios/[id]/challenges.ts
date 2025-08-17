// pages/api/studios/[id]/challenges.ts
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Invalid ID' });

  try {
    // Get all active challenges that the studio can submit proposals to
    const challenges = await prisma.challenge.findMany({
      where: {
        deadline: {
          gte: new Date() // Only future challenges
        }
      },
      include: {
        proposals: {
          where: {
            studioId: parseInt(id)
          }
        },
        corporate: {
          select: { name: true, logo: true }
        },
        government: {
          select: { name: true, logo: true }
        },
        researchOrg: {
          select: { name: true, logo: true }
        },
        project: {
          select: { id: true }
        }
      },
      orderBy: {
        deadline: 'asc'
      }
    });

    // Transform to match dashboard expected format
    const formattedChallenges = challenges.map(challenge => {
      // Determine challenge owner
      const owner = challenge.corporate?.name || 
                   challenge.government?.name || 
                   challenge.researchOrg?.name || 
                   'Unknown';

      const ownerLogo = challenge.corporate?.logo || 
                       challenge.government?.logo || 
                       challenge.researchOrg?.logo || 
                       null;

      // Check if studio has already submitted proposal
      const hasSubmittedProposal = challenge.proposals.length > 0;
      const studioProposal = challenge.proposals[0]; // Get studio's proposal if exists

      // Calculate days remaining
      const today = new Date();
      const deadline = new Date(challenge.deadline);
      const daysRemaining = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      return {
        id: challenge.id,
        title: challenge.title,
        description: challenge.description,
        owner: {
          name: owner,
          logo: ownerLogo
        },
        deadline: challenge.deadline.toISOString().split('T')[0],
        daysRemaining: daysRemaining,
        phase1Budget: challenge.phase1Budget,
        capitalCommitment: challenge.capitalCommitment,
        equityOffered: challenge.equityOffered,
        hasSubmittedProposal: hasSubmittedProposal,
        proposalStatus: studioProposal?.status || null,
        proposalId: studioProposal?.id || null,
        isLinkedToProject: challenge.project !== null,
        submittedBy: challenge.submittedBy,
        postedAt: challenge.postedAt.toISOString().split('T')[0]
      };
    });

    console.log(`✨ Formatted ${formattedChallenges.length} challenges for studio ${id}`);

    res.status(200).json({ challenges: formattedChallenges });
  } catch (error) {
    console.error('❌ Studio Challenges API Error:', error);
    res.status(500).json({
      error: 'Failed to fetch challenges',
      detail: error instanceof Error ? error.message : String(error)
    });
  }
}
