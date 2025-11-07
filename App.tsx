/**
 * InvestConnect Mobile App - Expo Version
 */

import React, { useCallback, useEffect, useState } from 'react';
import { useColorScheme, View, StyleSheet, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { store } from './src/store';
import { lightTheme, darkTheme } from './src/theme';
import AppNavigator from './src/navigation/AppNavigator';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts
        await Font.loadAsync({
          ...MaterialCommunityIcons.font,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <View style={styles.webContainer} onLayout={onLayoutRootView}>
            <View style={styles.mobileContainer}>
              <NavigationContainer theme={theme}>
                <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
                <AppNavigator />
              </NavigationContainer>
            </View>
          </View>
        </PaperProvider>
      </SafeAreaProvider>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  mobileContainer: {
    flex: 1,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 480 : undefined,
    backgroundColor: '#fff',
    ...Platform.select({
      web: {
        boxShadow: '0 0 20px rgba(0,0,0,0.1)',
      },
    }),
  },
});
