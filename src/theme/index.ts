/**
 * Theme Configuration
 * Light and Dark themes for React Native Paper
 */

import {MD3LightTheme, MD3DarkTheme, configureFonts} from 'react-native-paper';
import type {MD3Theme} from 'react-native-paper';

const fontConfig = {
  displayLarge: {
    fontFamily: 'System',
    fontSize: 57,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 64,
  },
  displayMedium: {
    fontFamily: 'System',
    fontSize: 45,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 52,
  },
  displaySmall: {
    fontFamily: 'System',
    fontSize: 36,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 44,
  },
  // Add other font variants as needed
};

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1E88E5',
    secondary: '#26A69A',
    tertiary: '#FFA726',
    error: '#EF5350',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    surfaceVariant: '#E0E0E0',
    onBackground: '#212121',
    onSurface: '#212121',
    success: '#66BB6A',
    warning: '#FFA726',
    info: '#42A5F5',
  },
  fonts: configureFonts({config: fontConfig}),
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#42A5F5',
    secondary: '#4DB6AC',
    tertiary: '#FFB74D',
    error: '#EF5350',
    background: '#121212',
    surface: '#1E1E1E',
    surfaceVariant: '#2C2C2C',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    success: '#66BB6A',
    warning: '#FFA726',
    info: '#42A5F5',
  },
  fonts: configureFonts({config: fontConfig}),
};

// Extended theme with custom properties
export interface ExtendedTheme extends MD3Theme {
  colors: MD3Theme['colors'] & {
    success: string;
    warning: string;
    info: string;
  };
}

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
