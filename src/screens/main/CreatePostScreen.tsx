/**
 * Create Post Screen
 * Create and publish new posts
 */

import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Alert, Text, TextInput, TouchableOpacity, useColorScheme} from 'react-native';
import {spacing, lightTheme, darkTheme} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {HashtagIcon, DollarCircleIcon} from '@hugeicons/react-native';

interface CreatePostScreenProps {
  navigation: any;
}

const CreatePostScreen: React.FC<CreatePostScreenProps> = ({navigation}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const nav = useNavigation<any>();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const extractHashtags = (text: string): string[] => {
    const regex = /#(\w+)/g;
    const matches = text.match(regex);
    return matches ? matches.map(tag => tag.substring(1)) : [];
  };

  const extractTickers = (text: string): string[] => {
    const regex = /\$([A-Z]+)/g;
    const matches = text.match(regex);
    return matches ? matches.map(ticker => ticker.substring(1)) : [];
  };

  const handlePost = () => {
    if (!content.trim()) return;

    setLoading(true);
    // Simulate post creation
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      setContent('');

      // Navigate to Home tab after a short delay
      setTimeout(() => {
        navigation.navigate('Home');
      }, 1500);
    }, 1000);
  };

  const handleCancel = () => {
    if (content.trim()) {
      Alert.alert(
        'Discard Post?',
        'Are you sure you want to discard this post?',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => {
              setContent('');
              navigation.navigate('Home');
            },
          },
        ],
      );
    } else {
      navigation.navigate('Home');
    }
  };

  const insertHashtag = (tag: string) => {
    setContent(prev => `${prev} #${tag} `);
  };

  const insertTicker = (ticker: string) => {
    setContent(prev => `${prev} $${ticker} `);
  };

  const hashtags = extractHashtags(content);
  const tickers = extractTickers(content);
  const charCount = content.length;
  const maxChars = 500;

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={[styles.header, {backgroundColor: theme.colors.card}]}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={handleCancel} style={styles.headerButton}>
            <Text style={[styles.headerButtonText, {color: theme.colors.text}]}>Cancel</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, {color: theme.colors.text}]}>Create Post</Text>
          <TouchableOpacity
            onPress={handlePost}
            disabled={!content.trim() || loading || charCount > maxChars}
            style={[styles.postButton, {
              backgroundColor: (!content.trim() || loading || charCount > maxChars) ? theme.colors.muted : theme.colors.primary
            }]}>
            <Text style={[styles.postButtonText, {
              color: theme.dark ? theme.colors.background : theme.colors.background
            }]}>
              {loading ? 'Posting...' : 'Post'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <TextInput
          placeholder="Share your investment insights..."
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={10}
          style={[styles.input, {
            borderColor: theme.colors.border,
            color: theme.colors.text,
            backgroundColor: theme.colors.background,
          }]}
          placeholderTextColor={theme.colors.muted}
          maxLength={maxChars}
        />

        <View style={styles.charCounter}>
          <Text style={[styles.charCountText, {
            color: charCount > maxChars ? theme.colors.error : theme.colors.muted
          }]}>
            {charCount}/{maxChars}
          </Text>
        </View>

        {(hashtags.length > 0 || tickers.length > 0) && (
          <View style={styles.tagsContainer}>
            <Text style={[styles.tagsTitle, {color: theme.colors.text}]}>
              Detected Tags:
            </Text>
            <View style={styles.tagsChips}>
              {hashtags.map((tag, index) => (
                <View key={`hashtag-${index}`} style={[styles.chip, {
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border
                }]}>
                  <HashtagIcon size={14} color={theme.colors.text} />
                  <Text style={[styles.chipText, {color: theme.colors.text}]}>#{tag}</Text>
                </View>
              ))}
              {tickers.map((ticker, index) => (
                <View key={`ticker-${index}`} style={[styles.chip, {
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border
                }]}>
                  <DollarCircleIcon size={14} color={theme.colors.text} />
                  <Text style={[styles.chipText, {color: theme.colors.text}]}>${ticker}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.suggestionsContainer}>
          <Text style={[styles.suggestionsTitle, {color: theme.colors.text}]}>
            Quick Add:
          </Text>

          <View style={styles.section}>
            <Text style={[styles.sectionLabel, {color: theme.colors.muted}]}>
              Popular Hashtags
            </Text>
            <View style={styles.suggestionsChips}>
              {['investing', 'stocks', 'trading', 'portfolio'].map(tag => (
                <TouchableOpacity
                  key={tag}
                  onPress={() => insertHashtag(tag)}
                  style={[styles.chip, {
                    backgroundColor: theme.colors.card,
                    borderColor: theme.colors.border
                  }]}>
                  <HashtagIcon size={14} color={theme.colors.text} />
                  <Text style={[styles.chipText, {color: theme.colors.text}]}>#{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionLabel, {color: theme.colors.muted}]}>
              Popular Tickers
            </Text>
            <View style={styles.suggestionsChips}>
              {['AAPL', 'MSFT', 'GOOGL', 'TSLA'].map(ticker => (
                <TouchableOpacity
                  key={ticker}
                  onPress={() => insertTicker(ticker)}
                  style={[styles.chip, {
                    backgroundColor: theme.colors.card,
                    borderColor: theme.colors.border
                  }]}>
                  <DollarCircleIcon size={14} color={theme.colors.text} />
                  <Text style={[styles.chipText, {color: theme.colors.text}]}>${ticker}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {showSuccess && (
        <View style={[styles.snackbar, {backgroundColor: theme.colors.success}]}>
          <Text style={styles.snackbarText}>Post created successfully!</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.snackbarAction}>View</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    paddingTop: spacing.xl,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerButton: {
    padding: spacing.xs,
  },
  headerButtonText: {
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  postButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  postButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  input: {
    minHeight: 150,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.md,
    fontSize: 16,
  },
  charCounter: {
    alignItems: 'flex-end',
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  charCountText: {
    fontSize: 12,
  },
  tagsContainer: {
    marginBottom: spacing.md,
  },
  tagsTitle: {
    fontSize: 14,
    marginBottom: spacing.sm,
    fontWeight: 'bold',
  },
  tagsChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  suggestionsContainer: {
    marginTop: spacing.lg,
  },
  suggestionsTitle: {
    fontSize: 14,
    marginBottom: spacing.md,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionLabel: {
    fontSize: 12,
    marginBottom: spacing.sm,
  },
  suggestionsChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    gap: spacing.xs,
    borderWidth: 1,
    marginBottom: spacing.xs,
  },
  chipText: {
    fontSize: 12,
  },
  snackbar: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.md,
    right: spacing.md,
    padding: spacing.md,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  snackbarText: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1,
  },
  snackbarAction: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CreatePostScreen;
