import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    const langCookie = request.cookies.get('NEXT_LOCALE')?.value;
    
    // If the user explicitly switched to English before, let them stay on the English home page
    if (langCookie === 'en') {
      return NextResponse.next();
    }

    // Default loading page is Arabic: redirect root to /ar
    return NextResponse.redirect(new URL('/ar', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Only match the root path (/)
  matcher: '/',
};
