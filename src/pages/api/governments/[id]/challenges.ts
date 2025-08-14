// pages/api/governments/[id]/challenges.ts
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Invalid ID' });

  try {
    const challenges = await prisma.challenge.findMany({
      where: { governmentId: parseInt(id) },
      include: {
        proposals: true,
        project: {
          include: {
            collaborators: true
          }
        }
      }
    });

    // Transform to match your dashboard's expected format
    const formattedChallenges = challenges.map(challenge => ({
      id: challenge.id,
      title: challenge.title,
      description: challenge.description,
      deadline: challenge.deadline.toISOString().split('T')[0], // Format as YYYY-MM-DD
      phase1Budget: challenge.phase1Budget,
      capitalCommitment: challenge.capitalCommitment,
      equityOffered: challenge.equityOffered,
      status: challenge.projectLinked ? "Linked to Project" : (challenge.hasProposals ? "Has Proposals" : "Active"),
      hasProposals: challenge.proposals.length > 0,
      proposalCount: challenge.proposals.length,
      projectLinked: challenge.project ? true : false
    }));

    res.status(200).json({ challenges: formattedChallenges });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch challenges', 
      detail: error instanceof Error ? error.message : String(error) 
    });
  }
}