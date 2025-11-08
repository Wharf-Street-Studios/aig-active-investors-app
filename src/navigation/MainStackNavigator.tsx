/**
 * Main Stack Navigator
 * Stack navigation wrapping the main tab navigator
 */

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, useColorScheme} from 'react-native';
import {lightTheme, darkTheme} from '../theme';
import MainNavigator from './MainNavigator';
import PostDetailScreen from '../screens/main/PostDetailScreen';
import UserProfileScreen from '../screens/main/UserProfileScreen';
import EditProfileScreen from '../screens/main/EditProfileScreen';
import AccountSettingsScreen from '../screens/main/AccountSettingsScreen';
import PrivacySecurityScreen from '../screens/main/PrivacySecurityScreen';
import NotificationSettingsScreen from '../screens/main/NotificationSettingsScreen';
import SavedPostsScreen from '../screens/main/SavedPostsScreen';
import HelpSupportScreen from '../screens/main/HelpSupportScreen';
import AboutScreen from '../screens/main/AboutScreen';

export type MainStackParamList = {
  MainTabs: undefined;
  PostDetail: {postId: string};
  UserProfile: {userId: string};
  EditProfile: undefined;
  AccountSettings: undefined;
  PrivacySecurity: undefined;
  NotificationSettings: undefined;
  SavedPosts: undefined;
  HelpSupport: undefined;
  About: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStackNavigator: React.FC = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTintColor: theme.colors.primary,
        headerTitleStyle: {
          color: theme.colors.text,
        },
        headerBackTitleVisible: false,
        headerTitle: ({children}) => (
          <Text style={{fontSize: 18, fontWeight: '600', color: theme.colors.text}}>
            {children}
          </Text>
        ),
      }}>
      <Stack.Screen
        name="MainTabs"
        component={MainNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{title: 'Post'}}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{title: 'Profile'}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{title: 'Edit Profile'}}
      />
      <Stack.Screen
        name="AccountSettings"
        component={AccountSettingsScreen}
        options={{title: 'Account Settings'}}
      />
      <Stack.Screen
        name="PrivacySecurity"
        component={PrivacySecurityScreen}
        options={{title: 'Privacy & Security'}}
      />
      <Stack.Screen
        name="NotificationSettings"
        component={NotificationSettingsScreen}
        options={{title: 'Notifications'}}
      />
      <Stack.Screen
        name="SavedPosts"
        component={SavedPostsScreen}
        options={{title: 'Saved Posts'}}
      />
      <Stack.Screen
        name="HelpSupport"
        component={HelpSupportScreen}
        options={{title: 'Help & Support'}}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{title: 'About'}}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
