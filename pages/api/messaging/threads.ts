import prisma from '@/lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  const session = await getSession({ req })
  if (!session) return res.status(401).json({ error: 'Unauthorized' })

  const userEmail = session.user.email

  const threads = await prisma.thread.findMany({
    where: {
      participants: {
        some: {
          email: userEmail
        }
      }
    },
    include: {
      messages: {
        orderBy: { sentAt: 'asc' },
        take: 10
      }
    },
    orderBy: { updatedAt: 'desc' }
  })

  const formatted = threads.map(thread => ({
    id: thread.id,
    title: thread.title,
    participants: thread.participants.map(p => p.name || p.email),
    lastMessageSnippet: thread.messages[thread.messages.length - 1]?.body?.slice(0, 50) || '',
    messages: thread.messages
  }))

  res.json(formatted)
}
