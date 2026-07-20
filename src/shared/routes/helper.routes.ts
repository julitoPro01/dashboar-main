
// Helper para construir rutas con parámetros

import { APP_ROUTES } from "./app.routes";
import { AUTH_ROUTES } from "./auth.routes";
import { PublicRoute } from "./types.routes";

// buildRoute('/suppliers/:id', { id: 123 })
export function buildRoute<T extends Record<string, string | number>>(
    path: string,
    params?: T
): string {
    if (!params) return path;

    let result = path;
    Object.entries(params).forEach(([key, value]) => {
        result = result.replace(`:${key}`, encodeURIComponent(String(value)));
    });

    return result;
}

// Helper para añadir query params
export function withQueryParams(
    path: string,
    params: Record<string, any>,
    searchParams?:any,
    del?:string
): string {

    const queryString = new URLSearchParams(searchParams ?? "");

    Object.entries(params).forEach(([key, value]) => {
        if (!!value)
            queryString.set(key, String(value));
    });

    if(del)
        queryString.delete(del)
    
    const query = queryString.toString();
    return query ? `${path}?${query}` : path;
}

// Verificar si una ruta es pública
export function isPublicRoute(path: string): boolean {
    return Object.values(AUTH_ROUTES).includes(path as PublicRoute) ||
        path === APP_ROUTES.HOME;
}

// Verificar si una ruta requiere autenticación
export function isPrivateRoute(path: string): boolean {
    return !isPublicRoute(path) && !path.startsWith('/api/');
}

