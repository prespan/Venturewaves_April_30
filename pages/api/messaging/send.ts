import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session || !session.user?.email) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { threadId, message } = req.body

  if (!threadId || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Invalid payload' })
  }

  try {
    const newMessage = await prisma.message.create({
      data: {
        body: message,
        sentAt: new Date(),
        senderEmail: session.user.email,
        thread: { connect: { id: threadId } }
      }
    })

    await prisma.thread.update({
      where: { id: threadId },
      data: { updatedAt: new Date() }
    })

    return res.status(201).json(newMessage)
  } catch (error) {
    console.error('Failed to send message:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
