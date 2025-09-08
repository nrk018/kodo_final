import { NextRequest, NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = [
    '/api/auth/login',
    '/api/auth/signup',
  ].includes(path);

  // Check if the path is an API route that requires authentication
  const isApiPath = path.startsWith('/api/') && !isPublicPath;

  // Get the token from the cookies
  const token = request.cookies.get('auth-token')?.value;
  const userId = request.cookies.get('user-id')?.value;

  // If it's an API path and no token is present, return 401
  if (isApiPath && (!token || !userId)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // For protected API routes, add the user ID to the request headers
  if (isApiPath && userId) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', userId);

    // Return the response with the modified headers
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Continue for all other cases
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/api/:path*',
  ],
};