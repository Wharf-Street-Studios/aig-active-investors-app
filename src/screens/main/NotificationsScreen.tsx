/**
 * Notifications Screen
 * Display user notifications
 */

import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Text, List, Avatar, useTheme, Badge} from 'react-native-paper';
import {spacing} from '../../theme';
import {useAppSelector, useAppDispatch} from '../../store';
import {fetchNotificationsStart, fetchNotificationsSuccess, markAllAsRead} from '../../store/slices/notificationSlice';
import {useNavigation} from '@react-navigation/native';

const NotificationsScreen: React.FC = () => {
  const theme = useTheme();
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
        return 'account-plus';
      case 'like':
        return 'heart';
      case 'comment':
        return 'comment';
      case 'mention':
        return 'at';
      case 'message':
        return 'message';
      default:
        return 'bell';
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
      <Text variant="bodyLarge" style={styles.emptyText}>
        No notifications yet
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={[styles.header, {backgroundColor: theme.colors.surface}]}>
        <Text variant="headlineMedium" style={styles.title}>
          Notifications
        </Text>
        {unreadCount > 0 && (
          <Badge style={styles.badge}>{unreadCount}</Badge>
        )}
      </View>

      <FlatList
        data={notifications}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleNotificationPress(item)}>
            <List.Item
              title={item.displayName || item.username}
              description={item.message}
              left={props => (
                <Avatar.Icon
                  {...props}
                  icon={getNotificationIcon(item.type)}
                  size={40}
                />
              )}
              style={[
                styles.listItem,
                !item.isRead && {backgroundColor: theme.colors.surfaceVariant},
              ]}
            />
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
    fontWeight: 'bold',
  },
  badge: {
    position: 'absolute',
    top: spacing.xl,
    right: spacing.md,
  },
  listItem: {
    paddingVertical: spacing.sm,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    opacity: 0.6,
    textAlign: 'center',
  },
});

export default NotificationsScreen;
