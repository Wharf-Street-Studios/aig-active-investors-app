/**
 * Post Card Component
 * Displays a single post in the feed
 */

import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, useColorScheme, Share, Alert} from 'react-native';
import {Post} from '../store/slices/feedSlice';
import {spacing, lightTheme, darkTheme} from '../theme';
import {useAppDispatch} from '../store';
import {likePost, unlikePost, savePost, unsavePost} from '../store/slices/feedSlice';
import {formatTimeAgo} from '../utils/formatTime';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '../navigation/MainStackNavigator';
import SimpleIcon from './SimpleIcon';

type PostCardNavigationProp = NativeStackNavigationProp<MainStackParamList>;

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({post}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const dispatch = useAppDispatch();
  const navigation = useNavigation<PostCardNavigationProp>();

  const handleLike = () => {
    if (post.isLiked) {
      dispatch(unlikePost(post.id));
    } else {
      dispatch(likePost(post.id));
    }
  };

  const handleSave = () => {
    if (post.isSaved) {
      dispatch(unsavePost(post.id));
    } else {
      dispatch(savePost(post.id));
    }
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this post from @${post.username}: ${post.content.substring(0, 100)}${post.content.length > 100 ? '...' : ''}`,
        url: `https://wharf-street-studios.github.io/AIG-Social-App/post/${post.id}`,
      });

      if (result.action === Share.sharedAction) {
        // Post was shared successfully
        console.log('Post shared');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to share post');
    }
  };

  const handlePostPress = () => {
    navigation.navigate('PostDetail', {postId: post.id});
  };

  const handleProfilePress = () => {
    navigation.navigate('UserProfile', {userId: post.userId});
  };

  return (
    <View style={[styles.card, {backgroundColor: theme.colors.card, borderColor: theme.colors.border}]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleProfilePress} style={styles.profileSection}>
          <View style={[styles.avatar, {backgroundColor: theme.colors.muted}]}>
            <Text style={[styles.avatarText, {color: theme.colors.background}]}>
              {post.displayName.charAt(0)}
            </Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={[styles.displayName, {color: theme.colors.text}]}>
              {post.displayName}
            </Text>
            <Text style={[styles.subtitle, {color: theme.colors.muted}]}>
              @{post.username} · {formatTimeAgo(post.createdAt)}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <SimpleIcon name="more" size={20} color={theme.colors.muted} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handlePostPress} activeOpacity={0.7}>
        <View style={styles.content}>
          <Text style={[styles.contentText, {color: theme.colors.text}]}>
            {post.content}
          </Text>

          {((post.hashtags && post.hashtags.length > 0) || (post.tickers && post.tickers.length > 0)) && (
            <View style={styles.tagsContainer}>
              {post.tickers && post.tickers.length > 0 && post.tickers.map((ticker, index) => (
                <View
                  key={`ticker-${index}`}
                  style={[styles.tag, {backgroundColor: theme.colors.background, borderColor: theme.colors.border}]}>
                  <SimpleIcon name="dollar" size={12} color={theme.colors.primary} />
                  <Text style={[styles.tagText, {color: theme.colors.primary}]}>
                    {ticker}
                  </Text>
                </View>
              ))}
              {post.hashtags && post.hashtags.length > 0 && post.hashtags.map((tag, index) => (
                <View
                  key={`tag-${index}`}
                  style={[styles.tag, {backgroundColor: theme.colors.background, borderColor: theme.colors.border}]}>
                  <SimpleIcon name="hashtag" size={12} color={theme.colors.primary} />
                  <Text style={[styles.tagText, {color: theme.colors.primary}]}>
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
          <SimpleIcon
            name={post.isLiked ? 'heart' : 'heart-outline'}
            size={22}
            color={post.isLiked ? '#FF4458' : theme.colors.muted}
          />
          <Text style={[styles.actionText, {color: theme.colors.text}]}>
            {post.likesCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePostPress} style={styles.actionButton}>
          <SimpleIcon name="comment" size={22} color={theme.colors.muted} />
          <Text style={[styles.actionText, {color: theme.colors.text}]}>
            {post.commentsCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
          <SimpleIcon name="share" size={22} color={theme.colors.muted} />
          <Text style={[styles.actionText, {color: theme.colors.text}]}>
            {post.sharesCount}
          </Text>
        </TouchableOpacity>

        <View style={{flex: 1}} />
        <TouchableOpacity onPress={handleSave}>
          <SimpleIcon
            name={post.isSaved ? 'bookmark' : 'bookmark-outline'}
            size={22}
            color={post.isSaved ? theme.colors.primary : theme.colors.muted}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  profileSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerInfo: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  displayName: {
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  menuButton: {
    padding: spacing.xs,
  },
  content: {
    marginBottom: spacing.md,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    gap: spacing.xs,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.sm,
    gap: spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default PostCard;
