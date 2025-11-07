/**
 * Welcome Screen
 * Initial screen for unauthenticated users
 */

import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text, Button, useTheme} from 'react-native-paper';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigation/AuthNavigator';
import {spacing} from '../../theme';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({navigation}) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text variant="displayLarge" style={[styles.title, {color: theme.colors.primary}]}>
            AIG
          </Text>
          <Text variant="titleMedium" style={styles.subtitle}>
            Active Investors Group
          </Text>
        </View>
        <Text variant="bodyLarge" style={styles.tagline}>
          Connect, Share, and Grow Your Investment Knowledge
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Register')}
          style={styles.button}
          contentStyle={styles.buttonContent}>
          Get Started
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('Login')}
          style={styles.button}
          contentStyle={styles.buttonContent}>
          Sign In
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontWeight: '900',
    fontSize: 72,
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontWeight: '400',
    textAlign: 'center',
    opacity: 0.8,
    letterSpacing: 0.5,
  },
  tagline: {
    textAlign: 'center',
    opacity: 0.6,
    paddingHorizontal: spacing.xl,
    marginTop: spacing.md,
  },
  buttonContainer: {
    gap: spacing.md,
  },
  button: {
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: spacing.sm,
  },
});

export default WelcomeScreen;
