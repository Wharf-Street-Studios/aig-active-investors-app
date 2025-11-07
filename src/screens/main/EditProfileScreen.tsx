/**
 * Edit Profile Screen
 * Edit user profile information
 */

import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, useColorScheme} from 'react-native';
import {spacing, lightTheme, darkTheme} from '../../theme';
import {useAppSelector, useAppDispatch} from '../../store';

interface EditProfileScreenProps {
  navigation: any;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({navigation}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);

  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // In a real app, this would update via API
    setTimeout(() => {
      setIsSaving(false);
      // Show success message
      navigation.goBack();
    }, 1000);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: theme.colors.background}]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Picture */}
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, {backgroundColor: theme.colors.muted}]}>
            <Text style={[styles.avatarText, {color: theme.colors.background}]}>
              {displayName?.charAt(0) || 'U'}
            </Text>
          </View>
          <TouchableOpacity style={styles.changePhotoButton}>
            <Text style={[styles.changePhotoText, {color: theme.colors.primary}]}>
              Change Photo
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, {color: theme.colors.text}]}>Display Name</Text>
            <TextInput
              value={displayName}
              onChangeText={setDisplayName}
              style={[styles.input, {
                borderColor: theme.colors.border,
                color: theme.colors.text,
                backgroundColor: theme.colors.background,
              }]}
              placeholderTextColor={theme.colors.muted}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, {color: theme.colors.text}]}>Username</Text>
            <View style={[styles.input, {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.background,
              flexDirection: 'row',
              alignItems: 'center',
            }]}>
              <Text style={[styles.prefix, {color: theme.colors.muted}]}>@</Text>
              <TextInput
                value={username}
                onChangeText={setUsername}
                style={[styles.usernameInput, {color: theme.colors.text}]}
                placeholderTextColor={theme.colors.muted}
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, {color: theme.colors.text}]}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={[styles.input, {
                borderColor: theme.colors.border,
                color: theme.colors.text,
                backgroundColor: theme.colors.background,
              }]}
              placeholderTextColor={theme.colors.muted}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, {color: theme.colors.text}]}>Bio</Text>
            <TextInput
              value={bio}
              onChangeText={setBio}
              style={[styles.input, styles.bioInput, {
                borderColor: theme.colors.border,
                color: theme.colors.text,
                backgroundColor: theme.colors.background,
              }]}
              placeholderTextColor={theme.colors.muted}
              multiline
              numberOfLines={4}
              maxLength={160}
            />
            <Text style={[styles.charCount, {color: theme.colors.muted}]}>
              {bio.length}/160
            </Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={handleCancel}
              style={[styles.cancelButton, {borderColor: theme.colors.border}]}
              disabled={isSaving}>
              <Text style={[styles.cancelButtonText, {color: theme.colors.text}]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              style={[styles.saveButton, {
                backgroundColor: isSaving ? theme.colors.muted : theme.colors.primary,
              }]}
              disabled={isSaving}>
              <Text style={[styles.saveButtonText, {
                color: theme.dark ? theme.colors.background : theme.colors.background,
              }]}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Additional Settings */}
        <View style={styles.additionalSettings}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            Profile Settings
          </Text>

          <TouchableOpacity style={[styles.settingButton, {borderColor: theme.colors.border}]}>
            <Text style={[styles.settingButtonText, {color: theme.colors.text}]}>
              Change Password
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingButton, {borderColor: theme.colors.border}]}>
            <Text style={[styles.settingButtonText, {color: theme.colors.text}]}>
              Privacy Settings
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingButton, {borderColor: theme.colors.border}]}>
            <Text style={[styles.settingButtonText, {color: theme.colors.text}]}>
              Verification Request
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingButton, {borderColor: theme.colors.error}]}>
            <Text style={[styles.settingButtonText, {color: theme.colors.error}]}>
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  changePhotoButton: {
    marginTop: spacing.sm,
    padding: spacing.xs,
  },
  changePhotoText: {
    fontSize: 14,
    fontWeight: '600',
  },
  formContainer: {
    marginBottom: spacing.xl,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 14,
    marginBottom: spacing.xs,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.md,
    fontSize: 16,
  },
  prefix: {
    fontSize: 16,
    paddingRight: spacing.xs,
  },
  usernameInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  bioInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    textAlign: 'right',
    fontSize: 12,
    marginTop: spacing.xs,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  cancelButton: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  additionalSettings: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: spacing.md,
    fontWeight: 'bold',
  },
  settingButton: {
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  settingButtonText: {
    fontSize: 16,
  },
});

export default EditProfileScreen;
