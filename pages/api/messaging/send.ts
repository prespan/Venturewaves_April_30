import prisma from '@/lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  const session = await getSession({ req })
  if (!session) return res.status(401).json({ error: 'Unauthorized' })

  if (req.method !== 'POST') return res.status(405).end()

  const { threadId, message } = req.body

  if (!threadId || !message.trim()) {
    return res.status(400).json({ error: 'Invalid payload' })
  }

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

  res.status(201).json(newMessage)
}
