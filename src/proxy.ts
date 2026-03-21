import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rotas públicas
const PUBLIC_ROUTES = ["/", "/Login"];

// Rotas protegidas (base paths)
const PROTECTED_ROUTES = [
  "/Dashboard",
  "/Clientes",
  "/Detalhes",
  "/Faturas",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_token")?.value;

  // 🔓 Verifica se é rota pública
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // 🔐 Verifica se é rota protegida (inclui sub-rotas)
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // 🚫 Não autenticado tentando acessar rota protegida
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  // 🔁 Já autenticado tentando acessar login
  if (token && pathname === "/Login") {
    return NextResponse.redirect(new URL("/Dashboard", request.url));
  }

  return NextResponse.next();
}

// 🎯 Define onde o middleware roda
export const config = {
  matcher: [
    /*
     * Aplica a todas as rotas exceto:
     * - arquivos internos do Next (_next)
     * - favicon
     * - arquivos estáticos (images, etc.)
     */
    "/((?!_next|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|gif)).*)",
  ],
};