#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Files to convert
const files = [
  'src/screens/main/HomeScreen.tsx',
  'src/components/PostCard.tsx',
  'src/screens/auth/WelcomeScreen.tsx',
  'src/screens/main/SearchScreen.tsx',
  'src/screens/main/UserProfileScreen.tsx',
  'src/screens/main/EditProfileScreen.tsx',
  'src/screens/main/NotificationsScreen.tsx',
  'src/screens/main/PostDetailScreen.tsx',
  'src/screens/main/ProfileScreen.tsx',
  'src/screens/auth/LoginScreen.tsx',
  'src/screens/auth/RegisterScreen.tsx',
  'src/screens/main/CreatePostScreen.tsx',
  'src/screens/auth/ForgotPasswordScreen.tsx',
];

const projectRoot = path.join(__dirname, '..');

files.forEach(file => {
  const filePath = path.join(projectRoot, file);

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠ File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Paper imports
  content = content.replace(/import\s+\{[^}]+\}\s+from\s+'react-native-paper';?/g, '');

  // Replace useTheme from Paper with our simple theme
  content = content.replace(/import\s+\{([^}]*),?\s*useTheme\s*,?([^}]*)\}\s+from\s+'react-native-paper';?/g, (match, before, after) => {
    const remaining = [before, after].filter(s => s.trim()).join(', ');
    return remaining ? `import {${remaining}} from 'react-native-paper';` : '';
  });

  // Add imports for theme if useTheme was used
  if (content.includes('useTheme()')) {
    // Add theme imports at the top
    if (!content.includes("from '../theme'") && !content.includes("from '../../theme'")) {
      const importMatch = content.match(/^import[^;]+;/m);
      if (importMatch) {
        const depth = file.split('/').length - 2;
        const themeImport = '../'.repeat(depth - 1) + 'theme';
        content = content.replace(importMatch[0], `${importMatch[0]}\nimport {useColorScheme} from 'react-native';\nimport {lightTheme, darkTheme} from '${themeImport}';`);
      }
    }

    // Replace useTheme from Paper
    content = content.replace(/const\s+theme\s+=\s+useTheme\(\);/g,
      'const colorScheme = useColorScheme();\n  const theme = colorScheme === \'dark\' ? darkTheme : lightTheme;');
  }

  // Replace Paper components with basic RN components
  const replacements = {
    'Card': 'View',
    'Card.Content': 'View',
    'Card.Cover': 'Image',
    'Text variant="': 'Text style={{fontSize: ',
    '<Button': '<TouchableOpacity',
    '</Button>': '</TouchableOpacity>',
    'TextInput': 'TextInput',
    'Avatar.Text': 'View',
    'Avatar.Image': 'Image',
    'Chip': 'View',
    'IconButton': 'TouchableOpacity',
    'FAB': 'TouchableOpacity',
  };

  // Add basic RN imports if not present
  if (!content.includes("from 'react-native'")) {
    const importMatch = content.match(/^import[^;]+;/m);
    if (importMatch) {
      content = content.replace(importMatch[0], `${importMatch[0]}\nimport {View, Text, TouchableOpacity, TextInput as RNTextInput, Image, ScrollView, StyleSheet} from 'react-native';`);
    }
  } else {
    // Add missing imports to existing RN import
    content = content.replace(
      /import\s+\{([^}]+)\}\s+from\s+'react-native';/,
      (match, imports) => {
        const needed = ['View', 'Text', 'TouchableOpacity', 'TextInput', 'Image', 'ScrollView', 'StyleSheet'];
        const existing = imports.split(',').map(s => s.trim());
        const toAdd = needed.filter(n => !existing.some(e => e.includes(n)));
        if (toAdd.length > 0) {
          return `import {${imports}, ${toAdd.join(', ')}} from 'react-native';`;
        }
        return match;
      }
    );
  }

  fs.writeFileSync(filePath, content);
  console.log(`✓ Converted ${file}`);
});

console.log('\n✓ Conversion complete!');
console.log('Note: Some files may need manual adjustments for styling.');
