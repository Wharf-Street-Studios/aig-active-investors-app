/**
 * Notification Settings Screen
 * Manage notification preferences
 */

import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Text, useColorScheme, Switch} from 'react-native';
import {spacing, lightTheme, darkTheme} from '../../theme';
import SimpleIcon from '../../components/SimpleIcon';

interface NotificationSettingsScreenProps {
  navigation: any;
}

const NotificationSettingsScreen: React.FC<NotificationSettingsScreenProps> = ({navigation}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  const [likesNotif, setLikesNotif] = useState(true);
  const [commentsNotif, setCommentsNotif] = useState(true);
  const [followsNotif, setFollowsNotif] = useState(true);
  const [mentionsNotif, setMentionsNotif] = useState(true);
  const [messagesNotif, setMessagesNotif] = useState(true);

  const [marketAlerts, setMarketAlerts] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [newsAlerts, setNewsAlerts] = useState(false);

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Notification Methods</Text>

          <View style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="bell" size={24} color={theme.colors.text} />
            <View style={styles.menuItemContent}>
              <View style={styles.textContainer}>
                <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Push Notifications</Text>
                <Text style={[styles.menuItemSubtext, {color: theme.colors.muted}]}>
                  Receive notifications on this device
                </Text>
              </View>
              <Switch
                value={pushEnabled}
                onValueChange={setPushEnabled}
                trackColor={{false: theme.colors.muted, true: theme.colors.primary}}
                thumbColor={theme.colors.background}
              />
            </View>
          </View>

          <View style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="user" size={24} color={theme.colors.text} />
            <View style={styles.menuItemContent}>
              <View style={styles.textContainer}>
                <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Email Notifications</Text>
                <Text style={[styles.menuItemSubtext, {color: theme.colors.muted}]}>
                  Receive notifications via email
                </Text>
              </View>
              <Switch
                value={emailEnabled}
                onValueChange={setEmailEnabled}
                trackColor={{false: theme.colors.muted, true: theme.colors.primary}}
                thumbColor={theme.colors.background}
              />
            </View>
          </View>

          <View style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="comment" size={24} color={theme.colors.text} />
            <View style={styles.menuItemContent}>
              <View style={styles.textContainer}>
                <Text style={[styles.menuItemText, {color: theme.colors.text}]}>SMS Notifications</Text>
                <Text style={[styles.menuItemSubtext, {color: theme.colors.muted}]}>
                  Receive notifications via text message
                </Text>
              </View>
              <Switch
                value={smsEnabled}
                onValueChange={setSmsEnabled}
                trackColor={{false: theme.colors.muted, true: theme.colors.primary}}
                thumbColor={theme.colors.background}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Activity Notifications</Text>

          <View style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="heart" size={24} color={theme.colors.text} />
            <View style={styles.menuItemContent}>
              <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Likes</Text>
              <Switch
                value={likesNotif}
                onValueChange={setLikesNotif}
                trackColor={{false: theme.colors.muted, true: theme.colors.primary}}
                thumbColor={theme.colors.background}
              />
            </View>
          </View>

          <View style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="comment" size={24} color={theme.colors.text} />
            <View style={styles.menuItemContent}>
              <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Comments</Text>
              <Switch
                value={commentsNotif}
                onValueChange={setCommentsNotif}
                trackColor={{false: theme.colors.muted, true: theme.colors.primary}}
                thumbColor={theme.colors.background}
              />
            </View>
          </View>

          <View style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="user" size={24} color={theme.colors.text} />
            <View style={styles.menuItemContent}>
              <Text style={[styles.menuItemText, {color: theme.colors.text}]}>New Followers</Text>
              <Switch
                value={followsNotif}
                onValueChange={setFollowsNotif}
                trackColor={{false: theme.colors.muted, true: theme.colors.primary}}
                thumbColor={theme.colors.background}
              />
            </View>
          </View>

          <View style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="bell" size={24} color={theme.colors.text} />
            <View style={styles.menuItemContent}>
              <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Mentions</Text>
              <Switch
                value={mentionsNotif}
                onValueChange={setMentionsNotif}
                trackColor={{false: theme.colors.muted, true: theme.colors.primary}}
                thumbColor={theme.colors.background}
              />
            </View>
          </View>

          <View style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="comment" size={24} color={theme.colors.text} />
            <View style={styles.menuItemContent}>
              <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Direct Messages</Text>
              <Switch
                value={messagesNotif}
                onValueChange={setMessagesNotif}
                trackColor={{false: theme.colors.muted, true: theme.colors.primary}}
                thumbColor={theme.colors.background}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Investment Alerts</Text>

          <View style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="dollar" size={24} color={theme.colors.text} />
            <View style={styles.menuItemContent}>
              <View style={styles.textContainer}>
                <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Market Alerts</Text>
                <Text style={[styles.menuItemSubtext, {color: theme.colors.muted}]}>
                  Major market movements
                </Text>
              </View>
              <Switch
                value={marketAlerts}
                onValueChange={setMarketAlerts}
                trackColor={{false: theme.colors.muted, true: theme.colors.primary}}
                thumbColor={theme.colors.background}
              />
            </View>
          </View>

          <View style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="dollar" size={24} color={theme.colors.text} />
            <View style={styles.menuItemContent}>
              <View style={styles.textContainer}>
                <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Price Alerts</Text>
                <Text style={[styles.menuItemSubtext, {color: theme.colors.muted}]}>
                  Stock price movements
                </Text>
              </View>
              <Switch
                value={priceAlerts}
                onValueChange={setPriceAlerts}
                trackColor={{false: theme.colors.muted, true: theme.colors.primary}}
                thumbColor={theme.colors.background}
              />
            </View>
          </View>

          <View style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="bell" size={24} color={theme.colors.text} />
            <View style={styles.menuItemContent}>
              <View style={styles.textContainer}>
                <Text style={[styles.menuItemText, {color: theme.colors.text}]}>News Alerts</Text>
                <Text style={[styles.menuItemSubtext, {color: theme.colors.muted}]}>
                  Breaking financial news
                </Text>
              </View>
              <Switch
                value={newsAlerts}
                onValueChange={setNewsAlerts}
                trackColor={{false: theme.colors.muted, true: theme.colors.primary}}
                thumbColor={theme.colors.background}
              />
            </View>
          </View>
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

export default NotificationSettingsScreen;
