"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
import { themes, getTheme, applyTheme } from '../themes';
const ThemeContext = createContext(undefined);
export function ThemeProvider({ children, defaultTheme = 'light', storageKey = 'chatbot-theme', enableSystemTheme = true }) {
    const [themeName, setThemeName] = useState(defaultTheme);
    const [mounted, setMounted] = useState(false);
    // Get system theme preference
    const getSystemTheme = () => {
        if (typeof window !== 'undefined' && enableSystemTheme) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return defaultTheme;
    };
    // Load theme from localStorage or system preference
    useEffect(() => {
        const savedTheme = localStorage.getItem(storageKey);
        const systemTheme = getSystemTheme();
        if (savedTheme && themes[savedTheme]) {
            setThemeName(savedTheme);
        }
        else if (enableSystemTheme) {
            setThemeName(systemTheme);
        }
        setMounted(true);
    }, [storageKey, enableSystemTheme, defaultTheme]);
    // Apply theme to document
    useEffect(() => {
        if (mounted) {
            const theme = getTheme(themeName);
            const cssVariables = applyTheme(theme);
            // Apply CSS variables to document root
            const root = document.documentElement;
            root.style.cssText = cssVariables;
            // Add theme class to body for additional styling
            document.body.className = document.body.className
                .replace(/chatbot-theme-\w+/g, '')
                .trim();
            document.body.classList.add(`chatbot-theme-${themeName}`);
        }
    }, [themeName, mounted]);
    // Listen for system theme changes
    useEffect(() => {
        if (!enableSystemTheme)
            return;
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            const savedTheme = localStorage.getItem(storageKey);
            if (!savedTheme) {
                setThemeName(getSystemTheme());
            }
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [storageKey, enableSystemTheme]);
    const setTheme = (newThemeName) => {
        if (themes[newThemeName]) {
            setThemeName(newThemeName);
            localStorage.setItem(storageKey, newThemeName);
        }
    };
    const currentTheme = getTheme(themeName);
    const availableThemes = Object.keys(themes);
    // Don't render until mounted to prevent hydration mismatch
    if (!mounted) {
        return _jsx("div", { style: { visibility: 'hidden' }, children: children });
    }
    return (_jsx(ThemeContext.Provider, { value: {
            currentTheme,
            themeName,
            setTheme,
            availableThemes
        }, children: children }));
}
export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
export function ThemeSelector({ className = '', showLabels = true }) {
    const { currentTheme, themeName, setTheme, availableThemes } = useTheme();
    return (_jsxs("div", { className: `flex items-center gap-2 ${className}`, children: [showLabels && (_jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: "Theme:" })), _jsx("div", { className: "flex gap-1", children: availableThemes.map((theme) => (_jsx("button", { onClick: () => setTheme(theme), className: `w-8 h-8 rounded-full border-2 transition-all ${themeName === theme
                        ? 'border-blue-500 scale-110'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'}`, style: {
                        backgroundColor: themes[theme].colors.primary,
                    }, title: themes[theme].name }, theme))) })] }));
}
//# sourceMappingURL=ThemeProvider.js.map