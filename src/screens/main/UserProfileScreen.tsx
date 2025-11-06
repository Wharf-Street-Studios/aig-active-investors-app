/**
 * User Profile Screen
 * View other users' profiles
 */

import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, FlatList} from 'react-native';
import {Text, Avatar, Button, Chip, useTheme, Divider} from 'react-native-paper';
import {spacing} from '../../theme';
import {getMockUser, getMockPosts, MockUser, MockPost} from '../../services/mockData';
import PostCard from '../../components/PostCard';

interface UserProfileScreenProps {
  route: {
    params: {
      userId: string;
    };
  };
  navigation: any;
}

const UserProfileScreen: React.FC<UserProfileScreenProps> = ({route}) => {
  const theme = useTheme();
  const {userId} = route.params;
  const [user, setUser] = useState<MockUser | undefined>();
  const [userPosts, setUserPosts] = useState<MockPost[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    loadUserData();
  }, [userId]);

  const loadUserData = () => {
    const userData = getMockUser(userId);
    setUser(userData);
    if (userData) {
      setIsFollowing(userData.isFollowing || false);
      setFollowersCount(userData.followersCount);
      // Get posts by this user
      const allPosts = getMockPosts();
      const filtered = allPosts.filter(p => p.userId === userId);
      setUserPosts(filtered);
    }
  };

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    setFollowersCount(prev => (isFollowing ? prev - 1 : prev + 1));
  };

  if (!user) {
    return (
      <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <Text>User not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <ScrollView>
        {/* Header */}
        <View style={[styles.header, {backgroundColor: theme.colors.surface}]}>
          <Avatar.Text size={80} label={user.displayName.charAt(0)} style={styles.avatar} />

          {user.verificationStatus === 'verified' && (
            <Chip
              icon="check-decagram"
              style={[styles.verifiedBadge, {backgroundColor: theme.colors.primaryContainer}]}>
              Verified
            </Chip>
          )}

          <Text variant="headlineSmall" style={styles.displayName}>
            {user.displayName}
          </Text>
          <Text variant="bodyMedium" style={styles.username}>
            @{user.username}
          </Text>

          {user.bio && (
            <Text variant="bodyMedium" style={styles.bio}>
              {user.bio}
            </Text>
          )}

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text variant="titleLarge">{user.postsCount}</Text>
              <Text variant="bodySmall">Posts</Text>
            </View>
            <View style={styles.stat}>
              <Text variant="titleLarge">{followersCount}</Text>
              <Text variant="bodySmall">Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text variant="titleLarge">{user.followingCount}</Text>
              <Text variant="bodySmall">Following</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <Button
              mode={isFollowing ? 'outlined' : 'contained'}
              onPress={handleFollowToggle}
              style={styles.followButton}>
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
            <Button mode="outlined" style={styles.messageButton}>
              Message
            </Button>
          </View>
        </View>

        <Divider style={styles.divider} />

        {/* User Posts */}
        <View style={styles.postsSection}>
          <Text variant="titleMedium" style={styles.postsTitle}>
            Posts
          </Text>

          {userPosts.length > 0 ? (
            userPosts.map(post => <PostCard key={post.id} post={post} />)
          ) : (
            <View style={styles.emptyState}>
              <Text variant="bodyLarge" style={styles.emptyText}>
                No posts yet
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.xl,
    paddingTop: spacing.xxl,
    alignItems: 'center',
  },
  avatar: {
    marginBottom: spacing.sm,
  },
  verifiedBadge: {
    marginBottom: spacing.sm,
  },
  displayName: {
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  username: {
    opacity: 0.7,
    marginBottom: spacing.md,
  },
  bio: {
    textAlign: 'center',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.xl,
    marginBottom: spacing.lg,
  },
  stat: {
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    width: '100%',
  },
  followButton: {
    flex: 1,
  },
  messageButton: {
    flex: 1,
  },
  divider: {
    marginVertical: spacing.md,
  },
  postsSection: {
    marginTop: spacing.md,
  },
  postsTitle: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    fontWeight: 'bold',
  },
  emptyState: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    opacity: 0.6,
  },
});

export default UserProfileScreen;
