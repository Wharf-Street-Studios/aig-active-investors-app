/**
 * Search Screen
 * Search for users, posts, hashtags, and tickers
 */

import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, FlatList, TouchableOpacity, Text, TextInput, useColorScheme, Image} from 'react-native';
import {spacing, lightTheme, darkTheme} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {mockUsers, mockPosts} from '../../services/mockData';
import PostCard from '../../components/PostCard';
import SimpleIcon from '../../components/SimpleIcon';

const SearchScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>({
    users: [],
    posts: [],
    hashtags: [],
    tickers: [],
  });

  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    } else {
      setSearchResults({users: [], posts: [], hashtags: [], tickers: []});
    }
  }, [searchQuery]);

  const performSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();

    // Search users
    const foundUsers = mockUsers.filter(
      user =>
        user.username.toLowerCase().includes(lowerQuery) ||
        user.displayName.toLowerCase().includes(lowerQuery),
    );

    // Search posts
    const foundPosts = mockPosts.filter(post =>
      post.content.toLowerCase().includes(lowerQuery),
    );

    // Extract unique hashtags from posts
    const allHashtags = new Set<string>();
    mockPosts.forEach(post => {
      post.hashtags?.forEach(tag => {
        if (tag.toLowerCase().includes(lowerQuery)) {
          allHashtags.add(tag);
        }
      });
    });

    // Extract unique tickers from posts
    const allTickers = new Set<string>();
    mockPosts.forEach(post => {
      post.tickers?.forEach(ticker => {
        if (ticker.toLowerCase().includes(lowerQuery)) {
          allTickers.add(ticker);
        }
      });
    });

    setSearchResults({
      users: foundUsers,
      posts: foundPosts,
      hashtags: Array.from(allHashtags),
      tickers: Array.from(allTickers),
    });
  };

  const handleUserPress = (userId: string) => {
    navigation.navigate('UserProfile', {userId});
  };

  const handleHashtagPress = (hashtag: string) => {
    setSearchQuery(`#${hashtag}`);
  };

  const handleTickerPress = (ticker: string) => {
    setSearchQuery(`$${ticker}`);
  };

  const hasResults =
    searchResults.users.length > 0 ||
    searchResults.posts.length > 0 ||
    searchResults.hashtags.length > 0 ||
    searchResults.tickers.length > 0;

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={[styles.header, {backgroundColor: theme.colors.card}]}>
        <View style={[styles.searchbar, {backgroundColor: theme.colors.background, borderColor: theme.colors.border}]}>
          <SimpleIcon name="search" size={20} color={theme.colors.muted} />
          <TextInput
            placeholder="Search users, posts, #hashtags, $tickers"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={[styles.searchInput, {color: theme.colors.text}]}
            placeholderTextColor={theme.colors.muted}
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        {!searchQuery.trim() ? (
          <View style={styles.emptyState}>
            <Text style={[styles.placeholder, {color: theme.colors.muted}]}>
              Start typing to search...
            </Text>
            <View style={styles.suggestionsContainer}>
              <Text style={[styles.suggestionsTitle, {color: theme.colors.text}]}>
                Popular Searches
              </Text>
              <TouchableOpacity
                onPress={() => setSearchQuery('#investing')}
                style={[styles.chip, {backgroundColor: theme.colors.card, borderColor: theme.colors.border}]}>
                <SimpleIcon name="hashtag" size={16} color={theme.colors.text} />
                <Text style={[styles.chipText, {color: theme.colors.text}]}>#investing</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSearchQuery('#stocks')}
                style={[styles.chip, {backgroundColor: theme.colors.card, borderColor: theme.colors.border}]}>
                <SimpleIcon name="hashtag" size={16} color={theme.colors.text} />
                <Text style={[styles.chipText, {color: theme.colors.text}]}>#stocks</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSearchQuery('$AAPL')}
                style={[styles.chip, {backgroundColor: theme.colors.card, borderColor: theme.colors.border}]}>
                <SimpleIcon name="dollar" size={16} color={theme.colors.text} />
                <Text style={[styles.chipText, {color: theme.colors.text}]}>$AAPL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSearchQuery('$MSFT')}
                style={[styles.chip, {backgroundColor: theme.colors.card, borderColor: theme.colors.border}]}>
                <SimpleIcon name="dollar" size={16} color={theme.colors.text} />
                <Text style={[styles.chipText, {color: theme.colors.text}]}>$MSFT</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : !hasResults ? (
          <View style={styles.emptyState}>
            <Text style={[styles.placeholder, {color: theme.colors.muted}]}>
              No results found for "{searchQuery}"
            </Text>
          </View>
        ) : (
          <>
            {/* Users */}
            {searchResults.users.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
                  Users ({searchResults.users.length})
                </Text>
                {searchResults.users.map((user: any) => (
                  <TouchableOpacity
                    key={user.id}
                    onPress={() => handleUserPress(user.id)}
                    style={[styles.listItem, {borderBottomColor: theme.colors.border}]}>
                    <View style={[styles.avatar, {backgroundColor: theme.colors.muted}]}>
                      <Text style={[styles.avatarText, {color: theme.colors.background}]}>
                        {user.displayName.charAt(0)}
                      </Text>
                    </View>
                    <View style={styles.userInfo}>
                      <Text style={[styles.userName, {color: theme.colors.text}]}>{user.displayName}</Text>
                      <Text style={[styles.userHandle, {color: theme.colors.muted}]}>@{user.username}</Text>
                    </View>
                    {user.verificationStatus === 'verified' && (
                      <SimpleIcon name="check" size={20} color={theme.colors.primary} />
                    )}
                  </TouchableOpacity>
                ))}
                <View style={[styles.divider, {backgroundColor: theme.colors.border}]} />
              </View>
            )}

            {/* Hashtags */}
            {searchResults.hashtags.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
                  Hashtags ({searchResults.hashtags.length})
                </Text>
                <View style={styles.chipsContainer}>
                  {searchResults.hashtags.map((tag: string) => (
                    <TouchableOpacity
                      key={tag}
                      onPress={() => handleHashtagPress(tag)}
                      style={[styles.chip, {backgroundColor: theme.colors.card, borderColor: theme.colors.border}]}>
                      <SimpleIcon name="hashtag" size={16} color={theme.colors.text} />
                      <Text style={[styles.chipText, {color: theme.colors.text}]}>#{tag}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={[styles.divider, {backgroundColor: theme.colors.border}]} />
              </View>
            )}

            {/* Tickers */}
            {searchResults.tickers.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
                  Tickers ({searchResults.tickers.length})
                </Text>
                <View style={styles.chipsContainer}>
                  {searchResults.tickers.map((ticker: string) => (
                    <TouchableOpacity
                      key={ticker}
                      onPress={() => handleTickerPress(ticker)}
                      style={[styles.chip, {backgroundColor: theme.colors.card, borderColor: theme.colors.border}]}>
                      <SimpleIcon name="dollar" size={16} color={theme.colors.text} />
                      <Text style={[styles.chipText, {color: theme.colors.text}]}>${ticker}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={[styles.divider, {backgroundColor: theme.colors.border}]} />
              </View>
            )}

            {/* Posts */}
            {searchResults.posts.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
                  Posts ({searchResults.posts.length})
                </Text>
                {searchResults.posts.map((post: any) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
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
  },
  searchbar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    padding: spacing.sm,
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  placeholder: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  suggestionsContainer: {
    alignItems: 'center',
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  suggestionsTitle: {
    fontSize: 18,
    marginBottom: spacing.md,
    fontWeight: 'bold',
  },
  section: {
    marginTop: spacing.md,
  },
  sectionTitle: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    fontSize: 18,
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    gap: spacing.md,
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
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  userHandle: {
    fontSize: 14,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    marginVertical: spacing.md,
  },
});

export default SearchScreen;
