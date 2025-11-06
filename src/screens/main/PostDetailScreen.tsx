/**
 * Post Detail Screen
 * Shows full post with comments
 */

import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import {Text, Card, Avatar, IconButton, useTheme, TextInput, Button, Divider} from 'react-native-paper';
import {spacing} from '../../theme';
import {formatDistanceToNow} from 'date-fns';
import {getMockPost, getMockComments, MockPost, MockComment} from '../../services/mockData';

interface PostDetailScreenProps {
  route: {
    params: {
      postId: string;
    };
  };
  navigation: any;
}

const PostDetailScreen: React.FC<PostDetailScreenProps> = ({route, navigation}) => {
  const theme = useTheme();
  const {postId} = route.params;
  const [post, setPost] = useState<MockPost | undefined>();
  const [comments, setComments] = useState<MockComment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    loadPostData();
  }, [postId]);

  const loadPostData = () => {
    const postData = getMockPost(postId);
    const commentsData = getMockComments(postId);
    setPost(postData);
    setComments(commentsData);
    if (postData) {
      setIsLiked(postData.isLiked);
      setIsSaved(postData.isSaved);
      setLikesCount(postData.likesCount);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => (isLiked ? prev - 1 : prev + 1));
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handlePostComment = () => {
    if (commentText.trim()) {
      // In a real app, this would post to API
      const newComment: MockComment = {
        id: `c${Date.now()}`,
        postId: postId,
        userId: 'current-user',
        username: 'testuser',
        displayName: 'Test User',
        content: commentText,
        likesCount: 0,
        isLiked: false,
        createdAt: new Date().toISOString(),
      };
      setComments([...comments, newComment]);
      setCommentText('');
    }
  };

  if (!post) {
    return (
      <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <Text>Post not found</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: theme.colors.background}]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Post Card */}
        <Card style={styles.postCard}>
          <Card.Title
            title={post.displayName}
            subtitle={`@${post.username} · ${formatDistanceToNow(new Date(post.createdAt), {addSuffix: true})}`}
            left={props => (
              <Avatar.Image
                {...props}
                size={40}
                source={{uri: post.profilePicture || 'https://via.placeholder.com/40'}}
              />
            )}
            right={props => <IconButton {...props} icon="dots-vertical" />}
          />
          <Card.Content>
            <Text variant="bodyLarge" style={styles.postContent}>
              {post.content}
            </Text>

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

          <Card.Actions style={styles.actions}>
            <View style={styles.actionButton}>
              <IconButton
                icon={isLiked ? 'heart' : 'heart-outline'}
                size={20}
                onPress={handleLike}
                iconColor={isLiked ? theme.colors.error : undefined}
              />
              <Text variant="bodySmall">{likesCount}</Text>
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
              icon={isSaved ? 'bookmark' : 'bookmark-outline'}
              size={20}
              onPress={handleSave}
              iconColor={isSaved ? theme.colors.primary : undefined}
            />
          </Card.Actions>
        </Card>

        <Divider style={styles.divider} />

        {/* Comments Section */}
        <View style={styles.commentsSection}>
          <Text variant="titleMedium" style={styles.commentsTitle}>
            Comments ({comments.length})
          </Text>

          {comments.map((comment, index) => (
            <View key={comment.id}>
              <View style={styles.comment}>
                <Avatar.Image
                  size={32}
                  source={{uri: comment.profilePicture || 'https://via.placeholder.com/32'}}
                />
                <View style={styles.commentContent}>
                  <View style={styles.commentHeader}>
                    <Text variant="labelMedium" style={styles.commentAuthor}>
                      {comment.displayName}
                    </Text>
                    <Text variant="bodySmall" style={styles.commentUsername}>
                      @{comment.username}
                    </Text>
                    <Text variant="bodySmall" style={styles.commentTime}>
                      · {formatDistanceToNow(new Date(comment.createdAt), {addSuffix: true})}
                    </Text>
                  </View>
                  <Text variant="bodyMedium">{comment.content}</Text>
                  <View style={styles.commentActions}>
                    <IconButton
                      icon={comment.isLiked ? 'heart' : 'heart-outline'}
                      size={16}
                      iconColor={comment.isLiked ? theme.colors.error : undefined}
                    />
                    <Text variant="bodySmall">{comment.likesCount}</Text>
                  </View>
                </View>
              </View>
              {index < comments.length - 1 && <Divider style={styles.commentDivider} />}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Comment Input */}
      <View style={[styles.commentInputContainer, {backgroundColor: theme.colors.surface}]}>
        <TextInput
          mode="outlined"
          placeholder="Write a comment..."
          value={commentText}
          onChangeText={setCommentText}
          style={styles.commentInput}
          multiline
          maxLength={280}
        />
        <Button
          mode="contained"
          onPress={handlePostComment}
          disabled={!commentText.trim()}
          style={styles.postButton}>
          Post
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  postCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  postContent: {
    marginBottom: spacing.sm,
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
  divider: {
    marginVertical: spacing.md,
  },
  commentsSection: {
    paddingHorizontal: spacing.md,
  },
  commentsTitle: {
    marginBottom: spacing.md,
    fontWeight: 'bold',
  },
  comment: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    gap: spacing.xs,
  },
  commentAuthor: {
    fontWeight: 'bold',
  },
  commentUsername: {
    opacity: 0.6,
  },
  commentTime: {
    opacity: 0.6,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  commentDivider: {
    marginLeft: 44,
  },
  commentInputContainer: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.sm,
    alignItems: 'flex-end',
  },
  commentInput: {
    flex: 1,
  },
  postButton: {
    alignSelf: 'flex-end',
  },
});

export default PostDetailScreen;
