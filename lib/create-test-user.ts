import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

export async function createTestUser() {
  try {
    // Check database connection
    await prisma.$connect();
    console.log('Connected to database successfully!');

    // Check if test user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: 'test@kodo.dev' },
    });

    if (existingUser) {
      console.log('Test user already exists!');
      return;
    }

    // Create a test user
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const user = await prisma.user.create({
      data: {
        username: 'testuser',
        email: 'test@kodo.dev',
        password: hashedPassword,
        xp: 100,
        level: 2,
        coins: 500,
        streak: 3,
      },
    });

    console.log('Test user created successfully:', user.username);
  } catch (error) {
    console.error('Failed to create test user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the function if this file is executed directly
if (require.main === module) {
  createTestUser()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}