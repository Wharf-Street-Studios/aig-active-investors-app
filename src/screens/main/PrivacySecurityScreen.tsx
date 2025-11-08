/**
 * Privacy & Security Screen
 * Manage privacy and security settings
 */

import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Text, TouchableOpacity, useColorScheme, Switch, Alert} from 'react-native';
import {spacing, lightTheme, darkTheme} from '../../theme';
import SimpleIcon from '../../components/SimpleIcon';

interface PrivacySecurityScreenProps {
  navigation: any;
}

const PrivacySecurityScreen: React.FC<PrivacySecurityScreenProps> = ({navigation}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [privateAccount, setPrivateAccount] = useState(false);
  const [showActivity, setShowActivity] = useState(true);
  const [allowTagging, setAllowTagging] = useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);

  const handleBlockedAccounts = () => {
    Alert.alert('Blocked Accounts', 'This feature will be available soon');
  };

  const handleMutedAccounts = () => {
    Alert.alert('Muted Accounts', 'This feature will be available soon');
  };

  const handleDataDownload = () => {
    Alert.alert('Download Your Data', 'We will send you a download link via email within 48 hours');
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Account Privacy</Text>

          <View style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="user" size={24} color={theme.colors.text} />
            <View style={styles.menuItemContent}>
              <View style={styles.textContainer}>
                <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Private Account</Text>
                <Text style={[styles.menuItemSubtext, {color: theme.colors.muted}]}>
                  Only followers can see your posts
                </Text>
              </View>
              <Switch
                value={privateAccount}
                onValueChange={setPrivateAccount}
                trackColor={{false: theme.colors.muted, true: theme.colors.primary}}
                thumbColor={theme.colors.background}
              />
            </View>
          </View>

          <View style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="eye" size={24} color={theme.colors.text} />
            <View style={styles.menuItemContent}>
              <View style={styles.textContainer}>
                <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Show Activity Status</Text>
                <Text style={[styles.menuItemSubtext, {color: theme.colors.muted}]}>
                  Let others see when you're active
                </Text>
              </View>
              <Switch
                value={showActivity}
                onValueChange={setShowActivity}
                trackColor={{false: theme.colors.muted, true: theme.colors.primary}}
                thumbColor={theme.colors.background}
              />
            </View>
          </View>

          <View style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="user" size={24} color={theme.colors.text} />
            <View style={styles.menuItemContent}>
              <View style={styles.textContainer}>
                <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Allow Tagging</Text>
                <Text style={[styles.menuItemSubtext, {color: theme.colors.muted}]}>
                  Allow others to tag you in posts
                </Text>
              </View>
              <Switch
                value={allowTagging}
                onValueChange={setAllowTagging}
                trackColor={{false: theme.colors.muted, true: theme.colors.primary}}
                thumbColor={theme.colors.background}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Messaging</Text>

          <View style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="comment" size={24} color={theme.colors.text} />
            <View style={styles.menuItemContent}>
              <View style={styles.textContainer}>
                <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Read Receipts</Text>
                <Text style={[styles.menuItemSubtext, {color: theme.colors.muted}]}>
                  Let others know when you've read their messages
                </Text>
              </View>
              <Switch
                value={readReceipts}
                onValueChange={setReadReceipts}
                trackColor={{false: theme.colors.muted, true: theme.colors.primary}}
                thumbColor={theme.colors.background}
              />
            </View>
          </View>

          <View style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="bell" size={24} color={theme.colors.text} />
            <View style={styles.menuItemContent}>
              <View style={styles.textContainer}>
                <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Show Online Status</Text>
                <Text style={[styles.menuItemSubtext, {color: theme.colors.muted}]}>
                  Show when you're online
                </Text>
              </View>
              <Switch
                value={showOnlineStatus}
                onValueChange={setShowOnlineStatus}
                trackColor={{false: theme.colors.muted, true: theme.colors.primary}}
                thumbColor={theme.colors.background}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Blocked & Muted</Text>

          <TouchableOpacity
            onPress={handleBlockedAccounts}
            style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="user" size={24} color={theme.colors.text} />
            <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Blocked Accounts</Text>
            <SimpleIcon name="chevron-right" size={20} color={theme.colors.muted} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleMutedAccounts}
            style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="bell" size={24} color={theme.colors.text} />
            <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Muted Accounts</Text>
            <SimpleIcon name="chevron-right" size={20} color={theme.colors.muted} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Data</Text>

          <TouchableOpacity
            onPress={handleDataDownload}
            style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="user" size={24} color={theme.colors.text} />
            <View style={styles.textContainer}>
              <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Download Your Data</Text>
              <Text style={[styles.menuItemSubtext, {color: theme.colors.muted}]}>
                Get a copy of your data
              </Text>
            </View>
            <SimpleIcon name="chevron-right" size={20} color={theme.colors.muted} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
    borderBottomWidth: 1,
  },
  menuItemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
  },
  menuItemSubtext: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default PrivacySecurityScreen;
