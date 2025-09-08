import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    console.log('Test bcrypt API called');
    
    // Parse request body
    let password;
    try {
      const body = await request.json();
      password = body.password;
      console.log('Testing bcrypt with password:', password ? '(password provided)' : '(no password)');
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Validate input
    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    // Test bcrypt hash
    let hashedPassword;
    try {
      console.log('Attempting to hash password with bcrypt');
      hashedPassword = await bcrypt.hash(password, 10);
      console.log('Password hashed successfully');
    } catch (bcryptError) {
      console.error('bcrypt error during password hashing:', bcryptError);
      return NextResponse.json(
        { 
          error: 'Error hashing password', 
          details: bcryptError instanceof Error ? bcryptError.message : 'Unknown error',
          bcryptAvailable: typeof bcrypt !== 'undefined',
          bcryptVersion: bcrypt?.version || 'unknown'
        },
        { status: 500 }
      );
    }

    // Test bcrypt compare
    let verified;
    try {
      console.log('Attempting to verify password with bcrypt');
      verified = await bcrypt.compare(password, hashedPassword);
      console.log('Password verification result:', verified);
    } catch (verifyError) {
      console.error('bcrypt error during password verification:', verifyError);
      return NextResponse.json(
        { 
          error: 'Error verifying password', 
          details: verifyError instanceof Error ? verifyError.message : 'Unknown error',
          hashedPassword
        },
        { status: 500 }
      );
    }

    // Return results
    return NextResponse.json({
      success: true,
      hashedPassword,
      verified,
      bcryptVersion: bcrypt?.version || 'unknown'
    });
  } catch (error) {
    console.error('Unexpected bcrypt test error:', error);
    return NextResponse.json(
      { 
        error: 'Something went wrong', 
        details: error instanceof Error ? error.message : 'Unknown error',
        bcryptAvailable: typeof bcrypt !== 'undefined'
      },
      { status: 500 }
    );
  }
}