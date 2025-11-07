/**
 * Simple Icon Component
 * Uses text/emoji fallbacks for web compatibility
 */

import React from 'react';
import {Text, Platform} from 'react-native';

interface SimpleIconProps {
  name: string;
  size?: number;
  color?: string;
}

const iconMap: {[key: string]: string} = {
  'home': '🏠',
  'search': '🔍',
  'plus': '➕',
  'bell': '🔔',
  'user': '👤',
  'heart': '❤️',
  'heart-outline': '🤍',
  'comment': '💬',
  'share': '↗️',
  'bookmark': '🔖',
  'bookmark-outline': '🔖',
  'more': '⋮',
  'dollar': '💲',
  'hashtag': '#',
  'eye': '👁️',
  'back': '←',
  'check': '✓',
  'send': '✉️',
  'edit': '✏️',
  'logout': '🚪',
  'settings': '⚙️',
  'chevron-right': '›',
};

const SimpleIcon: React.FC<SimpleIconProps> = ({name, size = 24, color}) => {
  const emoji = iconMap[name] || '●';

  return (
    <Text style={{fontSize: size * 0.8, color: color || '#000'}}>
      {emoji}
    </Text>
  );
};

export default SimpleIcon;
