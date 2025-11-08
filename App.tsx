/**
 * InvestConnect Mobile App - Expo Version
 */

import React from 'react';
import { useColorScheme, View, StyleSheet, Platform, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { store, persistor } from './src/store';
import { lightTheme, darkTheme } from './src/theme';
import AppNavigator from './src/navigation/AppNavigator';
import ErrorBoundary from './src/components/ErrorBoundary';

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <ErrorBoundary>
      <ReduxProvider store={store}>
        <PersistGate
          loading={
            <View style={[styles.loadingContainer, {backgroundColor: theme.colors.background}]}>
              <Text style={{color: theme.colors.text}}>Loading...</Text>
            </View>
          }
          persistor={persistor}
        >
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
        </PersistGate>
      </ReduxProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
