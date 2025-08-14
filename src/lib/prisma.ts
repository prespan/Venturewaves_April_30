// lib/prisma.ts - Add logging
import { PrismaClient } from '@prisma/client'

console.log('🔧 Prisma file loaded at:', new Date().toISOString())

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

if (globalForPrisma.prisma) {
  console.log('♻️ Reusing existing Prisma client')
} else {
  console.log('🆕 Creating new Prisma client')
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query'],
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
  console.log('🔗 Prisma singleton stored in global')
}