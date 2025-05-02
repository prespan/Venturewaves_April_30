import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session || !session.user?.email) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { recipient, content } = req.body

  if (!recipient || !content?.trim()) {
    return res.status(400).json({ error: 'Recipient and content are required' })
  }

  try {
    const newMessage = await prisma.message.create({
      data: {
        sender: session.user.email,
        recipient,
        content,
        createdAt: new Date(),
      },
    })

    res.status(201).json(newMessage)
  } catch (error) {
    console.error('Error sending message:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
