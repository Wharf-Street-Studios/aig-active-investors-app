/**
 * Home Screen
 * Main feed screen showing posts
 */

import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {Text, FAB, useTheme, Chip} from 'react-native-paper';
import {spacing} from '../../theme';
import {useAppSelector, useAppDispatch} from '../../store';
import {
  fetchFeedStart,
  fetchFeedSuccess,
  setFilter,
  refreshFeedStart,
} from '../../store/slices/feedSlice';
import PostCard from '../../components/PostCard';

const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const {posts, isLoading, isRefreshing, filter} = useAppSelector(
    state => state.feed,
  );

  useEffect(() => {
    loadFeed();
  }, [filter]);

  const loadFeed = () => {
    dispatch(fetchFeedStart());
    // Using mock data for static app flow
    setTimeout(() => {
      const mockData = require('../../services/mockData');
      const posts = mockData.getMockPosts(filter);
      dispatch(fetchFeedSuccess(posts));
    }, 500);
  };

  const handleRefresh = () => {
    dispatch(refreshFeedStart());
    loadFeed();
  };

  const renderHeader = () => (
    <View style={styles.filterContainer}>
      <Chip
        selected={filter === 'home'}
        onPress={() => dispatch(setFilter('home'))}
        style={styles.chip}>
        For You
      </Chip>
      <Chip
        selected={filter === 'following'}
        onPress={() => dispatch(setFilter('following'))}
        style={styles.chip}>
        Following
      </Chip>
      <Chip
        selected={filter === 'trending'}
        onPress={() => dispatch(setFilter('trending'))}
        style={styles.chip}>
        Trending
      </Chip>
      <Chip
        selected={filter === 'latest'}
        onPress={() => dispatch(setFilter('latest'))}
        style={styles.chip}>
        Latest
      </Chip>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text variant="bodyLarge" style={styles.emptyText}>
        No posts yet. Start following users or create your first post!
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={[styles.header, {backgroundColor: theme.colors.surface}]}>
        <Text variant="headlineMedium" style={styles.title}>
          Active Investors Group
        </Text>
      </View>

      <FlatList
        data={posts}
        renderItem={({item}) => <PostCard post={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={!isLoading ? renderEmpty : null}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        contentContainerStyle={styles.listContent}
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
  },
  title: {
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.sm,
  },
  chip: {
    marginRight: spacing.xs,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.6,
  },
});

export default HomeScreen;
