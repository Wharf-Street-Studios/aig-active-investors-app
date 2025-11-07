/**
 * Home Screen
 * Main feed screen showing posts
 */

import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList, RefreshControl, Text, TouchableOpacity, useColorScheme} from 'react-native';
import {spacing, lightTheme, darkTheme} from '../../theme';
import {useAppSelector, useAppDispatch} from '../../store';
import {
  fetchFeedStart,
  fetchFeedSuccess,
  setFilter,
  refreshFeedStart,
} from '../../store/slices/feedSlice';
import PostCard from '../../components/PostCard';

const HomeScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
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
      <TouchableOpacity
        onPress={() => dispatch(setFilter('home'))}
        style={[
          styles.chip,
          {
            backgroundColor: filter === 'home' ? theme.colors.primary : theme.colors.card,
            borderColor: theme.colors.border,
          }
        ]}>
        <Text style={[
          styles.chipText,
          {color: filter === 'home' ? (theme.dark ? theme.colors.background : theme.colors.background) : theme.colors.text}
        ]}>
          For You
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => dispatch(setFilter('following'))}
        style={[
          styles.chip,
          {
            backgroundColor: filter === 'following' ? theme.colors.primary : theme.colors.card,
            borderColor: theme.colors.border,
          }
        ]}>
        <Text style={[
          styles.chipText,
          {color: filter === 'following' ? (theme.dark ? theme.colors.background : theme.colors.background) : theme.colors.text}
        ]}>
          Following
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => dispatch(setFilter('trending'))}
        style={[
          styles.chip,
          {
            backgroundColor: filter === 'trending' ? theme.colors.primary : theme.colors.card,
            borderColor: theme.colors.border,
          }
        ]}>
        <Text style={[
          styles.chipText,
          {color: filter === 'trending' ? (theme.dark ? theme.colors.background : theme.colors.background) : theme.colors.text}
        ]}>
          Trending
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => dispatch(setFilter('latest'))}
        style={[
          styles.chip,
          {
            backgroundColor: filter === 'latest' ? theme.colors.primary : theme.colors.card,
            borderColor: theme.colors.border,
          }
        ]}>
        <Text style={[
          styles.chipText,
          {color: filter === 'latest' ? (theme.dark ? theme.colors.background : theme.colors.background) : theme.colors.text}
        ]}>
          Latest
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, {color: theme.colors.muted}]}>
        No posts yet. Start following users or create your first post!
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={[styles.header, {backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border}]}>
        <Text style={[styles.title, {color: theme.colors.primary}]}>
          AIG
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
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  chip: {
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: spacing.xl,
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

export default HomeScreen;
