import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    // For MVP, hardcoded credentials. In production, check against Prisma Admin table.
    if (username === "admin@pournamy" && password === "P@uRn@mY$$#") {
      const response = NextResponse.json({ success: true });
      response.cookies.set('admin_auth', 'true', { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        path: '/',
        maxAge: 60 * 60 * 24 // 1 day
      });
      return response;
    }
    
    return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
