import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const { packageId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!packageId) {
      return NextResponse.json(
        { error: 'Package ID is required' },
        { status: 400 }
      );
    }

    // Get the coin package
    const coinPackage = await prisma.coinPackage.findUnique({
      where: { id: packageId },
    });

    if (!coinPackage || !coinPackage.active) {
      return NextResponse.json(
        { error: 'Invalid coin package' },
        { status: 400 }
      );
    }

    // In a real application, you would integrate with a payment processor here
    // For this example, we'll assume the payment was successful

    // Update user's coin balance
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        coins: { increment: coinPackage.amount },
        transactions: {
          create: {
            amount: coinPackage.amount,
            type: 'purchase',
            description: `Purchased ${coinPackage.name} coin package`,
          },
        },
      },
    });

    // Return updated coin balance
    return NextResponse.json({
      coins: updatedUser.coins,
      message: `Successfully purchased ${coinPackage.amount} coins`,
    });
  } catch (error) {
    console.error('Coin purchase error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}