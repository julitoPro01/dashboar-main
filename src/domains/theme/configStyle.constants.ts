// domains/configStyle.ts

export interface ThemeColors {
  background: string;
  surface: string;
  primary: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  hover: string;
  active: string;
  error: string;
  success: string;
  warning: string;
  info: string;
}

export const lightThemeColors: ThemeColors = {
  background: '#f5f7f8',
  surface: '#ffffff',
  primary: '#0d7ff2',
  border: '#e2e8f0',
  textPrimary: '#1a202c',
  textSecondary: '#4a5568',
  hover: 'rgba(13, 127, 242, 0.1)',
  active: 'rgba(13, 127, 242, 0.2)',
  error: '#e53e3e',
  success: '#38a169',
  warning: '#d69e2e',
  info: '#3182ce'
};

export const darkThemeColors: ThemeColors = {
  background: '#101922',
  surface: '#1a242f',
  primary: '#0d7ff2',
  border: '#2d3947',
  textPrimary: '#f7fafc',
  textSecondary: '#cbd5e0',
  hover: 'rgba(66, 153, 225, 0.1)',
  active: 'rgba(66, 153, 225, 0.2)',
  error: '#fc8181',
  success: '#68d391',
  warning: '#f6ad55',
  info: '#63b3ed'
};

export type ThemeType = 'light' | 'dark' | 'auto';