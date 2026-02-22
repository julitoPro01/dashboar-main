import { AUTH_ROUTES } from './auth.routes';
import { APP_ROUTES } from './app.routes';

// Unión de todas las rutas
export type AllRoutes =
    | PublicRoute
    | PrivateRoute
    | string; // Para rutas dinámicas

// Tipo para rutas privadas (requieren autenticación)
export type PrivateRoute =
    | typeof APP_ROUTES.DASHBOARD
    | typeof APP_ROUTES.PROFILE
    | ReturnType<typeof APP_ROUTES.PRODUCTS.VIEW>
    | ReturnType<typeof APP_ROUTES.SUPPLIERS.VIEW>
    | ReturnType<typeof APP_ROUTES.ORDERS.VIEW>;


// Tipo para rutas públicas (acceso sin autenticación)
export type PublicRoute = typeof AUTH_ROUTES[keyof typeof AUTH_ROUTES];