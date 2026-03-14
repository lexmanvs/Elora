import { PrismaClient } from '@prisma/client'
import path from 'path';
import fs from 'fs';

// Force the env var for Turbopack SSR build context where it might be missing
if (process.env.VERCEL || process.env.VERCEL_ENV) {
  const tmpDbFile = '/tmp/dev.db';
  // Copy to writable /tmp space for serverless execution
  if (!fs.existsSync(tmpDbFile)) {
    const rootDb = path.join(process.cwd(), 'dev.db');
    const prismaDb = path.join(process.cwd(), 'prisma/dev.db');
    if (fs.existsSync(rootDb)) {
      fs.copyFileSync(rootDb, tmpDbFile);
    } else if (fs.existsSync(prismaDb)) {
      fs.copyFileSync(prismaDb, tmpDbFile);
    }
  }
  process.env.DATABASE_URL = `file:${tmpDbFile}`;
} else if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "file:./dev.db";
}

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
