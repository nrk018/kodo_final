import { PrismaClient } from '@prisma/client';
import { seedCoinPackages } from '../lib/seed-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  try {
    // Seed coin packages
    await seedCoinPackages(prisma);
    
    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();