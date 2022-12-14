// middleware.ts
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    if (request.nextUrl.pathname.startsWith('/')) {
        const cookie = request.cookies.get('auth')
        if (cookie?.value == 'true') {
            console.log('cookie true')
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '/tablero', '/pedidos/(.*)', '/contacto/(.*)'],
}