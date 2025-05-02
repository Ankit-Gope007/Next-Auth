import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// inside this middleware function we can access the request object and add our own logic 
// to determine if the user is authenticated or not 
export function middleware(request: NextRequest) {
    // getting the path name from the url
    const path = request.nextUrl.pathname

    // determining the public paths
    const isPublicPath = path === '/login' || path === '/signup'

    // getting the token from the cookies
    const token = request.cookies.get('token')?.value||''

    //now redirection logic
    if(isPublicPath && token){
        // if the user is already logged in and trying to access the login or signup page
        // redirect to the profile page
        return NextResponse.redirect(new URL('/profile', request.url))
    }
    if(!isPublicPath && !token){
        // if the user is not logged in and trying to access any other page
        // redirect to the login page
        return NextResponse.redirect(new URL('/login', request.url))
    }


}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile',
  ],
}