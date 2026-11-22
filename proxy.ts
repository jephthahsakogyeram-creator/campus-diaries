import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  // Do absolutely nothing except pass the request through
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}