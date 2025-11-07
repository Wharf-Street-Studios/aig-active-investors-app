/**
 * Post Card Component
 * Displays a single post in the feed
 */

import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Avatar, Text, IconButton, useTheme, Chip} from 'react-native-paper';
import {Post} from '../store/slices/feedSlice';
import {spacing} from '../theme';
import {useAppDispatch} from '../store';
import {likePost, unlikePost} from '../store/slices/feedSlice';
import {formatDistanceToNow} from 'date-fns';
import {useNavigation} from '@react-navigation/native';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({post}) => {
  const theme = useTheme();
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
    <Card style={styles.card} elevation={2}>
      <Card.Title
        title={
          <Text variant="titleMedium" style={styles.displayName}>
            {post.displayName}
          </Text>
        }
        subtitle={
          <Text variant="bodySmall" style={styles.subtitle}>
            @{post.username} · {formatDistanceToNow(new Date(post.createdAt), {addSuffix: true})}
          </Text>
        }
        left={props => (
          <TouchableOpacity onPress={handleProfilePress}>
            <Avatar.Image
              {...props}
              size={48}
              source={{uri: post.profilePicture || 'https://via.placeholder.com/48'}}
            />
          </TouchableOpacity>
        )}
        right={props => <IconButton {...props} icon="dots-vertical" size={20} />}
      />
      <TouchableOpacity onPress={handlePostPress} activeOpacity={0.7}>
        <Card.Content>
          <Text variant="bodyLarge" style={styles.content}>{post.content}</Text>

          {((post.hashtags && post.hashtags.length > 0) || (post.tickers && post.tickers.length > 0)) && (
            <View style={styles.tagsContainer}>
              {post.tickers && post.tickers.length > 0 && post.tickers.map((ticker, index) => (
                <Chip
                  key={`ticker-${index}`}
                  icon="currency-usd"
                  style={[styles.tickerChip, {backgroundColor: theme.colors.secondaryContainer}]}
                  textStyle={{color: theme.colors.onSecondaryContainer}}
                  compact>
                  {ticker}
                </Chip>
              ))}
              {post.hashtags && post.hashtags.length > 0 && post.hashtags.map((tag, index) => (
                <Chip
                  key={`tag-${index}`}
                  icon="pound"
                  style={[styles.hashtagChip, {backgroundColor: theme.colors.primaryContainer}]}
                  textStyle={{color: theme.colors.onPrimaryContainer}}
                  compact>
                  {tag}
                </Chip>
              ))}
            </View>
          )}
        </Card.Content>
      </TouchableOpacity>

      <Card.Actions style={styles.actions}>
        <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
          <IconButton
            icon={post.isLiked ? 'heart' : 'heart-outline'}
            size={22}
            iconColor={post.isLiked ? '#FF4458' : theme.colors.onSurfaceVariant}
            style={styles.actionIcon}
          />
          <Text variant="labelLarge" style={styles.actionText}>{post.likesCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePostPress} style={styles.actionButton}>
          <IconButton
            icon="comment-outline"
            size={22}
            iconColor={theme.colors.onSurfaceVariant}
            style={styles.actionIcon}
          />
          <Text variant="labelLarge" style={styles.actionText}>{post.commentsCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <IconButton
            icon="share-outline"
            size={22}
            iconColor={theme.colors.onSurfaceVariant}
            style={styles.actionIcon}
          />
          <Text variant="labelLarge" style={styles.actionText}>{post.sharesCount}</Text>
        </TouchableOpacity>

        <View style={{flex: 1}} />
        <IconButton
          icon={post.isSaved ? 'bookmark' : 'bookmark-outline'}
          size={22}
          iconColor={post.isSaved ? theme.colors.primary : theme.colors.onSurfaceVariant}
        />
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    borderRadius: 16,
    overflow: 'hidden',
  },
  displayName: {
    fontWeight: '700',
  },
  subtitle: {
    opacity: 0.7,
    marginTop: spacing.xs,
  },
  content: {
    lineHeight: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  hashtagChip: {
    borderRadius: 8,
  },
  tickerChip: {
    borderRadius: 8,
  },
  actions: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    justifyContent: 'flex-start',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.xs,
  },
  actionIcon: {
    margin: 0,
  },
  actionText: {
    fontWeight: '600',
    marginLeft: -spacing.sm,
  },
});

export default PostCard;
