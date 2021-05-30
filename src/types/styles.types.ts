export type ThemeType = 'dark' | 'light';
export interface IThemeContext {
  setCurrentTheme: SetCurrentTheme;
  currentTheme: ThemeType;
}

export interface ThemeHook {
  currentTheme: ThemeType;
  toggleTheme: () => Promise<void>;
  isDark: boolean;
}
export type SetCurrentTheme = (theme: ThemeType) => void;
