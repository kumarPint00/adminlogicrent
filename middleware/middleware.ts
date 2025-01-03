// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '../lib/jwt';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public routes
  const publicPaths = ['/login', '/signup', '/_next', '/api/auth'];
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const payload = verifyToken(token);

  if (!payload) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Role-based access control
  if (pathname.startsWith('/admin') && payload.role !== 'SuperAdmin') {
    return NextResponse.redirect(new URL('/401', req.url));
  }

  if (pathname.startsWith('/tenant') && payload.role !== 'TenantAdmin') {
    return NextResponse.redirect(new URL('/401', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'],
};
