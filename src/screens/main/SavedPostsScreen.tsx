/**
 * Saved Posts Screen
 * View saved/bookmarked posts
 */

import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Text, useColorScheme} from 'react-native';
import {spacing, lightTheme, darkTheme} from '../../theme';
import {useAppSelector} from '../../store';
import PostCard from '../../components/PostCard';
import {Post} from '../../store/slices/feedSlice';

interface SavedPostsScreenProps {
  navigation: any;
}

const SavedPostsScreen: React.FC<SavedPostsScreenProps> = ({navigation}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const {posts} = useAppSelector(state => state.feed);
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Filter saved posts from the feed
    const filtered = posts.filter(post => post.isSaved);
    setSavedPosts(filtered);
  }, [posts]);

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyTitle, {color: theme.colors.text}]}>No Saved Posts</Text>
      <Text style={[styles.emptyText, {color: theme.colors.muted}]}>
        Posts you save will appear here
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <FlatList
        data={savedPosts}
        renderItem={({item}) => <PostCard post={item} />}
        keyExtractor={item => item.id}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={savedPosts.length === 0 ? styles.emptyList : styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  emptyList: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SavedPostsScreen;
