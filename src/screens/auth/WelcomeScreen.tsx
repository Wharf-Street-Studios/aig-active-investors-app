/**
 * Welcome Screen
 * Initial screen for unauthenticated users
 */

import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, useColorScheme} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigation/AuthNavigator';
import {spacing, lightTheme, darkTheme} from '../../theme';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({navigation}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={[styles.title, {color: theme.colors.text}]}>
            AIG
          </Text>
          <Text style={[styles.subtitle, {color: theme.colors.text}]}>
            Active Investors Group
          </Text>
        </View>
        <Text style={[styles.tagline, {color: theme.colors.muted}]}>
          Connect, Share, and Grow Your Investment Knowledge
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={[styles.button, {backgroundColor: theme.colors.primary}]}>
          <Text style={[styles.buttonText, {color: theme.colors.background}]}>
            Get Started
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={[styles.buttonOutline, {borderColor: theme.colors.border}]}>
          <Text style={[styles.buttonText, {color: theme.colors.text}]}>
            Sign In
          </Text>
        </TouchableOpacity>
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
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
    marginTop: spacing.md,
  },
  buttonContainer: {
    gap: spacing.md,
  },
  button: {
    padding: spacing.md,
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonOutline: {
    padding: spacing.md,
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WelcomeScreen;
