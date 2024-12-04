// Middleware for Route Protection
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware function
export function middleware(request: NextRequest) {
  // Example: Check if a user is logged in
  const token = request.cookies.get('token')?.value;

  if (!token) {
    // Redirect to login page if not authenticated
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow the request if authenticated
  return NextResponse.next();
}

// Optional: Specify which paths should be handled by the middleware
export const config = {
  matcher: ['/dashboard/:path*', '/tenants/:path*', '/cars/:path*'], // Apply middleware to these paths
};
