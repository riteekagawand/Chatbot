export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
    fontWeight: {
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
    };
  };
}

export const themes: Record<string, Theme> = {
  light: {
    name: 'Light',
    colors: {
      primary: '#3B82F6',
      secondary: '#6B7280',
      background: '#FFFFFF',
      surface: '#F9FAFB',
      text: '#111827',
      textSecondary: '#6B7280',
      border: '#E5E7EB',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      full: '9999px',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
  },
  dark: {
    name: 'Dark',
    colors: {
      primary: '#60A5FA',
      secondary: '#9CA3AF',
      background: '#111827',
      surface: '#1F2937',
      text: '#F9FAFB',
      textSecondary: '#D1D5DB',
      border: '#374151',
      success: '#34D399',
      warning: '#FBBF24',
      error: '#F87171',
      info: '#60A5FA',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      full: '9999px',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
  },
  blue: {
    name: 'Blue',
    colors: {
      primary: '#1E40AF',
      secondary: '#3B82F6',
      background: '#EFF6FF',
      surface: '#DBEAFE',
      text: '#1E3A8A',
      textSecondary: '#1D4ED8',
      border: '#93C5FD',
      success: '#059669',
      warning: '#D97706',
      error: '#DC2626',
      info: '#0284C7',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      full: '9999px',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(30, 64, 175, 0.1)',
      md: '0 4px 6px -1px rgba(30, 64, 175, 0.2), 0 2px 4px -1px rgba(30, 64, 175, 0.1)',
      lg: '0 10px 15px -3px rgba(30, 64, 175, 0.2), 0 4px 6px -2px rgba(30, 64, 175, 0.1)',
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
  },
  green: {
    name: 'Green',
    colors: {
      primary: '#059669',
      secondary: '#10B981',
      background: '#ECFDF5',
      surface: '#D1FAE5',
      text: '#064E3B',
      textSecondary: '#047857',
      border: '#86EFAC',
      success: '#059669',
      warning: '#D97706',
      error: '#DC2626',
      info: '#0284C7',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      full: '9999px',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(5, 150, 105, 0.1)',
      md: '0 4px 6px -1px rgba(5, 150, 105, 0.2), 0 2px 4px -1px rgba(5, 150, 105, 0.1)',
      lg: '0 10px 15px -3px rgba(5, 150, 105, 0.2), 0 4px 6px -2px rgba(5, 150, 105, 0.1)',
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
  },
  purple: {
    name: 'Purple',
    colors: {
      primary: '#7C3AED',
      secondary: '#8B5CF6',
      background: '#FAF5FF',
      surface: '#EDE9FE',
      text: '#581C87',
      textSecondary: '#6D28D9',
      border: '#C4B5FD',
      success: '#059669',
      warning: '#D97706',
      error: '#DC2626',
      info: '#0284C7',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      full: '9999px',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(124, 58, 237, 0.1)',
      md: '0 4px 6px -1px rgba(124, 58, 237, 0.2), 0 2px 4px -1px rgba(124, 58, 237, 0.1)',
      lg: '0 10px 15px -3px rgba(124, 58, 237, 0.2), 0 4px 6px -2px rgba(124, 58, 237, 0.1)',
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
  },
};

export function getTheme(themeName: string): Theme {
  return themes[themeName] || themes.light;
}

export function applyTheme(theme: Theme): string {
  return `
    --chatbot-primary: ${theme.colors.primary};
    --chatbot-secondary: ${theme.colors.secondary};
    --chatbot-background: ${theme.colors.background};
    --chatbot-surface: ${theme.colors.surface};
    --chatbot-text: ${theme.colors.text};
    --chatbot-text-secondary: ${theme.colors.textSecondary};
    --chatbot-border: ${theme.colors.border};
    --chatbot-success: ${theme.colors.success};
    --chatbot-warning: ${theme.colors.warning};
    --chatbot-error: ${theme.colors.error};
    --chatbot-info: ${theme.colors.info};
    --chatbot-spacing-xs: ${theme.spacing.xs};
    --chatbot-spacing-sm: ${theme.spacing.sm};
    --chatbot-spacing-md: ${theme.spacing.md};
    --chatbot-spacing-lg: ${theme.spacing.lg};
    --chatbot-spacing-xl: ${theme.spacing.xl};
    --chatbot-radius-sm: ${theme.borderRadius.sm};
    --chatbot-radius-md: ${theme.borderRadius.md};
    --chatbot-radius-lg: ${theme.borderRadius.lg};
    --chatbot-radius-full: ${theme.borderRadius.full};
    --chatbot-shadow-sm: ${theme.shadows.sm};
    --chatbot-shadow-md: ${theme.shadows.md};
    --chatbot-shadow-lg: ${theme.shadows.lg};
    --chatbot-font-family: ${theme.typography.fontFamily};
    --chatbot-font-size-xs: ${theme.typography.fontSize.xs};
    --chatbot-font-size-sm: ${theme.typography.fontSize.sm};
    --chatbot-font-size-base: ${theme.typography.fontSize.base};
    --chatbot-font-size-lg: ${theme.typography.fontSize.lg};
    --chatbot-font-size-xl: ${theme.typography.fontSize.xl};
    --chatbot-font-size-2xl: ${theme.typography.fontSize['2xl']};
    --chatbot-font-weight-normal: ${theme.typography.fontWeight.normal};
    --chatbot-font-weight-medium: ${theme.typography.fontWeight.medium};
    --chatbot-font-weight-semibold: ${theme.typography.fontWeight.semibold};
    --chatbot-font-weight-bold: ${theme.typography.fontWeight.bold};
  `;
}



