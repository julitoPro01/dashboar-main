
export const APP_ROUTES = {
  // Página pública principal
  HOME: '/',
  
  // Dashboard y áreas privadas
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  
  // Módulo de Productos
  PRODUCTS: {
    INDEX: '/products',
    NEW: '/product/new',
    VIEW: (id: string | number) => `/products/${id}`,
    EDIT: (id: string | number) => `/products/${id}/edit`,
    CATEGORIES: '/products/categories',
    INVENTORY: '/products/inventory',
  },
  
  // Módulo de Proveedores (según tu código)
  SUPPLIERS: {
    INDEX: '/suppliers',
    REGISTER: '/supplier/register',
    REGISTER_USER: '/supplier/register-user',
    VIEW: (id: string | number) => `/suppliers/${id}`,
    EDIT: (id: string | number) => `/suppliers/${id}/edit`,
  },
  
  // Módulo de Órdenes
  ORDERS: {
    INDEX: '/orders',
    NEW: '/orders/new',
    VIEW: (id: string | number) => `/orders/${id}`,
  },
  
  // Configuración
  SETTINGS: {
    PROFILE: '/settings/profile',
    ACCOUNT: '/settings/account',
    TEAM: '/settings/team',
    BILLING: '/settings/billing',
  },
  
  // Utilidades
  NOT_FOUND: '/404',
  SERVER_ERROR: '/500',
  MAINTENANCE: '/maintenance',
} as const;

