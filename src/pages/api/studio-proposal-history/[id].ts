// pages/api/studio-proposal-history/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const proposalId = parseInt(id as string);

  if (req.method === 'GET') {
    try {
      // Get proposal history (you may need to create this table)
      const history = await prisma.proposalHistory?.findMany({
        where: { proposalId: proposalId },
        orderBy: { timestamp: 'desc' }
      }) || [];

      // If no history table exists, create a basic history from the proposal
      if (history.length === 0) {
        const proposal = await prisma.proposal.findUnique({
          where: { id: proposalId }
        });

        if (proposal) {
          const basicHistory = [
            {
              id: 1,
              status: proposal.status,
              timestamp: proposal.submittedAt,
              note: 'Proposal submitted',
              reviewer: null
            }
          ];
          return res.status(200).json(basicHistory);
        }
      }

      res.status(200).json(history);
    } catch (error) {
      console.error('Error fetching proposal history:', error);
      res.status(500).json({ error: 'Failed to fetch proposal history' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}