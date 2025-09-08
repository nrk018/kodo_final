import { prisma } from './prisma';
import { seedCoinPackages } from './seed-data';

export async function initializeDatabase() {
  try {
    // Check database connection
    await prisma.$connect();
    console.log('Connected to database successfully!');

    // Seed initial data
    await seedCoinPackages();

    console.log('Database initialization completed successfully!');
  } catch (error) {
    console.error('Database initialization failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the initialization if this file is executed directly
if (require.main === module) {
  initializeDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}