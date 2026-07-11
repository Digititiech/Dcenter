import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const acceptHeader = request.headers.get('accept') || '';

  // 1. Content negotiation for markdown
  if (acceptHeader.includes('text/markdown')) {
    if (!pathname.startsWith('/api') && !pathname.includes('.') && !pathname.startsWith('/_next')) {
      const url = request.nextUrl.clone();
      url.pathname = '/api/markdown';
      url.searchParams.set('path', pathname);
      return NextResponse.rewrite(url);
    }
  }

  // 2. Language redirection
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
  matcher: [
    // Match all routes except standard static files and api routes
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
