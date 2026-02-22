
import { NextResponse } from "next/server";
import { auth } from "./auth.config";


export default auth((req) => {

  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const pathname = nextUrl.pathname;

  // Rutas públicas que no requieren autenticación
  const publicRoutes = [
    "/",
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/api/public",
    "/auth/create"
  ];

  // Verificar si la ruta actual es pública
  const isPublicRoute = publicRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // 1. Si está en login y ya tiene sesión → redirigir a home
  if (pathname.startsWith("/auth/login") && isLoggedIn) {
    
    const urlParams =  nextUrl.searchParams.get("callbackUrl") ?? "/";
    return NextResponse.redirect(new URL(`${urlParams}`, nextUrl));
  }

  // 2. Si NO está logueado y NO es ruta pública → redirigir a login
  if (!isLoggedIn && !isPublicRoute) {
    const loginUrl = new URL("/auth/login", nextUrl);
    // Agregar parámetro de retorno para redirigir después del login
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Protege todas las rutas EXCEPTUANDO:
    "/((?!api/|_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
};