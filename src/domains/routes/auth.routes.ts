export const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  
  // Redirecciones después de login/logout
  AFTER_LOGIN: '/dashboard',
  AFTER_LOGOUT: '/',
  UNAUTHORIZED: '/auth/login?redirect=/',
} as const;

