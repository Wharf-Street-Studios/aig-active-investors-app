/**
 * Font loading hook
 * Ensures fonts are loaded before rendering
 */

import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(Platform.OS === 'web');

  useEffect(() => {
    if (Platform.OS === 'web') {
      // On web, fonts are loaded via CSS
      setFontsLoaded(true);
    } else {
      // On native, we would load fonts here
      // For now, just mark as loaded
      setFontsLoaded(true);
    }
  }, []);

  return fontsLoaded;
};
