/**
 * Post Card Component
 * Displays a single post in the feed
 */

import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Avatar, Text, IconButton, useTheme} from 'react-native-paper';
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
    <Card style={styles.card}>
      <Card.Title
        title={post.displayName}
        subtitle={`@${post.username} · ${formatDistanceToNow(new Date(post.createdAt), {addSuffix: true})}`}
        left={props => (
          <TouchableOpacity onPress={handleProfilePress}>
            <Avatar.Image
              {...props}
              size={40}
              source={{uri: post.profilePicture || 'https://via.placeholder.com/40'}}
            />
          </TouchableOpacity>
        )}
        right={props => <IconButton {...props} icon="dots-vertical" />}
      />
      <TouchableOpacity onPress={handlePostPress}>
        <Card.Content>
          <Text variant="bodyMedium">{post.content}</Text>

        {post.hashtags && post.hashtags.length > 0 && (
          <View style={styles.hashtagContainer}>
            {post.hashtags.map((tag, index) => (
              <Text
                key={index}
                variant="bodySmall"
                style={[styles.hashtag, {color: theme.colors.primary}]}>
                #{tag}
              </Text>
            ))}
          </View>
        )}

        {post.tickers && post.tickers.length > 0 && (
          <View style={styles.tickerContainer}>
            {post.tickers.map((ticker, index) => (
              <Text
                key={index}
                variant="bodySmall"
                style={[styles.ticker, {color: theme.colors.secondary}]}>
                ${ticker}
              </Text>
            ))}
          </View>
        )}
        </Card.Content>
      </TouchableOpacity>

      <Card.Actions style={styles.actions}>
        <View style={styles.actionButton}>
          <IconButton
            icon={post.isLiked ? 'heart' : 'heart-outline'}
            size={20}
            onPress={handleLike}
            iconColor={post.isLiked ? theme.colors.error : undefined}
          />
          <Text variant="bodySmall">{post.likesCount}</Text>
        </View>

        <View style={styles.actionButton}>
          <IconButton icon="comment-outline" size={20} />
          <Text variant="bodySmall">{post.commentsCount}</Text>
        </View>

        <View style={styles.actionButton}>
          <IconButton icon="share-outline" size={20} />
          <Text variant="bodySmall">{post.sharesCount}</Text>
        </View>

        <IconButton
          icon={post.isSaved ? 'bookmark' : 'bookmark-outline'}
          size={20}
        />
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
  },
  hashtagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  hashtag: {
    fontWeight: '600',
  },
  tickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  ticker: {
    fontWeight: '600',
  },
  actions: {
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
});

export default PostCard;
