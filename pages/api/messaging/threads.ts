import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    try {
      const threads = await prisma.thread.findMany({
        where: {
          participants: {
            has: session.user.email
          }
        },
        include: {
          messages: true
        },
        orderBy: {
          updatedAt: 'desc'
        }
      })
      return res.status(200).json(threads)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }
}