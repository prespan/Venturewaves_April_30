import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session || !session.user?.email) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { recipient, message } = req.body

  if (!recipient || !message || !message.trim()) {
    return res.status(400).json({ error: 'Recipient and message are required' })
  }

  try {
    const newMessage = await prisma.message.create({
      data: {
        sender: session.user.email,
        recipient,
        content: message,
        createdAt: new Date()
      }
    })

    res.status(201).json(newMessage)
  } catch (error) {
    console.error('[SEND_MESSAGE_ERROR]', error)
    res.status(500).json({ error: 'Failed to send message' })
  }
}
