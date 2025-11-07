/**
 * Post Card Component
 * Displays a single post in the feed
 */

import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, useColorScheme} from 'react-native';
import {Post} from '../store/slices/feedSlice';
import {spacing, lightTheme, darkTheme} from '../theme';
import {useAppDispatch} from '../store';
import {likePost, unlikePost} from '../store/slices/feedSlice';
import {formatDistanceToNow} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import {MoreVerticalIcon, FavouriteIcon, CommentIcon, Share08Icon, Bookmark01Icon, HashtagIcon, DollarCircleIcon} from '@hugeicons/react-native';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({post}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();

  const handleLike = () => {
    if (post.isLiked) {
      dispatch(unlikePost(post.id));
    } else {
      dispatch(likePost(post.id));
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
              @{post.username} · {formatDistanceToNow(new Date(post.createdAt), {addSuffix: true})}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <MoreVerticalIcon size={20} color={theme.colors.muted} />
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
                  <DollarCircleIcon size={12} color={theme.colors.primary} />
                  <Text style={[styles.tagText, {color: theme.colors.primary}]}>
                    {ticker}
                  </Text>
                </View>
              ))}
              {post.hashtags && post.hashtags.length > 0 && post.hashtags.map((tag, index) => (
                <View
                  key={`tag-${index}`}
                  style={[styles.tag, {backgroundColor: theme.colors.background, borderColor: theme.colors.border}]}>
                  <HashtagIcon size={12} color={theme.colors.primary} />
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
          <FavouriteIcon
            size={22}
            color={post.isLiked ? '#FF4458' : theme.colors.muted}
            variant={post.isLiked ? 'solid' : 'stroke'}
          />
          <Text style={[styles.actionText, {color: theme.colors.text}]}>
            {post.likesCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePostPress} style={styles.actionButton}>
          <CommentIcon size={22} color={theme.colors.muted} />
          <Text style={[styles.actionText, {color: theme.colors.text}]}>
            {post.commentsCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Share08Icon size={22} color={theme.colors.muted} />
          <Text style={[styles.actionText, {color: theme.colors.text}]}>
            {post.sharesCount}
          </Text>
        </TouchableOpacity>

        <View style={{flex: 1}} />
        <TouchableOpacity>
          <Bookmark01Icon
            size={22}
            color={post.isSaved ? theme.colors.primary : theme.colors.muted}
            variant={post.isSaved ? 'solid' : 'stroke'}
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
