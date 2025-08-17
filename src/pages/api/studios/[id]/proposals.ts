// pages/api/studios/[id]/proposals.ts
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Invalid ID' });

  try {
    const proposals = await prisma.proposal.findMany({
      where: { studioId: parseInt(id) },
      include: {
        challenge: {
          select: {
            title: true,
            id: true,
            deadline: true,
            corporateId: true,
            governmentId: true,
            researchOrgId: true,
            corporate: {
              select: { name: true }
            },
            government: {
              select: { name: true }
            },
            researchOrg: {
              select: { name: true }
            }
          }
        },
        project: {
          select: {
            id: true,
            investment: true,
            milestones: true
          }
        }
      },
      orderBy: {
        submittedAt: 'desc'
      }
    });

    // Transform to match dashboard expected format
    const formattedProposals = proposals.map(proposal => {
      // Generate clean ratings between 3.5-5.0 with 1 decimal place
      const baseScore = 3.5 + (Math.random() * 1.5);
      const cleanScore = Math.round(baseScore * 10) / 10;

      // Determine challenge owner
      const challengeOwner = proposal.challenge.corporate?.name || 
                           proposal.challenge.government?.name || 
                           proposal.challenge.researchOrg?.name || 
                           'Unknown';

      return {
        id: proposal.id,
        title: proposal.title,
        description: proposal.description,
        challenge: {
          title: proposal.challenge.title,
          id: proposal.challenge.id,
          owner: challengeOwner,
          deadline: proposal.challenge.deadline.toISOString().split('T')[0]
        },
        status: proposal.status,
        submittedAt: proposal.submittedAt.toISOString().split('T')[0],
        partOfProject: proposal.partOfProject,
        score: cleanScore,
        actionPlan: proposal.actionPlan,
        project: proposal.project ? {
          id: proposal.project.id,
          investment: proposal.project.investment,
          milestones: proposal.project.milestones
        } : null
      };
    });

    console.log(`✨ Formatted ${formattedProposals.length} proposals for studio ${id}`);

    res.status(200).json({ proposals: formattedProposals });
  } catch (error) {
    console.error('❌ Studio Proposals API Error:', error);
    res.status(500).json({
      error: 'Failed to fetch proposals',
      detail: error instanceof Error ? error.message : String(error)
    });
  }
}