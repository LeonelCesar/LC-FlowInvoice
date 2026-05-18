import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/login", "/register"];
const PROTECTED_ROUTES = ["/dashboard", "/clientes", "/detalhes", "/faturas"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const normalized = pathname.toLowerCase();

  const token = request.cookies.get("lc_token")?.value;

  const isPublicRoute = PUBLIC_ROUTES.includes(normalized);
  const isProtectedRoute = PROTECTED_ROUTES.some(route =>
    normalized.startsWith(route)
  );

  // Se não tem token e a rota é protegida → redireciona para login
  if (!token && isProtectedRoute) {
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }

  // Se tem token e tenta acessar login → vai para dashboard
  if (token && normalized === "/login") {
    const url = new URL("/dashboard", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|gif)).*)"],
};