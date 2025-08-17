// Fixed API route: pages/api/studio-proposals/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const proposalId = parseInt(id as string);

  if (req.method === 'GET') {
    try {
      const proposal = await prisma.proposal.findUnique({
        where: { id: proposalId },
        include: {
          challenge: {
            include: {
              corporate: true,
              government: true,
              researchOrg: true
            }
          },
          Studio: true
        }
      });

      if (!proposal) {
        return res.status(404).json({ error: 'Proposal not found' });
      }

      // Add challenge owner info
      const owner = proposal.challenge.corporate ||
                    proposal.challenge.government ||
                    proposal.challenge.researchOrg;

      const responseData = {
        ...proposal,
        challenge: {
          ...proposal.challenge,
          owner
        }
      };

      res.status(200).json(responseData);
    } catch (error) {
      console.error('Error fetching proposal:', error);
      res.status(500).json({ error: 'Failed to fetch proposal' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}