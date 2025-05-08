import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from '@/lib/prisma'

// Type for a single message with optional filtering by user
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session || !session.user?.email) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const email = session.user.email

    // Fetch messages either sent or received by the current user
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { sender: email },
          { recipient: email },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    res.status(200).json(messages)
  } catch (error) {
    console.error('Error fetching messages:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
