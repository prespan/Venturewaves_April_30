// pages/api/proposal-details/[id].ts
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;
  
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid proposal ID' });
  }

  try {
    const proposal = await prisma.proposal.findUnique({
      where: { id: parseInt(id) },
      include: {
        challenge: {
          select: {
            id: true,
            title: true,
            deadline: true,
            phase1Budget: true,
            capitalCommitment: true,
            equityOffered: true,
            corporate: {
              select: {
                name: true
              }
            },
            government: {
              select: {
                name: true
              }
            },
            researchOrg: {
              select: {
                name: true
              }
            }
          }
        },
        Studio: {
          select: {
            id: true,
            name: true,
            address: true,
            website: true,
            description: true
          }
        },
        project: {
          select: {
            id: true,
            investment: true,
            milestones: true,
            createdAt: true
          }
        }
      }
    });

    if (!proposal) {
      return res.status(404).json({ error: 'Proposal not found' });
    }

    // Format the proposal data
    const formattedProposal = {
      id: proposal.id,
      challengeId: proposal.challengeId,
      title: proposal.title,
      description: proposal.description,
      actionPlan: proposal.actionPlan,
      status: proposal.status,
      partOfProject: proposal.partOfProject,
      submittedBy: proposal.Studio?.name || proposal.submittedBy,
      submittedAt: proposal.submittedAt.toISOString().split('T')[0],
      
      // Challenge information
      challenge: {
        id: proposal.challenge.id,
        title: proposal.challenge.title,
        phase1Budget: proposal.challenge.phase1Budget,
        capitalCommitment: proposal.challenge.capitalCommitment,
        equityOffered: proposal.challenge.equityOffered,
        deadline: proposal.challenge.deadline.toISOString().split('T')[0],
        organization: proposal.challenge.corporate?.name || 
                     proposal.challenge.government?.name || 
                     proposal.challenge.researchOrg?.name,
        organizationType: proposal.challenge.corporate ? "Corporate" : 
                         proposal.challenge.government ? "Government" : "Research Organization"
      },
      
      // Studio information
      studio: proposal.Studio ? {
        id: proposal.Studio.id,
        name: proposal.Studio.name,
        address: proposal.Studio.address,
        website: proposal.Studio.website,
        description: proposal.Studio.description
      } : null,
      
      // Project status (if proposal has been accepted)
      project: proposal.project ? {
        id: proposal.project.id,
        investment: proposal.project.investment,
        milestones: proposal.project.milestones,
        createdAt: proposal.project.createdAt.toISOString().split('T')[0],
        isActive: true
      } : null,
      
      // Additional computed fields
      hasProject: proposal.project ? true : false,
      isWinning: proposal.project ? true : false
    };

    console.log(`📄 Fetched proposal details for ID ${id}:`, formattedProposal.title);

    res.status(200).json(formattedProposal);
  } catch (error) {
    console.error('❌ Proposal Detail API Error:', error);
    res.status(500).json({
      error: 'Failed to fetch proposal details',
      detail: error instanceof Error ? error.message : String(error)
    });
  }
}