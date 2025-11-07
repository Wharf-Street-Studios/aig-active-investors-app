/**
 * Forgot Password Screen
 */

import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigation/AuthNavigator';
import {spacing, lightTheme, darkTheme} from '../../theme';

type ForgotPasswordScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;
};

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({navigation}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setLoading(true);
    // TODO: Implement password reset
    setTimeout(() => {
      setLoading(false);
      navigation.goBack();
    }, 1000);
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Text style={[styles.title, {color: theme.colors.text}]}>
        Reset Password
      </Text>
      <Text style={[styles.subtitle, {color: theme.colors.muted}]}>
        Enter your email to receive a password reset link
      </Text>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, {color: theme.colors.text}]}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={[styles.input, {
            borderColor: theme.colors.border,
            color: theme.colors.text,
            backgroundColor: theme.colors.background,
          }]}
          placeholderTextColor={theme.colors.muted}
        />
      </View>

      <TouchableOpacity
        onPress={handleReset}
        disabled={loading}
        style={[styles.button, {
          backgroundColor: loading ? theme.colors.muted : theme.colors.primary,
        }]}>
        <Text style={[styles.buttonText, {
          color: theme.dark ? theme.colors.background : theme.colors.background,
        }]}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Text style={[styles.backText, {color: theme.colors.primary}]}>
          Back to Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: spacing.xl,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 14,
    marginBottom: spacing.xs,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.md,
    fontSize: 16,
  },
  button: {
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    marginTop: spacing.md,
    alignItems: 'center',
    padding: spacing.sm,
  },
  backText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ForgotPasswordScreen;
