/**
 * Main Navigator
 * Bottom tab navigation for authenticated users
 */

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useColorScheme, Text} from 'react-native';
import {lightTheme, darkTheme} from '../theme';
import SimpleIcon from '../components/SimpleIcon';

import HomeScreen from '../screens/main/HomeScreen';
import SearchScreen from '../screens/main/SearchScreen';
import CreatePostScreen from '../screens/main/CreatePostScreen';
import NotificationsScreen from '../screens/main/NotificationsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  CreatePost: undefined;
  Notifications: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator: React.FC = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({color}) => (
            <Text style={{fontSize: 12, color}}>Home</Text>
          ),
          tabBarIcon: ({color, size}) => (
            <SimpleIcon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: ({color}) => (
            <Text style={{fontSize: 12, color}}>Search</Text>
          ),
          tabBarIcon: ({color, size}) => (
            <SimpleIcon name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{
          tabBarLabel: ({color}) => (
            <Text style={{fontSize: 12, color}}>Post</Text>
          ),
          tabBarIcon: ({color, size}) => (
            <SimpleIcon name="plus" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarLabel: ({color}) => (
            <Text style={{fontSize: 12, color}}>Alerts</Text>
          ),
          tabBarIcon: ({color, size}) => (
            <SimpleIcon name="bell" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({color}) => (
            <Text style={{fontSize: 12, color}}>Profile</Text>
          ),
          tabBarIcon: ({color, size}) => (
            <SimpleIcon name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
