import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(401).json({ error: 'Unauthorized' })

  if (req.method !== 'POST') return res.status(405).end()

  const { recipient, message } = req.body

  if (!recipient || !message?.trim()) {
    return res.status(400).json({ error: 'Invalid payload' })
  }

  try {
    const newMessage = await prisma.message.create({
      data: {
        sender: session.user.email,
        recipient: recipient,
        content: message,
        createdAt: new Date()
      }
    })

    return res.status(201).json(newMessage)
  } catch (error) {
    console.error('Error creating message:', error)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}