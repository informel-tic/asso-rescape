/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
    const entries = await prisma.timelineEntry.findMany({ orderBy: { order: 'asc' } });
    console.log(JSON.stringify(entries, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
