import prisma from '@/lib/prisma'
import { getSession } from 'next-auth/react'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(401).json({ error: 'Unauthorized' })

  if (req.method !== 'POST') return res.status(405).end()

  const { threadId, message } = req.body

  if (!threadId || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Invalid payload' })
  }

  const senderEmail = session.user?.email
  if (typeof senderEmail !== 'string') {
    return res.status(400).json({ error: 'Invalid sender email' })
  }

  const newMessage = await prisma.message.create({
    data: {
      body: message,
      sentAt: new Date(),
      senderEmail: senderEmail,
      thread: { connect: { id: threadId } }
    }
  })

  await prisma.thread.update({
    where: { id: threadId },
    data: { updatedAt: new Date() }
  })

  res.status(201).json(newMessage)
}
