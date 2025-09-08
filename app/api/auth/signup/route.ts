import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    console.log('Signup API called');
    
    // Parse request body
    let email, password, username;
    try {
      const body = await request.json();
      email = body.email;
      password = body.password;
      username = body.username;
      console.log('Signup attempt for:', { email, username });
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Validate input
    if (!email || !password || !username) {
      console.log('Missing signup data:', { email: !!email, password: !!password, username: !!username });
      return NextResponse.json(
        { error: 'Email, password, and username are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    let existingUser;
    try {
      existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email },
            { username },
          ],
        },
      });
      console.log('Existing user check:', !!existingUser);
    } catch (dbError) {
      console.error('Database error when checking existing user:', dbError);
      return NextResponse.json(
        { error: 'Database error', details: dbError instanceof Error ? dbError.message : 'Unknown error' },
        { status: 500 }
      );
    }

    if (existingUser) {
      console.log('User already exists:', { email, username });
      return NextResponse.json(
        { error: 'User with this email or username already exists' },
        { status: 409 }
      );
    }

    // Hash password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
      console.log('Password hashed successfully');
    } catch (bcryptError) {
      console.error('bcrypt error during password hashing:', bcryptError);
      return NextResponse.json(
        { error: 'Error processing password', details: bcryptError instanceof Error ? bcryptError.message : 'Unknown error' },
        { status: 500 }
      );
    }

    // Create user
    let user;
    try {
      user = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
          coins: 100, // Give new users some starting coins
        },
      });
      console.log('User created successfully:', { id: user.id, username: user.username });
    } catch (createError) {
      console.error('Error creating user:', createError);
      return NextResponse.json(
        { error: 'Failed to create user', details: createError instanceof Error ? createError.message : 'Unknown error' },
        { status: 500 }
      );
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      user: userWithoutPassword,
      message: 'User created successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Unexpected signup error:', error);
    return NextResponse.json(
      { error: 'Something went wrong', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}