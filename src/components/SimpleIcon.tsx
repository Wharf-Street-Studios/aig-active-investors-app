/**
 * Icon Component
 * Simple SVG icons that work perfectly on web and mobile
 */

import React from 'react';
import Svg, { Path, Circle, Line, Polyline, Rect } from 'react-native-svg';

interface SimpleIconProps {
  name: string;
  size?: number;
  color?: string;
}

const SimpleIcon: React.FC<SimpleIconProps> = ({name, size = 24, color = '#000'}) => {
  const renderIcon = () => {
    switch (name) {
      case 'home':
        return (
          <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        );
      case 'search':
        return (
          <>
            <Circle cx="11" cy="11" r="8" fill="none" stroke={color} strokeWidth="2" />
            <Path d="m21 21-4.35-4.35" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </>
        );
      case 'plus':
        return (
          <Path d="M12 5v14M5 12h14" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
        );
      case 'bell':
        return (
          <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        );
      case 'user':
        return (
          <>
            <Circle cx="12" cy="8" r="5" fill="none" stroke={color} strokeWidth="2" />
            <Path d="M20 21a8 8 0 1 0-16 0" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </>
        );
      case 'heart':
        return (
          <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill={color} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        );
      case 'heart-outline':
        return (
          <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        );
      case 'comment':
        return (
          <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        );
      case 'share':
        return (
          <>
            <Circle cx="18" cy="5" r="3" fill="none" stroke={color} strokeWidth="2" />
            <Circle cx="6" cy="12" r="3" fill="none" stroke={color} strokeWidth="2" />
            <Circle cx="18" cy="19" r="3" fill="none" stroke={color} strokeWidth="2" />
            <Line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke={color} strokeWidth="2" />
            <Line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke={color} strokeWidth="2" />
          </>
        );
      case 'bookmark':
        return (
          <Path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" fill={color} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        );
      case 'bookmark-outline':
        return (
          <Path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        );
      case 'more':
        return (
          <>
            <Circle cx="12" cy="5" r="1" fill={color} />
            <Circle cx="12" cy="12" r="1" fill={color} />
            <Circle cx="12" cy="19" r="1" fill={color} />
          </>
        );
      case 'dollar':
        return (
          <>
            <Line x1="12" y1="1" x2="12" y2="23" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <Path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </>
        );
      case 'hashtag':
        return (
          <Path d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        );
      case 'eye':
        return (
          <>
            <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <Circle cx="12" cy="12" r="3" fill="none" stroke={color} strokeWidth="2" />
          </>
        );
      case 'back':
        return (
          <Path d="M19 12H5M12 19l-7-7 7-7" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        );
      case 'check':
        return (
          <Polyline points="20 6 9 17 4 12" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        );
      case 'send':
        return (
          <Path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        );
      case 'edit':
        return (
          <Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        );
      case 'logout':
        return (
          <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        );
      case 'settings':
        return (
          <Path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        );
      case 'chevron-right':
        return (
          <Polyline points="9 18 15 12 9 6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        );
      case 'help':
        return (
          <>
            <Circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="2" />
            <Path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <Circle cx="12" cy="17" r="0.5" fill={color} stroke={color} strokeWidth="1" />
          </>
        );
      default:
        return (
          <Circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="2" />
        );
    }
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {renderIcon()}
    </Svg>
  );
};

export default SimpleIcon;
