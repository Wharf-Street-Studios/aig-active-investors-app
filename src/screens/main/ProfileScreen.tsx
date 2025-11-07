/**
 * Profile Screen
 * User profile and settings
 */

import React from 'react';
import {View, StyleSheet, ScrollView, Text, TouchableOpacity, useColorScheme} from 'react-native';
import {spacing, lightTheme, darkTheme} from '../../theme';
import {useAppSelector, useAppDispatch} from '../../store';
import {logout} from '../../store/slices/authSlice';
import SimpleIcon from '../../components/SimpleIcon';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <ScrollView>
        <View style={[styles.header, {backgroundColor: theme.colors.card}]}>
          <View style={[styles.avatar, {backgroundColor: theme.colors.muted}]}>
            <Text style={[styles.avatarText, {color: theme.colors.background}]}>
              {user?.displayName?.charAt(0) || 'U'}
            </Text>
          </View>
          <Text style={[styles.displayName, {color: theme.colors.text}]}>
            {user?.displayName || 'User'}
          </Text>
          <Text style={[styles.username, {color: theme.colors.muted}]}>
            @{user?.username || 'username'}
          </Text>

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={[styles.statNumber, {color: theme.colors.text}]}>0</Text>
              <Text style={[styles.statLabel, {color: theme.colors.muted}]}>Posts</Text>
            </View>
            <View style={styles.stat}>
              <Text style={[styles.statNumber, {color: theme.colors.text}]}>0</Text>
              <Text style={[styles.statLabel, {color: theme.colors.muted}]}>Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={[styles.statNumber, {color: theme.colors.text}]}>0</Text>
              <Text style={[styles.statLabel, {color: theme.colors.muted}]}>Following</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleEditProfile}
            style={[styles.editButton, {borderColor: theme.colors.border}]}>
            <Text style={[styles.editButtonText, {color: theme.colors.text}]}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuContainer}>
          <Text style={[styles.menuTitle, {color: theme.colors.muted}]}>Settings</Text>

          <TouchableOpacity style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="settings" size={24} color={theme.colors.text} />
            <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Account Settings</Text>
            <SimpleIcon name="chevron-right" size={20} color={theme.colors.muted} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="settings" size={24} color={theme.colors.text} />
            <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Privacy & Security</Text>
            <SimpleIcon name="chevron-right" size={20} color={theme.colors.muted} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="bell" size={24} color={theme.colors.text} />
            <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Notifications</Text>
            <SimpleIcon name="chevron-right" size={20} color={theme.colors.muted} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="bookmark" size={24} color={theme.colors.text} />
            <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Saved Posts</Text>
            <SimpleIcon name="chevron-right" size={20} color={theme.colors.muted} />
          </TouchableOpacity>

          <View style={[styles.divider, {backgroundColor: theme.colors.border}]} />

          <TouchableOpacity style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="user" size={24} color={theme.colors.text} />
            <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Help & Support</Text>
            <SimpleIcon name="chevron-right" size={20} color={theme.colors.muted} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="user" size={24} color={theme.colors.text} />
            <Text style={[styles.menuItemText, {color: theme.colors.text}]}>About</Text>
            <SimpleIcon name="chevron-right" size={20} color={theme.colors.muted} />
          </TouchableOpacity>
        </View>

        <View style={styles.logoutContainer}>
          <TouchableOpacity
            onPress={handleLogout}
            style={[styles.logoutButton, {backgroundColor: theme.colors.error}]}>
            <Text style={styles.logoutButtonText}>Logout</Text>
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
  header: {
    padding: spacing.xl,
    paddingTop: spacing.xxl,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  displayName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  username: {
    fontSize: 16,
    marginBottom: spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.xl,
    marginBottom: spacing.lg,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
  },
  editButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuContainer: {
    marginTop: spacing.lg,
  },
  menuTitle: {
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
  menuItemText: {
    flex: 1,
    fontSize: 16,
  },
  divider: {
    height: 1,
    marginVertical: spacing.sm,
  },
  logoutContainer: {
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  logoutButton: {
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
