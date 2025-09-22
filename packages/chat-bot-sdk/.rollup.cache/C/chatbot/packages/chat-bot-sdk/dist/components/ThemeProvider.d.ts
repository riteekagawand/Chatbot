import React from 'react';
import { Theme } from '../themes';
interface ThemeContextType {
    currentTheme: Theme;
    themeName: string;
    setTheme: (themeName: string) => void;
    availableThemes: string[];
}
interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: string;
    storageKey?: string;
    enableSystemTheme?: boolean;
}
export declare function ThemeProvider({ children, defaultTheme, storageKey, enableSystemTheme }: ThemeProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useTheme(): ThemeContextType;
interface ThemeSelectorProps {
    className?: string;
    showLabels?: boolean;
}
export declare function ThemeSelector({ className, showLabels }: ThemeSelectorProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ThemeProvider.d.ts.map