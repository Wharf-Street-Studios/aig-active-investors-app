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
        <Text variant="displayMedium" style={styles.title}>
          AIG
        </Text>
        <Text variant="displayLarge" style={styles.subtitle}>
          Active Investors Group
        </Text>
        <Text variant="bodyLarge" style={styles.tagline}>
          Connect, Share, and Grow Your Investment Knowledge
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Register')}
          style={styles.button}>
          Get Started
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('Login')}
          style={styles.button}>
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
  title: {
    fontWeight: 'bold',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontWeight: 'bold',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  tagline: {
    textAlign: 'center',
    opacity: 0.7,
    paddingHorizontal: spacing.xl,
  },
  buttonContainer: {
    gap: spacing.md,
  },
  button: {
    paddingVertical: spacing.xs,
  },
});

export default WelcomeScreen;
