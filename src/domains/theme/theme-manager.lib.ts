import { ThemeType } from "./configStyle.constants";

// Definir el tipo para nuestro Custom Event
interface ThemeChangeEventDetail {
  theme: ThemeType;
  computedTheme: 'light' | 'dark';
}

// Crear el tipo para el evento
export type ThemeChangeEvent = CustomEvent<ThemeChangeEventDetail>;

export class ThemeManager {
  private static instance: ThemeManager;
  private currentTheme: ThemeType = 'auto';
  
  // Nombre del evento como constante
  public static readonly THEME_CHANGE_EVENT = 'theme-change';
  
  private constructor() {
    this.init();
  }
  
  public static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }
  
  private init(): void {
    this.currentTheme = this.getStoredTheme();
    this.applyTheme();
    this.setupSystemListener();
  }
  
  private getStoredTheme(): ThemeType {
    if (typeof window === 'undefined') return 'auto';
    const stored = localStorage.getItem('theme');
    return (stored as ThemeType) || 'auto';
  }
  
  private storeTheme(theme: ThemeType): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('theme', theme);
  }
  
  public getCurrentTheme(): ThemeType {
    return this.currentTheme;
  }
  
  public getComputedTheme(): 'light' | 'dark' {
    if (this.currentTheme === 'auto') {
      return this.getSystemTheme();
    }
    return this.currentTheme;
  }
  
  private getSystemTheme(): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  public setTheme(theme: ThemeType): void {
    this.currentTheme = theme;
    this.storeTheme(theme);
    this.applyTheme();
    this.dispatchChangeEvent();
  }
  
  public toggleTheme(): void {
    const newTheme = this.getComputedTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }
  
  private applyTheme(): void {
    if (typeof window === 'undefined') return;
    
    const computedTheme = this.getComputedTheme();
    const html = document.documentElement;
    
    // Limpiar clases anteriores
    html.classList.remove('light', 'dark', 'auto');
    
    // Aplicar nuevas clases
    html.classList.add(computedTheme);
    html.setAttribute('data-theme', computedTheme);
  }
  
  private setupSystemListener(): void {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemChange = () => {
      if (this.currentTheme === 'auto') {
        this.applyTheme();
        this.dispatchChangeEvent();
      }
    };
    
    // Manejar navegadores antiguos y modernos
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange);
    } else {
      // Para Safari < 14
      mediaQuery.addListener(handleSystemChange);
    }
  }
  
  private dispatchChangeEvent(): void {
    if (typeof window === 'undefined') return;
    
    const eventDetail: ThemeChangeEventDetail = {
      theme: this.currentTheme,
      computedTheme: this.getComputedTheme()
    };
    
    // Crear el Custom Event
    const themeChangeEvent = new CustomEvent(ThemeManager.THEME_CHANGE_EVENT, {
      detail: eventDetail
    }) as ThemeChangeEvent;
    
    // Disparar el evento
    window.dispatchEvent(themeChangeEvent);
  }
  
  // Método para suscribirse a cambios
  public onThemeChange(callback: (event: ThemeChangeEvent) => void): () => void {
    if (typeof window === 'undefined') return () => {};
    
    const handler = (event: Event) => {
      callback(event as ThemeChangeEvent);
    };
    
    window.addEventListener(ThemeManager.THEME_CHANGE_EVENT, handler);
    
    // Retornar función para desuscribirse
    return () => {
      window.removeEventListener(ThemeManager.THEME_CHANGE_EVENT, handler);
    };
  }
  
  // Métodos estáticos para acceso rápido
  public static get theme(): ThemeType {
    return ThemeManager.getInstance().getCurrentTheme();
  }
  
  public static set theme(value: ThemeType) {
    ThemeManager.getInstance().setTheme(value);
  }
  
  public static toggle(): void {
    ThemeManager.getInstance().toggleTheme();
  }
}

// Exportar instancia singleton
export const themeManager = ThemeManager.getInstance();