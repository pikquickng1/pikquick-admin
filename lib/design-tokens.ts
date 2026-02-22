export const colors = {
    primary: {
        50: '#e8f1fc',
        100: '#d1e3f9',
        200: '#a3c7f3',
        300: '#75aaed',
        400: '#5f97e8',
        500: '#4A85E4', // Base blue
        600: '#3b6ab6',
        700: '#2c5089',
        800: '#1e355b',
        900: '#0f1b2e',
    },
    neutral: {
        50: '#fafbfc',
        100: '#f5f7f9',
        200: '#F0F2F5', // Neutral/200
        300: '#e1e4e8',
        400: '#c8cdd3',
        500: '#9ba3ad',
        600: '#6e7681',
        700: '#4a5159',
        800: '#2d3339',
        900: '#1a1d21',
    },
    text: {
        primary: '#070D17', // Main text color
        secondary: '#6e7681',
        muted: '#9ba3ad',
    },
    semantic: {
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
    },
    border: {
        light: '#E1E1E1', // Light border color
    },
} as const;

export const typography = {
    fontFamily: {
        sans: "'Outfit', ui-sans-serif, system-ui, sans-serif",
    },
    fontSize: {
        xs: '0.75rem',    // 12px
        sm: '0.875rem',   // 14px
        base: '1rem',     // 16px
        lg: '1.125rem',   // 18px
        xl: '1.25rem',    // 20px
        '2xl': '1.5rem',  // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem',    // 48px
    },
    fontWeight: {
        thin: 100,
        extralight: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
    },
} as const;

export const spacing = {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
} as const;

export const borderRadius = {
    none: '0',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
} as const;
