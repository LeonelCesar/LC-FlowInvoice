import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    "/Dashboard/:path*",
    "/Clientes/:path*",
    "/Faturas/:path*",
    "/Detalhes/:path*",
  ],
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("lc_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/Login", req.url));
  }

  return NextResponse.next();
}

