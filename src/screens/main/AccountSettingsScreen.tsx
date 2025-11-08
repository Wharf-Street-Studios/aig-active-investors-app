/**
 * Account Settings Screen
 * Manage account settings
 */

import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Text, TouchableOpacity, useColorScheme, Switch, Alert} from 'react-native';
import {spacing, lightTheme, darkTheme} from '../../theme';
import SimpleIcon from '../../components/SimpleIcon';

interface AccountSettingsScreenProps {
  navigation: any;
}

const AccountSettingsScreen: React.FC<AccountSettingsScreenProps> = ({navigation}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'This feature will be available soon');
  };

  const handleChangeEmail = () => {
    Alert.alert('Change Email', 'This feature will be available soon');
  };

  const handleManageConnectedAccounts = () => {
    Alert.alert('Connected Accounts', 'This feature will be available soon');
  };

  const handleDeactivateAccount = () => {
    Alert.alert(
      'Deactivate Account',
      'Are you sure you want to deactivate your account? You can reactivate it anytime by logging back in.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Deactivate', style: 'destructive', onPress: () => {
          Alert.alert('Success', 'Account deactivated');
        }},
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to permanently delete your account? This action cannot be undone.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', style: 'destructive', onPress: () => {
          Alert.alert('Confirm', 'Type DELETE to confirm', [
            {text: 'Cancel', style: 'cancel'},
          ]);
        }},
      ]
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Security</Text>

          <TouchableOpacity
            onPress={handleChangePassword}
            style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="settings" size={24} color={theme.colors.text} />
            <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Change Password</Text>
            <SimpleIcon name="chevron-right" size={20} color={theme.colors.muted} />
          </TouchableOpacity>

          <View style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="settings" size={24} color={theme.colors.text} />
            <View style={styles.menuItemContent}>
              <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Two-Factor Authentication</Text>
              <Switch
                value={twoFactorEnabled}
                onValueChange={setTwoFactorEnabled}
                trackColor={{false: theme.colors.muted, true: theme.colors.primary}}
                thumbColor={theme.colors.background}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Account Information</Text>

          <TouchableOpacity
            onPress={handleChangeEmail}
            style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="user" size={24} color={theme.colors.text} />
            <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Change Email</Text>
            <SimpleIcon name="chevron-right" size={20} color={theme.colors.muted} />
          </TouchableOpacity>

          <View style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="bell" size={24} color={theme.colors.text} />
            <View style={styles.menuItemContent}>
              <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Email Notifications</Text>
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{false: theme.colors.muted, true: theme.colors.primary}}
                thumbColor={theme.colors.background}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={handleManageConnectedAccounts}
            style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="user" size={24} color={theme.colors.text} />
            <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Connected Accounts</Text>
            <SimpleIcon name="chevron-right" size={20} color={theme.colors.muted} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Danger Zone</Text>

          <TouchableOpacity
            onPress={handleDeactivateAccount}
            style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="user" size={24} color={theme.colors.error} />
            <Text style={[styles.menuItemText, {color: theme.colors.error}]}>Deactivate Account</Text>
            <SimpleIcon name="chevron-right" size={20} color={theme.colors.muted} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDeleteAccount}
            style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="user" size={24} color={theme.colors.error} />
            <Text style={[styles.menuItemText, {color: theme.colors.error}]}>Delete Account</Text>
            <SimpleIcon name="chevron-right" size={20} color={theme.colors.muted} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
    borderBottomWidth: 1,
  },
  menuItemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
  },
});

export default AccountSettingsScreen;
