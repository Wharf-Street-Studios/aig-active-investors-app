/**
 * Login Screen
 * User authentication screen
 */

import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, useColorScheme} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigation/AuthNavigator';
import {spacing, lightTheme, darkTheme} from '../../theme';
import {useAppDispatch} from '../../store';
import {loginStart, loginSuccess, loginFailure} from '../../store/slices/authSlice';
import SimpleIcon from '../../components/SimpleIcon';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    dispatch(loginStart());

    try {
      // TODO: Replace with actual API call
      // For now, simulate login
      setTimeout(() => {
        dispatch(
          loginSuccess({
            user: {
              id: '1',
              username: 'testuser',
              email: email,
              displayName: 'Test User',
              verificationStatus: 'none',
            },
            token: 'dummy_token',
            refreshToken: 'dummy_refresh_token',
          }),
        );
        setLoading(false);
      }, 1000);
    } catch (err) {
      setLoading(false);
      dispatch(loginFailure('Login failed. Please try again.'));
      setError('Login failed. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {backgroundColor: theme.colors.background},
        ]}>
        <View style={styles.header}>
          <Text style={[styles.title, {color: theme.colors.text}]}>
            Welcome Back
          </Text>
          <Text style={[styles.subtitle, {color: theme.colors.muted}]}>
            Sign in to continue
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, {color: theme.colors.text}]}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              style={[styles.input, {
                borderColor: theme.colors.border,
                color: theme.colors.text,
                backgroundColor: theme.colors.background,
              }]}
              placeholderTextColor={theme.colors.muted}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, {color: theme.colors.text}]}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="password"
                style={[styles.input, styles.passwordInput, {
                  borderColor: theme.colors.border,
                  color: theme.colors.text,
                  backgroundColor: theme.colors.background,
                }]}
                placeholderTextColor={theme.colors.muted}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}>
                <SimpleIcon name="eye" size={20} color={theme.colors.muted} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgotButton}>
            <Text style={[styles.forgotText, {color: theme.colors.primary}]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            style={[styles.loginButton, {
              backgroundColor: loading ? theme.colors.muted : theme.colors.primary,
            }]}>
            <Text style={[styles.loginButtonText, {
              color: theme.dark ? theme.colors.background : theme.colors.background,
            }]}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={[styles.registerText, {color: theme.colors.text}]}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={[styles.registerLink, {color: theme.colors.primary}]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {error ? (
        <View style={[styles.snackbar, {backgroundColor: theme.colors.error}]}>
          <Text style={styles.snackbarText}>{error}</Text>
          <TouchableOpacity onPress={() => setError('')}>
            <Text style={styles.snackbarDismiss}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
  },
  form: {
    gap: spacing.md,
  },
  inputContainer: {
    marginBottom: spacing.sm,
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
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeIcon: {
    position: 'absolute',
    right: spacing.md,
    top: spacing.md,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    padding: spacing.xs,
  },
  forgotText: {
    fontSize: 14,
  },
  loginButton: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  registerText: {
    fontSize: 14,
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '600',
  },
  snackbar: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.md,
    right: spacing.md,
    padding: spacing.md,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  snackbarText: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1,
  },
  snackbarDismiss: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LoginScreen;
