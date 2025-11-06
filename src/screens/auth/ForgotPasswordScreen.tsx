/**
 * Forgot Password Screen
 */

import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, TextInput, Button, useTheme} from 'react-native-paper';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigation/AuthNavigator';
import {spacing} from '../../theme';

type ForgotPasswordScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;
};

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({navigation}) => {
  const theme = useTheme();
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
      <Text variant="headlineLarge" style={styles.title}>
        Reset Password
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Enter your email to receive a password reset link
      </Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <Button mode="contained" onPress={handleReset} loading={loading} style={styles.button}>
        Send Reset Link
      </Button>

      <Button mode="text" onPress={() => navigation.goBack()} style={styles.backButton}>
        Back to Login
      </Button>
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
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  subtitle: {
    opacity: 0.7,
    marginBottom: spacing.xl,
  },
  input: {
    marginBottom: spacing.md,
    backgroundColor: 'transparent',
  },
  button: {
    paddingVertical: spacing.xs,
  },
  backButton: {
    marginTop: spacing.md,
  },
});

export default ForgotPasswordScreen;
