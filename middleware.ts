import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    console.log("TOKEN", token);

    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/_next")) return NextResponse.next();

    if (pathname.includes("/api/auth") || token) {
        return NextResponse.next();
    }

    if (!token && pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}
