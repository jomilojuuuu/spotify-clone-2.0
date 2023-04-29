// import {getToken} from "next-auth/jwt"
// import {NextRequest, NextResponse} from "next/server"

// export async function middleware(req: NextRequest) {
//     const token = await getToken({req, secret: process.env.JWT_SECRET});

//     const  {pathname} = req.nextUrl;

//     if (pathname.includes('/api/auth') || token) {
//         return NextResponse.next();
//     }

//     if (!token && pathname !== "/Login") {
//         return NextResponse.redirect('/Login')
//     }
// }


import {getToken} from "next-auth/jwt"
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export  async function middleware(req: NextRequest) {

    const token = await getToken({req, secret: process.env.JWT_SECRET});

    const  {pathname} = req.nextUrl;
  if (request.nextUrl.pathname.startsWith('/about')) {
    return NextResponse.rewrite(new URL('/about-2', req.url))
  }

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.rewrite(new URL('/dashboard/user', req.url))
  }
}