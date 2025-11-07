/**
 * Post Detail Screen
 * Shows full post with comments
 */

import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, useColorScheme, Image} from 'react-native';
import {spacing, lightTheme, darkTheme} from '../../theme';
import {formatDistanceToNow} from 'date-fns';
import {getMockPost, getMockComments, MockPost, MockComment} from '../../services/mockData';
import {MoreVerticalIcon, FavouriteIcon, CommentIcon, Share08Icon, Bookmark01Icon} from '@hugeicons/react-native';

interface PostDetailScreenProps {
  route: {
    params: {
      postId: string;
    };
  };
  navigation: any;
}

const PostDetailScreen: React.FC<PostDetailScreenProps> = ({route, navigation}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
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
        <Text style={[styles.errorText, {color: theme.colors.text}]}>Post not found</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: theme.colors.background}]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Post Card */}
        <View style={[styles.postCard, {backgroundColor: theme.colors.card, borderColor: theme.colors.border}]}>
          <View style={styles.postHeader}>
            <View style={[styles.avatar, {backgroundColor: theme.colors.muted}]}>
              <Text style={[styles.avatarText, {color: theme.colors.background}]}>
                {post.displayName.charAt(0)}
              </Text>
            </View>
            <View style={styles.headerInfo}>
              <Text style={[styles.displayName, {color: theme.colors.text}]}>{post.displayName}</Text>
              <Text style={[styles.subtitle, {color: theme.colors.muted}]}>
                @{post.username} · {formatDistanceToNow(new Date(post.createdAt), {addSuffix: true})}
              </Text>
            </View>
            <TouchableOpacity style={styles.menuButton}>
              <MoreVerticalIcon size={20} color={theme.colors.muted} />
            </TouchableOpacity>
          </View>

          <View style={styles.postBody}>
            <Text style={[styles.postContent, {color: theme.colors.text}]}>
              {post.content}
            </Text>

            {post.hashtags && post.hashtags.length > 0 && (
              <View style={styles.tagsRow}>
                {post.hashtags.map((tag, index) => (
                  <Text key={index} style={[styles.hashtag, {color: theme.colors.primary}]}>
                    #{tag}
                  </Text>
                ))}
              </View>
            )}

            {post.tickers && post.tickers.length > 0 && (
              <View style={styles.tagsRow}>
                {post.tickers.map((ticker, index) => (
                  <Text key={index} style={[styles.ticker, {color: theme.colors.primary}]}>
                    ${ticker}
                  </Text>
                ))}
              </View>
            )}
          </View>

          <View style={styles.actions}>
            <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
              <FavouriteIcon
                size={20}
                color={isLiked ? theme.colors.error : theme.colors.muted}
                variant={isLiked ? 'solid' : 'stroke'}
              />
              <Text style={[styles.actionText, {color: theme.colors.text}]}>{likesCount}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <CommentIcon size={20} color={theme.colors.muted} />
              <Text style={[styles.actionText, {color: theme.colors.text}]}>{post.commentsCount}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Share08Icon size={20} color={theme.colors.muted} />
              <Text style={[styles.actionText, {color: theme.colors.text}]}>{post.sharesCount}</Text>
            </TouchableOpacity>

            <View style={{flex: 1}} />

            <TouchableOpacity onPress={handleSave}>
              <Bookmark01Icon
                size={20}
                color={isSaved ? theme.colors.primary : theme.colors.muted}
                variant={isSaved ? 'solid' : 'stroke'}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.divider, {backgroundColor: theme.colors.border}]} />

        {/* Comments Section */}
        <View style={styles.commentsSection}>
          <Text style={[styles.commentsTitle, {color: theme.colors.text}]}>
            Comments ({comments.length})
          </Text>

          {comments.map((comment, index) => (
            <View key={comment.id}>
              <View style={styles.comment}>
                <View style={[styles.commentAvatar, {backgroundColor: theme.colors.muted}]}>
                  <Text style={[styles.commentAvatarText, {color: theme.colors.background}]}>
                    {comment.displayName.charAt(0)}
                  </Text>
                </View>
                <View style={styles.commentContent}>
                  <View style={styles.commentHeader}>
                    <Text style={[styles.commentAuthor, {color: theme.colors.text}]}>
                      {comment.displayName}
                    </Text>
                    <Text style={[styles.commentUsername, {color: theme.colors.muted}]}>
                      @{comment.username}
                    </Text>
                    <Text style={[styles.commentTime, {color: theme.colors.muted}]}>
                      · {formatDistanceToNow(new Date(comment.createdAt), {addSuffix: true})}
                    </Text>
                  </View>
                  <Text style={[styles.commentText, {color: theme.colors.text}]}>{comment.content}</Text>
                  <View style={styles.commentActions}>
                    <TouchableOpacity style={styles.commentAction}>
                      <FavouriteIcon
                        size={16}
                        color={comment.isLiked ? theme.colors.error : theme.colors.muted}
                        variant={comment.isLiked ? 'solid' : 'stroke'}
                      />
                      <Text style={[styles.commentActionText, {color: theme.colors.muted}]}>
                        {comment.likesCount}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {index < comments.length - 1 && (
                <View style={[styles.commentDivider, {backgroundColor: theme.colors.border}]} />
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Comment Input */}
      <View style={[styles.commentInputContainer, {backgroundColor: theme.colors.card, borderTopColor: theme.colors.border}]}>
        <TextInput
          placeholder="Write a comment..."
          value={commentText}
          onChangeText={setCommentText}
          style={[styles.commentInput, {
            borderColor: theme.colors.border,
            color: theme.colors.text,
            backgroundColor: theme.colors.background,
          }]}
          placeholderTextColor={theme.colors.muted}
          multiline
          maxLength={280}
        />
        <TouchableOpacity
          onPress={handlePostComment}
          disabled={!commentText.trim()}
          style={[styles.postButton, {
            backgroundColor: !commentText.trim() ? theme.colors.muted : theme.colors.primary,
          }]}>
          <Text style={[styles.postButtonText, {
            color: theme.dark ? theme.colors.background : theme.colors.background,
          }]}>
            Post
          </Text>
        </TouchableOpacity>
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
    borderRadius: 8,
    borderWidth: 1,
    padding: spacing.md,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerInfo: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  displayName: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  menuButton: {
    padding: spacing.xs,
  },
  postBody: {
    marginBottom: spacing.md,
  },
  postContent: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  hashtag: {
    fontSize: 14,
    fontWeight: '600',
  },
  ticker: {
    fontSize: 14,
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
    fontSize: 12,
  },
  divider: {
    height: 1,
    marginVertical: spacing.md,
  },
  commentsSection: {
    paddingHorizontal: spacing.md,
  },
  commentsTitle: {
    fontSize: 18,
    marginBottom: spacing.md,
    fontWeight: 'bold',
  },
  comment: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentAvatarText: {
    fontSize: 14,
    fontWeight: 'bold',
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
    fontSize: 14,
    fontWeight: 'bold',
  },
  commentUsername: {
    fontSize: 12,
  },
  commentTime: {
    fontSize: 12,
  },
  commentText: {
    fontSize: 14,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  commentAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  commentActionText: {
    fontSize: 12,
  },
  commentDivider: {
    height: 1,
    marginLeft: 44,
  },
  commentInputContainer: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.sm,
    alignItems: 'flex-end',
    borderTopWidth: 1,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.sm,
    fontSize: 14,
    maxHeight: 100,
  },
  postButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 6,
    alignSelf: 'flex-end',
  },
  postButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});

export default PostDetailScreen;
