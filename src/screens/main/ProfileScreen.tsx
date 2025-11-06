/**
 * Profile Screen
 * User profile and settings
 */

import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text, Avatar, Button, List, Divider, useTheme} from 'react-native-paper';
import {spacing} from '../../theme';
import {useAppSelector, useAppDispatch} from '../../store';
import {logout} from '../../store/slices/authSlice';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const theme = useTheme();
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
        <View style={[styles.header, {backgroundColor: theme.colors.surface}]}>
          <Avatar.Text
            size={80}
            label={user?.displayName?.charAt(0) || 'U'}
            style={styles.avatar}
          />
          <Text variant="headlineSmall" style={styles.displayName}>
            {user?.displayName || 'User'}
          </Text>
          <Text variant="bodyMedium" style={styles.username}>
            @{user?.username || 'username'}
          </Text>

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text variant="titleLarge">0</Text>
              <Text variant="bodySmall">Posts</Text>
            </View>
            <View style={styles.stat}>
              <Text variant="titleLarge">0</Text>
              <Text variant="bodySmall">Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text variant="titleLarge">0</Text>
              <Text variant="bodySmall">Following</Text>
            </View>
          </View>

          <Button mode="outlined" style={styles.editButton} onPress={handleEditProfile}>
            Edit Profile
          </Button>
        </View>

        <View style={styles.menuContainer}>
          <List.Section>
            <List.Subheader>Settings</List.Subheader>
            <List.Item
              title="Account Settings"
              left={props => <List.Icon {...props} icon="account-cog" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
            <List.Item
              title="Privacy & Security"
              left={props => <List.Icon {...props} icon="shield-account" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
            <List.Item
              title="Notifications"
              left={props => <List.Icon {...props} icon="bell-outline" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
            <List.Item
              title="Saved Posts"
              left={props => <List.Icon {...props} icon="bookmark-outline" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
            <Divider />
            <List.Item
              title="Help & Support"
              left={props => <List.Icon {...props} icon="help-circle-outline" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
            <List.Item
              title="About"
              left={props => <List.Icon {...props} icon="information-outline" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
          </List.Section>
        </View>

        <View style={styles.logoutContainer}>
          <Button mode="contained" onPress={handleLogout} buttonColor={theme.colors.error}>
            Logout
          </Button>
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
    marginBottom: spacing.md,
  },
  displayName: {
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  username: {
    opacity: 0.7,
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
  editButton: {
    paddingHorizontal: spacing.xl,
  },
  menuContainer: {
    marginTop: spacing.lg,
  },
  logoutContainer: {
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
});

export default ProfileScreen;
