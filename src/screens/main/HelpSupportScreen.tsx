/**
 * Help & Support Screen
 * Help center and support options
 */

import React from 'react';
import {View, StyleSheet, ScrollView, Text, TouchableOpacity, useColorScheme, Linking, Alert} from 'react-native';
import {spacing, lightTheme, darkTheme} from '../../theme';
import SimpleIcon from '../../components/SimpleIcon';

interface HelpSupportScreenProps {
  navigation: any;
}

const HelpSupportScreen: React.FC<HelpSupportScreenProps> = ({navigation}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const handleFAQ = () => {
    Alert.alert('FAQ', 'Frequently Asked Questions will be available soon');
  };

  const handleContactSupport = () => {
    Alert.alert(
      'Contact Support',
      'How would you like to contact us?',
      [
        {text: 'Email', onPress: () => Linking.openURL('mailto:support@aigapp.com')},
        {text: 'Cancel', style: 'cancel'},
      ]
    );
  };

  const handleReportProblem = () => {
    Alert.alert('Report a Problem', 'Problem reporting will be available soon');
  };

  const handleCommunityGuidelines = () => {
    Alert.alert('Community Guidelines', 'Community guidelines will be available soon');
  };

  const handleTermsOfService = () => {
    Alert.alert('Terms of Service', 'Terms of service will be available soon');
  };

  const handlePrivacyPolicy = () => {
    Alert.alert('Privacy Policy', 'Privacy policy will be available soon');
  };

  const handleTutorial = () => {
    Alert.alert('App Tutorial', 'Tutorial will be available soon');
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Get Help</Text>

          <TouchableOpacity
            onPress={handleFAQ}
            style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="help" size={24} color={theme.colors.text} />
            <View style={styles.textContainer}>
              <Text style={[styles.menuItemText, {color: theme.colors.text}]}>FAQ</Text>
              <Text style={[styles.menuItemSubtext, {color: theme.colors.muted}]}>
                Find answers to common questions
              </Text>
            </View>
            <SimpleIcon name="chevron-right" size={20} color={theme.colors.muted} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleTutorial}
            style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="user" size={24} color={theme.colors.text} />
            <View style={styles.textContainer}>
              <Text style={[styles.menuItemText, {color: theme.colors.text}]}>App Tutorial</Text>
              <Text style={[styles.menuItemSubtext, {color: theme.colors.muted}]}>
                Learn how to use the app
              </Text>
            </View>
            <SimpleIcon name="chevron-right" size={20} color={theme.colors.muted} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleContactSupport}
            style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="comment" size={24} color={theme.colors.text} />
            <View style={styles.textContainer}>
              <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Contact Support</Text>
              <Text style={[styles.menuItemSubtext, {color: theme.colors.muted}]}>
                Get in touch with our team
              </Text>
            </View>
            <SimpleIcon name="chevron-right" size={20} color={theme.colors.muted} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleReportProblem}
            style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="bell" size={24} color={theme.colors.text} />
            <View style={styles.textContainer}>
              <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Report a Problem</Text>
              <Text style={[styles.menuItemSubtext, {color: theme.colors.muted}]}>
                Report bugs or issues
              </Text>
            </View>
            <SimpleIcon name="chevron-right" size={20} color={theme.colors.muted} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Policies</Text>

          <TouchableOpacity
            onPress={handleCommunityGuidelines}
            style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="user" size={24} color={theme.colors.text} />
            <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Community Guidelines</Text>
            <SimpleIcon name="chevron-right" size={20} color={theme.colors.muted} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleTermsOfService}
            style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="settings" size={24} color={theme.colors.text} />
            <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Terms of Service</Text>
            <SimpleIcon name="chevron-right" size={20} color={theme.colors.muted} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlePrivacyPolicy}
            style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="settings" size={24} color={theme.colors.text} />
            <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Privacy Policy</Text>
            <SimpleIcon name="chevron-right" size={20} color={theme.colors.muted} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.infoText, {color: theme.colors.muted}]}>
            AIG Active Investors App
          </Text>
          <Text style={[styles.infoText, {color: theme.colors.muted}]}>
            Version 1.0.0
          </Text>
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
  infoContainer: {
    alignItems: 'center',
    padding: spacing.xl,
    marginTop: spacing.xl,
  },
  infoText: {
    fontSize: 14,
    marginBottom: spacing.xs,
  },
});

export default HelpSupportScreen;
