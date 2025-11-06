# AIG - Active Investors Group (Expo)

A social investment platform mobile app built with React Native, Expo, and TypeScript. This is a **static frontend prototype** with mock data to showcase the complete UI/UX flow.

## Features Implemented

### Authentication Flow
- Welcome Screen with app introduction
- Login Screen with form validation
- Registration Screen with complete signup form
- Forgot Password Screen

### Main App Features
- **Home Feed**: Browse investment posts with filters (For You, Following, Trending, Latest)
- **Post Cards**: Interactive posts with like, comment, share, and save actions
- **Post Detail**: View full post with comments section and ability to add comments
- **User Profiles**: View other users' profiles with follow/unfollow functionality
- **Edit Profile**: Update your profile information, bio, and settings
- **Notifications**: View likes, comments, follows, and mentions
- **Search**: Search for users, posts, and tickers
- **Create Post**: Share investment insights with hashtags and tickers

### Mock Data
- 5 realistic investor personas (Value investor, Tech trader, Crypto enthusiast, Dividend investor, Real estate investor)
- 8 investment-themed posts with hashtags and stock tickers
- Comments on posts
- Notifications (likes, comments, follows, mentions)

## Prerequisites

- Node.js 18+
- npm or yarn
- Expo Go app on your mobile device (available on iOS App Store and Google Play Store)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Expo Development Server

```bash
npx expo start
```

This will:
- Start the Metro bundler
- Generate a QR code in your terminal
- Open Expo Dev Tools in your browser

### 3. Run the App

You have three options:

#### Option A: On Your Phone (Easiest)
1. Install "Expo Go" app from App Store (iOS) or Play Store (Android)
2. Scan the QR code from the terminal using:
   - iOS: Camera app
   - Android: Expo Go app
3. The app will load on your device

#### Option B: iOS Simulator (Mac only)
1. Press `i` in the terminal where Expo is running
2. Simulator will open automatically

#### Option C: Android Emulator
1. Make sure Android Studio is installed with an emulator set up
2. Press `a` in the terminal where Expo is running
3. Emulator will open automatically

## Using the App

### 1. Login
- Use any email and password (mock authentication)
- Example: `test@example.com` / `password123`

### 2. Explore the Feed
- Scroll through investment posts
- Tap **filter chips** at the top to switch between feeds
- **Like** posts by tapping the heart icon
- **Tap on a post** to view full details and comments

### 3. View User Profiles
- **Tap on user avatar** or name to view their profile
- Follow/unfollow users
- See their posts and stats

### 4. Interact with Posts
- Tap post content to open **Post Detail screen**
- Read and add comments
- Like, share, or save posts

### 5. Edit Your Profile
- Go to **Profile tab** (bottom right)
- Tap **"Edit Profile"** button
- Update your display name, bio, etc.

### 6. View Notifications
- Tap **Notifications tab** (bell icon)
- See likes, comments, follows, and mentions

## Project Structure

```
mobile-expo/
├── src/
│   ├── components/          # Reusable components
│   │   └── PostCard.tsx     # Post display component
│   ├── navigation/          # Navigation setup
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   ├── MainNavigator.tsx
│   │   └── MainStackNavigator.tsx
│   ├── screens/
│   │   ├── auth/           # Authentication screens
│   │   │   ├── WelcomeScreen.tsx
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── RegisterScreen.tsx
│   │   │   └── ForgotPasswordScreen.tsx
│   │   └── main/           # Main app screens
│   │       ├── HomeScreen.tsx
│   │       ├── SearchScreen.tsx
│   │       ├── CreatePostScreen.tsx
│   │       ├── NotificationsScreen.tsx
│   │       ├── ProfileScreen.tsx
│   │       ├── PostDetailScreen.tsx
│   │       ├── UserProfileScreen.tsx
│   │       └── EditProfileScreen.tsx
│   ├── services/
│   │   └── mockData.ts     # Mock data service
│   ├── store/              # Redux state management
│   │   ├── index.ts
│   │   └── slices/
│   │       ├── authSlice.ts
│   │       ├── feedSlice.ts
│   │       ├── notificationSlice.ts
│   │       └── userSlice.ts
│   └── theme/              # Theme configuration
│       └── index.ts
├── App.tsx                 # Root component
├── package.json
└── tsconfig.json
```

## Tech Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tooling
- **TypeScript**: Type-safe JavaScript
- **React Navigation**: Navigation library
- **React Native Paper**: Material Design components
- **Redux Toolkit**: State management
- **date-fns**: Date formatting

## Key Features of This Prototype

- Complete authentication flow (static, no backend)
- Full navigation between all screens
- Interactive UI with realistic mock data
- Like, comment, and save functionality (client-side only)
- Follow/unfollow users (client-side only)
- Profile editing (client-side only)
- Responsive Material Design UI
- Light/Dark mode support

## Next Steps for Production

To convert this to a production app, you would need to:

1. **Backend Integration**
   - Replace mock data with actual API calls
   - Implement authentication with JWT tokens
   - Connect to the backend at `http://localhost:3000/api` (already configured in .env)

2. **Socket.io Integration**
   - Add real-time notifications
   - Live feed updates
   - Messaging functionality

3. **Image Upload**
   - Implement profile picture upload
   - Post media attachments

4. **Push Notifications**
   - Configure Expo push notifications
   - Handle notification permissions

5. **Production Build**
   - Build standalone apps for iOS and Android
   - Submit to app stores

## Troubleshooting

### Port Issues
If port 8081 is already in use:
```bash
# Find and kill the process
lsof -ti:8081 | xargs kill -9

# Then restart Expo
npx expo start
```

### Clear Cache
If you encounter issues:
```bash
npx expo start --clear
```

### Reset Everything
```bash
rm -rf node_modules
npm install
npx expo start --clear
```

## Environment Variables

The app uses environment variables defined in `.env`:
- `API_URL`: Backend API URL (for future integration)
- `SOCKET_URL`: WebSocket URL (for future integration)

## License

MIT

## Contact

For questions or issues, please open an issue in the repository.
