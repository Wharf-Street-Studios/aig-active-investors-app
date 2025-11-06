/**
 * Search Screen
 * Search for users, posts, hashtags, and tickers
 */

import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import {Searchbar, Text, useTheme, List, Avatar, Chip, Divider} from 'react-native-paper';
import {spacing} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {mockUsers, mockPosts} from '../../services/mockData';
import PostCard from '../../components/PostCard';

const SearchScreen: React.FC = () => {
  const theme = useTheme();
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
      <View style={[styles.header, {backgroundColor: theme.colors.surface}]}>
        <Searchbar
          placeholder="Search users, posts, #hashtags, $tickers"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>

      <ScrollView style={styles.content}>
        {!searchQuery.trim() ? (
          <View style={styles.emptyState}>
            <Text variant="bodyLarge" style={styles.placeholder}>
              Start typing to search...
            </Text>
            <View style={styles.suggestionsContainer}>
              <Text variant="titleMedium" style={styles.suggestionsTitle}>
                Popular Searches
              </Text>
              <Chip icon="pound" style={styles.chip} onPress={() => setSearchQuery('#investing')}>
                #investing
              </Chip>
              <Chip icon="pound" style={styles.chip} onPress={() => setSearchQuery('#stocks')}>
                #stocks
              </Chip>
              <Chip
                icon="currency-usd"
                style={styles.chip}
                onPress={() => setSearchQuery('$AAPL')}>
                $AAPL
              </Chip>
              <Chip
                icon="currency-usd"
                style={styles.chip}
                onPress={() => setSearchQuery('$MSFT')}>
                $MSFT
              </Chip>
            </View>
          </View>
        ) : !hasResults ? (
          <View style={styles.emptyState}>
            <Text variant="bodyLarge" style={styles.placeholder}>
              No results found for "{searchQuery}"
            </Text>
          </View>
        ) : (
          <>
            {/* Users */}
            {searchResults.users.length > 0 && (
              <View style={styles.section}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Users ({searchResults.users.length})
                </Text>
                {searchResults.users.map((user: any) => (
                  <TouchableOpacity key={user.id} onPress={() => handleUserPress(user.id)}>
                    <List.Item
                      title={user.displayName}
                      description={`@${user.username}`}
                      left={props => (
                        <Avatar.Text {...props} size={40} label={user.displayName.charAt(0)} />
                      )}
                      right={props =>
                        user.verificationStatus === 'verified' ? (
                          <List.Icon {...props} icon="check-decagram" />
                        ) : null
                      }
                    />
                  </TouchableOpacity>
                ))}
                <Divider style={styles.divider} />
              </View>
            )}

            {/* Hashtags */}
            {searchResults.hashtags.length > 0 && (
              <View style={styles.section}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Hashtags ({searchResults.hashtags.length})
                </Text>
                <View style={styles.chipsContainer}>
                  {searchResults.hashtags.map((tag: string) => (
                    <Chip
                      key={tag}
                      icon="pound"
                      style={styles.chip}
                      onPress={() => handleHashtagPress(tag)}>
                      #{tag}
                    </Chip>
                  ))}
                </View>
                <Divider style={styles.divider} />
              </View>
            )}

            {/* Tickers */}
            {searchResults.tickers.length > 0 && (
              <View style={styles.section}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Tickers ({searchResults.tickers.length})
                </Text>
                <View style={styles.chipsContainer}>
                  {searchResults.tickers.map((ticker: string) => (
                    <Chip
                      key={ticker}
                      icon="currency-usd"
                      style={styles.chip}
                      onPress={() => handleTickerPress(ticker)}>
                      ${ticker}
                    </Chip>
                  ))}
                </View>
                <Divider style={styles.divider} />
              </View>
            )}

            {/* Posts */}
            {searchResults.posts.length > 0 && (
              <View style={styles.section}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
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
    elevation: 0,
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
    opacity: 0.6,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  suggestionsContainer: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  suggestionsTitle: {
    marginBottom: spacing.md,
    fontWeight: 'bold',
  },
  section: {
    marginTop: spacing.md,
  },
  sectionTitle: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    fontWeight: 'bold',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  chip: {
    marginBottom: spacing.sm,
  },
  divider: {
    marginVertical: spacing.md,
  },
});

export default SearchScreen;
