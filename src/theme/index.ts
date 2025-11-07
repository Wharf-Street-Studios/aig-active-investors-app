/**
 * Simple Theme Configuration
 * Low-fidelity theme for basic React Native
 */

export interface Theme {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    error: string;
    success: string;
    muted: string;
  };
}

export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#000000',
    background: '#FFFFFF',
    card: '#F5F5F5',
    text: '#000000',
    border: '#CCCCCC',
    notification: '#000000',
    error: '#FF0000',
    success: '#00AA00',
    muted: '#999999',
  },
};

export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#FFFFFF',
    background: '#000000',
    card: '#1A1A1A',
    text: '#FFFFFF',
    border: '#333333',
    notification: '#FFFFFF',
    error: '#FF6666',
    success: '#66FF66',
    muted: '#666666',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};
