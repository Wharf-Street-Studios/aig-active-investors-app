/**
 * Edit Profile Screen
 * Edit user profile information
 */

import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import {Text, Avatar, Button, TextInput, useTheme} from 'react-native-paper';
import {spacing} from '../../theme';
import {useAppSelector, useAppDispatch} from '../../store';

interface EditProfileScreenProps {
  navigation: any;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({navigation}) => {
  const theme = useTheme();
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
          <Avatar.Text size={100} label={displayName?.charAt(0) || 'U'} />
          <Button mode="text" style={styles.changePhotoButton}>
            Change Photo
          </Button>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <TextInput
            label="Display Name"
            value={displayName}
            onChangeText={setDisplayName}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            mode="outlined"
            style={styles.input}
            autoCapitalize="none"
            left={<TextInput.Affix text="@" />}
          />

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            label="Bio"
            value={bio}
            onChangeText={setBio}
            mode="outlined"
            style={styles.input}
            multiline
            numberOfLines={4}
            maxLength={160}
          />
          <Text variant="bodySmall" style={styles.charCount}>
            {bio.length}/160
          </Text>

          <View style={styles.actionButtons}>
            <Button
              mode="outlined"
              onPress={handleCancel}
              style={styles.cancelButton}
              disabled={isSaving}>
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleSave}
              style={styles.saveButton}
              loading={isSaving}
              disabled={isSaving}>
              Save Changes
            </Button>
          </View>
        </View>

        {/* Additional Settings */}
        <View style={styles.additionalSettings}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Profile Settings
          </Text>

          <Button mode="outlined" style={styles.settingButton}>
            Change Password
          </Button>

          <Button mode="outlined" style={styles.settingButton}>
            Privacy Settings
          </Button>

          <Button mode="outlined" style={styles.settingButton}>
            Verification Request
          </Button>

          <Button
            mode="outlined"
            style={[styles.settingButton, {borderColor: theme.colors.error}]}
            textColor={theme.colors.error}>
            Delete Account
          </Button>
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
  changePhotoButton: {
    marginTop: spacing.sm,
  },
  formContainer: {
    marginBottom: spacing.xl,
  },
  input: {
    marginBottom: spacing.md,
  },
  charCount: {
    textAlign: 'right',
    opacity: 0.6,
    marginTop: -spacing.sm,
    marginBottom: spacing.lg,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  cancelButton: {
    flex: 1,
  },
  saveButton: {
    flex: 1,
  },
  additionalSettings: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    fontWeight: 'bold',
  },
  settingButton: {
    marginBottom: spacing.sm,
  },
});

export default EditProfileScreen;
