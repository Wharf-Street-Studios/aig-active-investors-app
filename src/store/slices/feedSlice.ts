/**
 * Feed Slice
 * Manages posts and feed state
 */

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Post {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  profilePicture?: string;
  content: string;
  mediaUrls?: string[];
  postType: 'text' | 'image' | 'video' | 'link' | 'poll';
  category: string;
  hashtags: string[];
  mentionedUsers: string[];
  tickers: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked: boolean;
  isSaved: boolean;
  isEdited: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FeedState {
  posts: Post[];
  currentPage: number;
  hasMore: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  filter: 'home' | 'trending' | 'following' | 'latest';
}

const initialState: FeedState = {
  posts: [],
  currentPage: 1,
  hasMore: true,
  isLoading: false,
  isRefreshing: false,
  error: null,
  filter: 'home',
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    fetchFeedStart: state => {
      state.isLoading = true;
      state.error = null;
    },
    fetchFeedSuccess: (state, action: PayloadAction<Post[]>) => {
      state.isLoading = false;
      state.isRefreshing = false;
      state.posts = action.payload;
      state.currentPage = 1;
    },
    fetchMoreFeedSuccess: (
      state,
      action: PayloadAction<{posts: Post[]; hasMore: boolean}>,
    ) => {
      state.isLoading = false;
      state.posts = [...state.posts, ...action.payload.posts];
      state.hasMore = action.payload.hasMore;
      state.currentPage += 1;
    },
    fetchFeedFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isRefreshing = false;
      state.error = action.payload;
    },
    refreshFeedStart: state => {
      state.isRefreshing = true;
    },
    likePost: (state, action: PayloadAction<string>) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) {
        post.isLiked = true;
        post.likesCount += 1;
      }
    },
    unlikePost: (state, action: PayloadAction<string>) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) {
        post.isLiked = false;
        post.likesCount -= 1;
      }
    },
    savePost: (state, action: PayloadAction<string>) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) {
        post.isSaved = true;
      }
    },
    unsavePost: (state, action: PayloadAction<string>) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) {
        post.isSaved = false;
      }
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(p => p.id !== action.payload);
    },
    setFilter: (
      state,
      action: PayloadAction<'home' | 'trending' | 'following' | 'latest'>,
    ) => {
      state.filter = action.payload;
      state.posts = [];
      state.currentPage = 1;
      state.hasMore = true;
    },
  },
});

export const {
  fetchFeedStart,
  fetchFeedSuccess,
  fetchMoreFeedSuccess,
  fetchFeedFailure,
  refreshFeedStart,
  likePost,
  unlikePost,
  savePost,
  unsavePost,
  addPost,
  deletePost,
  setFilter,
} = feedSlice.actions;

export default feedSlice.reducer;
