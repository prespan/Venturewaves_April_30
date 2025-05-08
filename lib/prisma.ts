// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // Avoid duplicate instances in development
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
