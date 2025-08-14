// pages/api/challenge-details/[id].ts
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;
  
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid challenge ID' });
  }

  try {
    const challenge = await prisma.challenge.findUnique({
      where: { id: parseInt(id) },
      include: {
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
        },
        proposals: {
          include: {
            Studio: {
              select: {
                name: true
              }
            }
          }
        },
        project: {
          include: {
            proposal: {
              select: {
                title: true
              }
            }
          }
        }
      }
    });

    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    // Format the challenge data
    const formattedChallenge = {
      id: challenge.id,
      title: challenge.title,
      description: challenge.description,
      deadline: challenge.deadline.toISOString().split('T')[0],
      postedAt: challenge.postedAt.toISOString().split('T')[0],
      phase1Budget: challenge.phase1Budget,
      capitalCommitment: challenge.capitalCommitment,
      equityOffered: challenge.equityOffered,
      submittedBy: challenge.submittedBy,
      hasProposals: challenge.proposals.length > 0,
      projectLinked: challenge.project ? true : false,
      status: challenge.project ? "Project Active" : (challenge.proposals.length > 0 ? "Has Proposals" : "Open"),
      organization: challenge.corporate?.name || challenge.government?.name || challenge.researchOrg?.name,
      organizationType: challenge.corporate ? "Corporate" : challenge.government ? "Government" : "Research Organization",
      proposals: challenge.proposals.map(proposal => ({
        id: proposal.id,
        title: proposal.title,
        status: proposal.status,
        submittedBy: proposal.Studio?.name || proposal.submittedBy,
        submittedAt: proposal.submittedAt.toISOString().split('T')[0]
      })),
      project: challenge.project ? {
        id: challenge.project.id,
        investment: challenge.project.investment,
        proposalTitle: challenge.project.proposal.title
      } : null
    };

    console.log(`📋 Fetched challenge details for ID ${id}:`, formattedChallenge.title);

    res.status(200).json(formattedChallenge);
  } catch (error) {
    console.error('❌ Challenge Detail API Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch challenge details',
      detail: error instanceof Error ? error.message : String(error)
    });
  }
}