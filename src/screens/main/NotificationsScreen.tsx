/**
 * Notifications Screen
 * Display user notifications
 */

import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text, useColorScheme} from 'react-native';
import {spacing, lightTheme, darkTheme} from '../../theme';
import {useAppSelector, useAppDispatch} from '../../store';
import {fetchNotificationsStart, fetchNotificationsSuccess, markAllAsRead} from '../../store/slices/notificationSlice';
import {useNavigation} from '@react-navigation/native';
import {FavouriteIcon, CommentIcon, UserIcon, AlertIcon, MessageIcon} from '@hugeicons/react-native';

const NotificationsScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const {notifications, unreadCount} = useAppSelector(state => state.notification);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    dispatch(fetchNotificationsStart());
    // Using mock data for static app flow
    setTimeout(() => {
      const mockData = require('../../services/mockData');
      const notifications = mockData.getMockNotifications();
      // Transform to match expected format
      const formattedNotifications = notifications.map((n: any) => ({
        ...n,
        message: n.content,
      }));
      dispatch(fetchNotificationsSuccess(formattedNotifications));
    }, 500);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'follow':
        return <UserIcon size={24} color={theme.colors.primary} />;
      case 'like':
        return <FavouriteIcon size={24} color={theme.colors.error} />;
      case 'comment':
        return <CommentIcon size={24} color={theme.colors.primary} />;
      case 'mention':
        return <AlertIcon size={24} color={theme.colors.primary} />;
      case 'message':
        return <MessageIcon size={24} color={theme.colors.primary} />;
      default:
        return <AlertIcon size={24} color={theme.colors.primary} />;
    }
  };

  const handleNotificationPress = (notification: any) => {
    switch (notification.type) {
      case 'like':
      case 'comment':
      case 'mention':
        if (notification.postId) {
          navigation.navigate('PostDetail', {postId: notification.postId});
        }
        break;
      case 'follow':
        if (notification.userId) {
          navigation.navigate('UserProfile', {userId: notification.userId});
        }
        break;
      default:
        break;
    }
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, {color: theme.colors.muted}]}>
        No notifications yet
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={[styles.header, {backgroundColor: theme.colors.card}]}>
        <Text style={[styles.title, {color: theme.colors.text}]}>
          Notifications
        </Text>
        {unreadCount > 0 && (
          <View style={[styles.badge, {backgroundColor: theme.colors.error}]}>
            <Text style={styles.badgeText}>{unreadCount}</Text>
          </View>
        )}
      </View>

      <FlatList
        data={notifications}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => handleNotificationPress(item)}
            style={[
              styles.listItem,
              {
                backgroundColor: !item.isRead ? theme.colors.card : 'transparent',
                borderBottomColor: theme.colors.border,
              },
            ]}>
            <View style={[styles.iconContainer, {backgroundColor: theme.colors.card}]}>
              {getNotificationIcon(item.type)}
            </View>
            <View style={styles.content}>
              <Text style={[styles.userName, {color: theme.colors.text}]}>
                {item.displayName || item.username}
              </Text>
              <Text style={[styles.message, {color: theme.colors.text}]}>
                {item.message}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.md,
    paddingTop: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  badge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    padding: spacing.md,
    borderBottomWidth: 1,
    gap: spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  message: {
    fontSize: 14,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default NotificationsScreen;
