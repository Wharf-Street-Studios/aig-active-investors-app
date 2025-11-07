/**
 * User Profile Screen
 * View other users' profiles
 */

import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Text, TouchableOpacity, useColorScheme} from 'react-native';
import {spacing, lightTheme, darkTheme} from '../../theme';
import {getMockUser, getMockPosts, MockUser, MockPost} from '../../services/mockData';
import PostCard from '../../components/PostCard';
import SimpleIcon from '../../components/SimpleIcon';

interface UserProfileScreenProps {
  route: {
    params: {
      userId: string;
    };
  };
  navigation: any;
}

const UserProfileScreen: React.FC<UserProfileScreenProps> = ({route}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
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
        <Text style={[styles.errorText, {color: theme.colors.text}]}>User not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <ScrollView>
        {/* Header */}
        <View style={[styles.header, {backgroundColor: theme.colors.card}]}>
          <View style={[styles.avatar, {backgroundColor: theme.colors.muted}]}>
            <Text style={[styles.avatarText, {color: theme.colors.background}]}>
              {user.displayName.charAt(0)}
            </Text>
          </View>

          {user.verificationStatus === 'verified' && (
            <View style={[styles.verifiedBadge, {backgroundColor: theme.colors.card, borderColor: theme.colors.border}]}>
              <SimpleIcon name="check" size={16} color={theme.colors.primary} />
              <Text style={[styles.verifiedText, {color: theme.colors.text}]}>Verified</Text>
            </View>
          )}

          <Text style={[styles.displayName, {color: theme.colors.text}]}>
            {user.displayName}
          </Text>
          <Text style={[styles.username, {color: theme.colors.muted}]}>
            @{user.username}
          </Text>

          {user.bio && (
            <Text style={[styles.bio, {color: theme.colors.text}]}>
              {user.bio}
            </Text>
          )}

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={[styles.statNumber, {color: theme.colors.text}]}>{user.postsCount}</Text>
              <Text style={[styles.statLabel, {color: theme.colors.muted}]}>Posts</Text>
            </View>
            <View style={styles.stat}>
              <Text style={[styles.statNumber, {color: theme.colors.text}]}>{followersCount}</Text>
              <Text style={[styles.statLabel, {color: theme.colors.muted}]}>Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={[styles.statNumber, {color: theme.colors.text}]}>{user.followingCount}</Text>
              <Text style={[styles.statLabel, {color: theme.colors.muted}]}>Following</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={handleFollowToggle}
              style={[
                styles.followButton,
                {
                  backgroundColor: isFollowing ? 'transparent' : theme.colors.primary,
                  borderColor: isFollowing ? theme.colors.border : theme.colors.primary,
                }
              ]}>
              <Text style={[
                styles.followButtonText,
                {color: isFollowing ? theme.colors.text : (theme.dark ? theme.colors.background : theme.colors.background)}
              ]}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.messageButton, {borderColor: theme.colors.border}]}>
              <Text style={[styles.messageButtonText, {color: theme.colors.text}]}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.divider, {backgroundColor: theme.colors.border}]} />

        {/* User Posts */}
        <View style={styles.postsSection}>
          <Text style={[styles.postsTitle, {color: theme.colors.text}]}>
            Posts
          </Text>

          {userPosts.length > 0 ? (
            userPosts.map(post => <PostCard key={post.id} post={post} />)
          ) : (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyText, {color: theme.colors.muted}]}>
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
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '600',
  },
  displayName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  username: {
    fontSize: 16,
    marginBottom: spacing.md,
  },
  bio: {
    fontSize: 14,
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
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    width: '100%',
  },
  followButton: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  followButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  messageButton: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  messageButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: spacing.md,
  },
  postsSection: {
    marginTop: spacing.md,
  },
  postsTitle: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyState: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});

export default UserProfileScreen;
