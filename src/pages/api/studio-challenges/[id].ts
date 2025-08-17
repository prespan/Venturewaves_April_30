// pages/api/studio-challenges/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const challengeId = parseInt(id as string);

  if (req.method === 'GET') {
    try {
      const { studioId } = req.query;
      
      const challenge = await prisma.challenge.findUnique({
        where: { id: challengeId },
        include: {
          corporate: true,
          government: true,
          researchOrg: true,
          proposals: {
            where: studioId ? { studioId: parseInt(studioId as string) } : undefined,
            select: { 
              id: true, 
              studioId: true, 
              status: true,
              title: true,
              submittedAt: true
            }
          },
          _count: {
            select: { proposals: true }
          }
        }
      });

      if (!challenge) {
        return res.status(404).json({ error: 'Challenge not found' });
      }

      // Determine owner and owner type
      const owner = challenge.corporate || challenge.government || challenge.researchOrg;
      const ownerType = challenge.corporate ? 'corporate' : 
                       challenge.government ? 'government' : 'research';

      // Check if this studio has already applied
      const studioProposal = studioId ? 
        challenge.proposals.find(p => p.studioId === parseInt(studioId as string)) : null;

      const responseData = {
        ...challenge,
        owner,
        ownerType,
        proposalCount: challenge._count.proposals,
        hasSubmittedProposal: !!studioProposal,
        proposalStatus: studioProposal?.status || null,
        proposalId: studioProposal?.id || null
      };

      res.status(200).json(responseData);
    } catch (error) {
      console.error('Error fetching challenge:', error);
      res.status(500).json({ error: 'Failed to fetch challenge' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}