/**
 * Main Stack Navigator
 * Stack navigation wrapping the main tab navigator
 */

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainNavigator from './MainNavigator';
import PostDetailScreen from '../screens/main/PostDetailScreen';
import UserProfileScreen from '../screens/main/UserProfileScreen';
import EditProfileScreen from '../screens/main/EditProfileScreen';

export type MainStackParamList = {
  MainTabs: undefined;
  PostDetail: {postId: string};
  UserProfile: {userId: string};
  EditProfile: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{
          title: 'Post',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{
          title: 'Profile',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: 'Edit Profile',
          headerBackTitle: 'Cancel',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
