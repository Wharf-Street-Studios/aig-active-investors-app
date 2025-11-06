/**
 * Create Post Screen
 * Create and publish new posts
 */

import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {TextInput, Button, useTheme, Text, Chip, Snackbar} from 'react-native-paper';
import {spacing} from '../../theme';
import {useNavigation} from '@react-navigation/native';

interface CreatePostScreenProps {
  navigation: any;
}

const CreatePostScreen: React.FC<CreatePostScreenProps> = ({navigation}) => {
  const theme = useTheme();
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
      <View style={[styles.header, {backgroundColor: theme.colors.surface}]}>
        <View style={styles.headerContent}>
          <Button mode="text" onPress={handleCancel}>
            Cancel
          </Button>
          <Text variant="titleMedium">Create Post</Text>
          <Button
            mode="contained"
            onPress={handlePost}
            loading={loading}
            disabled={!content.trim() || loading || charCount > maxChars}
            compact>
            Post
          </Button>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <TextInput
          placeholder="Share your investment insights..."
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={10}
          mode="outlined"
          style={styles.input}
          maxLength={maxChars}
        />

        <View style={styles.charCounter}>
          <Text
            variant="bodySmall"
            style={[
              styles.charCountText,
              {color: charCount > maxChars ? theme.colors.error : theme.colors.onSurfaceVariant},
            ]}>
            {charCount}/{maxChars}
          </Text>
        </View>

        {(hashtags.length > 0 || tickers.length > 0) && (
          <View style={styles.tagsContainer}>
            <Text variant="titleSmall" style={styles.tagsTitle}>
              Detected Tags:
            </Text>
            <View style={styles.tagsChips}>
              {hashtags.map((tag, index) => (
                <Chip key={`hashtag-${index}`} icon="pound" style={styles.chip}>
                  #{tag}
                </Chip>
              ))}
              {tickers.map((ticker, index) => (
                <Chip key={`ticker-${index}`} icon="currency-usd" style={styles.chip}>
                  ${ticker}
                </Chip>
              ))}
            </View>
          </View>
        )}

        <View style={styles.suggestionsContainer}>
          <Text variant="titleSmall" style={styles.suggestionsTitle}>
            Quick Add:
          </Text>

          <View style={styles.section}>
            <Text variant="bodySmall" style={styles.sectionLabel}>
              Popular Hashtags
            </Text>
            <View style={styles.suggestionsChips}>
              <Chip
                icon="pound"
                style={styles.chip}
                onPress={() => insertHashtag('investing')}>
                #investing
              </Chip>
              <Chip icon="pound" style={styles.chip} onPress={() => insertHashtag('stocks')}>
                #stocks
              </Chip>
              <Chip icon="pound" style={styles.chip} onPress={() => insertHashtag('trading')}>
                #trading
              </Chip>
              <Chip icon="pound" style={styles.chip} onPress={() => insertHashtag('portfolio')}>
                #portfolio
              </Chip>
            </View>
          </View>

          <View style={styles.section}>
            <Text variant="bodySmall" style={styles.sectionLabel}>
              Popular Tickers
            </Text>
            <View style={styles.suggestionsChips}>
              <Chip
                icon="currency-usd"
                style={styles.chip}
                onPress={() => insertTicker('AAPL')}>
                $AAPL
              </Chip>
              <Chip
                icon="currency-usd"
                style={styles.chip}
                onPress={() => insertTicker('MSFT')}>
                $MSFT
              </Chip>
              <Chip icon="currency-usd" style={styles.chip} onPress={() => insertTicker('GOOGL')}>
                $GOOGL
              </Chip>
              <Chip icon="currency-usd" style={styles.chip} onPress={() => insertTicker('TSLA')}>
                $TSLA
              </Chip>
            </View>
          </View>
        </View>
      </ScrollView>

      <Snackbar
        visible={showSuccess}
        onDismiss={() => setShowSuccess(false)}
        duration={2000}
        action={{
          label: 'View',
          onPress: () => navigation.navigate('Home'),
        }}>
        Post created successfully!
      </Snackbar>
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
  content: {
    flex: 1,
    padding: spacing.md,
  },
  input: {
    minHeight: 150,
    textAlignVertical: 'top',
  },
  charCounter: {
    alignItems: 'flex-end',
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  charCountText: {
    opacity: 0.7,
  },
  tagsContainer: {
    marginBottom: spacing.md,
  },
  tagsTitle: {
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
    marginBottom: spacing.md,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionLabel: {
    marginBottom: spacing.sm,
    opacity: 0.7,
  },
  suggestionsChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  chip: {
    marginBottom: spacing.xs,
  },
});

export default CreatePostScreen;
