import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const coinPackages = await prisma.coinPackage.findMany({
      where: { active: true },
      orderBy: { amount: 'asc' },
    });
    
    return NextResponse.json({ coinPackages });
  } catch (error) {
    console.error('Error fetching coin packages:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}