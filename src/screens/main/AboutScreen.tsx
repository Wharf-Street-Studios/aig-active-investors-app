/**
 * About Screen
 * App information and credits
 */

import React from 'react';
import {View, StyleSheet, ScrollView, Text, TouchableOpacity, useColorScheme, Linking} from 'react-native';
import {spacing, lightTheme, darkTheme} from '../../theme';
import SimpleIcon from '../../components/SimpleIcon';

interface AboutScreenProps {
  navigation: any;
}

const AboutScreen: React.FC<AboutScreenProps> = ({navigation}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const handleWebsite = () => {
    Linking.openURL('https://wharf-street-studios.github.io/AIG-Social-App');
  };

  const handleGitHub = () => {
    Linking.openURL('https://github.com/Wharf-Street-Studios/AIG-Social-App');
  };

  const handleLicense = () => {
    // Navigate to license screen or show license
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <ScrollView>
        <View style={styles.header}>
          <View style={[styles.logoContainer, {backgroundColor: theme.colors.primary}]}>
            <Text style={[styles.logoText, {color: theme.colors.background}]}>AIG</Text>
          </View>
          <Text style={[styles.appName, {color: theme.colors.text}]}>
            AIG Active Investors
          </Text>
          <Text style={[styles.version, {color: theme.colors.muted}]}>
            Version 1.0.0
          </Text>
        </View>

        <View style={styles.description}>
          <Text style={[styles.descriptionText, {color: theme.colors.text}]}>
            Connect with fellow investors, share insights, and stay updated on market trends.
            AIG Active Investors is your social platform for the investment community.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Features</Text>

          <View style={styles.featureItem}>
            <SimpleIcon name="user" size={24} color={theme.colors.primary} />
            <Text style={[styles.featureText, {color: theme.colors.text}]}>
              Connect with investors worldwide
            </Text>
          </View>

          <View style={styles.featureItem}>
            <SimpleIcon name="comment" size={24} color={theme.colors.primary} />
            <Text style={[styles.featureText, {color: theme.colors.text}]}>
              Share investment insights and ideas
            </Text>
          </View>

          <View style={styles.featureItem}>
            <SimpleIcon name="dollar" size={24} color={theme.colors.primary} />
            <Text style={[styles.featureText, {color: theme.colors.text}]}>
              Track stocks and market trends
            </Text>
          </View>

          <View style={styles.featureItem}>
            <SimpleIcon name="bell" size={24} color={theme.colors.primary} />
            <Text style={[styles.featureText, {color: theme.colors.text}]}>
              Get real-time notifications
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Links</Text>

          <TouchableOpacity
            onPress={handleWebsite}
            style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="user" size={24} color={theme.colors.text} />
            <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Website</Text>
            <SimpleIcon name="chevron-right" size={20} color={theme.colors.muted} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleGitHub}
            style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="user" size={24} color={theme.colors.text} />
            <Text style={[styles.menuItemText, {color: theme.colors.text}]}>GitHub Repository</Text>
            <SimpleIcon name="chevron-right" size={20} color={theme.colors.muted} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLicense}
            style={[styles.menuItem, {borderBottomColor: theme.colors.border}]}>
            <SimpleIcon name="settings" size={24} color={theme.colors.text} />
            <Text style={[styles.menuItemText, {color: theme.colors.text}]}>Open Source Licenses</Text>
            <SimpleIcon name="chevron-right" size={20} color={theme.colors.muted} />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, {color: theme.colors.muted}]}>
            Built with React Native & Expo
          </Text>
          <Text style={[styles.footerText, {color: theme.colors.muted}]}>
            © 2025 Wharf Street Studios
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
  header: {
    alignItems: 'center',
    padding: spacing.xl,
    paddingTop: spacing.xxl,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 2,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  version: {
    fontSize: 14,
  },
  description: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  featureText: {
    fontSize: 16,
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
    borderBottomWidth: 1,
    marginHorizontal: -spacing.md,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
    padding: spacing.xl,
    marginTop: spacing.xl,
  },
  footerText: {
    fontSize: 14,
    marginBottom: spacing.xs,
  },
});

export default AboutScreen;
