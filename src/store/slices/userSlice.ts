/**
 * User Slice
 * Manages user profile and following data
 */

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  bio?: string;
  profilePicture?: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isFollowing: boolean;
  verificationStatus: 'none' | 'pending' | 'verified';
}

interface UserState {
  profiles: Record<string, UserProfile>;
  following: string[];
  followers: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profiles: {},
  following: [],
  followers: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserStart: state => {
      state.isLoading = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.isLoading = false;
      state.profiles[action.payload.id] = action.payload;
    },
    fetchUserFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    followUser: (state, action: PayloadAction<string>) => {
      if (!state.following.includes(action.payload)) {
        state.following.push(action.payload);
      }
      if (state.profiles[action.payload]) {
        state.profiles[action.payload].isFollowing = true;
        state.profiles[action.payload].followersCount += 1;
      }
    },
    unfollowUser: (state, action: PayloadAction<string>) => {
      state.following = state.following.filter(id => id !== action.payload);
      if (state.profiles[action.payload]) {
        state.profiles[action.payload].isFollowing = false;
        state.profiles[action.payload].followersCount -= 1;
      }
    },
    setFollowing: (state, action: PayloadAction<string[]>) => {
      state.following = action.payload;
    },
    setFollowers: (state, action: PayloadAction<string[]>) => {
      state.followers = action.payload;
    },
  },
});

export const {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  followUser,
  unfollowUser,
  setFollowing,
  setFollowers,
} = userSlice.actions;

export default userSlice.reducer;
