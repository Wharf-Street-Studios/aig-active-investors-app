/**
 * InvestConnect Mobile App - Expo Version
 */

import React from 'react';
import { useColorScheme, View, StyleSheet, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { store } from './src/store';
import { lightTheme, darkTheme } from './src/theme';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <View style={[styles.webContainer, {backgroundColor: theme.colors.card}]}>
          <View style={[styles.mobileContainer, {backgroundColor: theme.colors.background}]}>
            <NavigationContainer theme={theme}>
              <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
              <AppNavigator />
            </NavigationContainer>
          </View>
        </View>
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
