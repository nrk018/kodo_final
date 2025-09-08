import { prisma } from './prisma';

export async function seedCoinPackages() {
  const coinPackages = [
    {
      name: 'Starter Pack',
      description: 'A small pack of coins to get you started',
      amount: 100,
      price: 0.99,
      active: true,
    },
    {
      name: 'Explorer Pack',
      description: 'A medium pack of coins for regular players',
      amount: 500,
      price: 4.99,
      discount: 5,
      active: true,
    },
    {
      name: 'Hero Pack',
      description: 'A large pack of coins for dedicated players',
      amount: 1200,
      price: 9.99,
      discount: 10,
      active: true,
    },
    {
      name: 'Legend Pack',
      description: 'A massive pack of coins for serious players',
      amount: 3000,
      price: 19.99,
      discount: 15,
      active: true,
    },
  ];

  // Check if coin packages already exist
  const existingPackages = await prisma.coinPackage.count();
  
  if (existingPackages === 0) {
    console.log('Seeding coin packages...');
    
    for (const pkg of coinPackages) {
      await prisma.coinPackage.create({
        data: pkg,
      });
    }
    
    console.log('Coin packages seeded successfully!');
  } else {
    console.log('Coin packages already exist, skipping seed.');
  }
}