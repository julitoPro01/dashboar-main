export const APP_ROUTES = {
  HOME: '/',

  DASHBOARD: '/dashboard',
  PROFILE: '/profile',

  CATEGORIES:{
    INDEX:"/categories",
    VIEW:(publicId:string)=>`/categories/${publicId}`
  },
  ATTRIBUTES:{
    INDEX:"/attributes",
    CATEGORY:"/attributes/category"
  },
  PRODUCTS: {
    INDEX: '/products',
    CREATE: '/products/create',
    VIEW: (id: string | number) => `/products/${id}`,
    EDIT: (id: string | number) => `/products/${id}/edit`,
    CATEGORIES: '/products/categories',
    INVENTORY: '/products/inventory',
  },

  SUPPLIERS: {
    INDEX: '/suppliers',
    CREATE: '/suppliers/create',
    VIEW: (id:string | number) => `/suppliers/${id}`,
    EDIT: (id:string | number) => `/suppliers/${id}/edit`,
    USERS: (id:string | number) => `/suppliers/${id}/users`,
    CREATE_USER: (id:string | number) => `/suppliers/${id}/users/create`,
  },

  ORDERS: {
    INDEX: '/orders',
    CREATE: '/orders/create',
    VIEW: (id: string | number) => `/orders/${id}`,
  },

  SETTINGS: {
    PROFILE: '/settings/profile',
    ACCOUNT: '/settings/account',
    TEAM: '/settings/team',
    BILLING: '/settings/billing',
  },

  NOT_FOUND: '/404',
  SERVER_ERROR: '/500',
  MAINTENANCE: '/maintenance',
} as const;