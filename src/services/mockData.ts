/**
 * Mock Data Service
 * Provides realistic mock data for the static app flow
 */

export interface MockUser {
  id: string;
  username: string;
  displayName: string;
  email: string;
  profilePicture?: string;
  bio?: string;
  verificationStatus: 'none' | 'pending' | 'verified';
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isFollowing?: boolean;
}

export interface MockPost {
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

export interface MockComment {
  id: string;
  postId: string;
  userId: string;
  username: string;
  displayName: string;
  profilePicture?: string;
  content: string;
  likesCount: number;
  isLiked: boolean;
  createdAt: string;
}

export interface MockNotification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  userId: string;
  username: string;
  displayName: string;
  profilePicture?: string;
  content: string;
  postId?: string;
  isRead: boolean;
  createdAt: string;
}

// Mock Users
export const mockUsers: MockUser[] = [
  {
    id: '1',
    username: 'warren_investor',
    displayName: 'Warren Buffett Jr.',
    email: 'warren@example.com',
    bio: 'Value investor | Long-term holder | Teaching the next generation about smart investing',
    verificationStatus: 'verified',
    followersCount: 15234,
    followingCount: 432,
    postsCount: 1247,
  },
  {
    id: '2',
    username: 'tech_trader',
    displayName: 'Sarah Tech',
    email: 'sarah@example.com',
    bio: 'Tech stocks enthusiast 💻 | Day trader | FAANG investor',
    verificationStatus: 'verified',
    followersCount: 8721,
    followingCount: 567,
    postsCount: 892,
  },
  {
    id: '3',
    username: 'crypto_mike',
    displayName: 'Mike Crypto',
    email: 'mike@example.com',
    bio: 'Blockchain believer | DeFi explorer | Not financial advice',
    verificationStatus: 'none',
    followersCount: 4532,
    followingCount: 289,
    postsCount: 634,
  },
  {
    id: '4',
    username: 'dividend_dan',
    displayName: 'Dividend Dan',
    email: 'dan@example.com',
    bio: 'Building passive income through dividends | Sharing my DRIP journey',
    verificationStatus: 'verified',
    followersCount: 12456,
    followingCount: 234,
    postsCount: 1567,
  },
  {
    id: '5',
    username: 'real_estate_rachel',
    displayName: 'Rachel Properties',
    email: 'rachel@example.com',
    bio: 'Real Estate Investor | REITs | Property management tips',
    verificationStatus: 'verified',
    followersCount: 6789,
    followingCount: 445,
    postsCount: 743,
  },
];

// Mock Posts
export const mockPosts: MockPost[] = [
  {
    id: '1',
    userId: '1',
    username: 'warren_investor',
    displayName: 'Warren Buffett Jr.',
    content:
      'Just added more shares to my $AAPL position. The fundamentals are too strong to ignore at this price point. Remember - be greedy when others are fearful! 📈',
    postType: 'text',
    category: 'stocks',
    hashtags: ['investing', 'stocks', 'valueinvesting'],
    mentionedUsers: [],
    tickers: ['AAPL'],
    likesCount: 1243,
    commentsCount: 87,
    sharesCount: 34,
    isLiked: false,
    isSaved: false,
    isEdited: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    userId: '2',
    username: 'tech_trader',
    displayName: 'Sarah Tech',
    content:
      'Amazing earnings from $MSFT today! Cloud revenue up 28% YoY. Azure is crushing it. This is why I stay long on tech 🚀',
    postType: 'text',
    category: 'stocks',
    hashtags: ['earnings', 'techstocks', 'microsoft'],
    mentionedUsers: [],
    tickers: ['MSFT'],
    likesCount: 892,
    commentsCount: 56,
    sharesCount: 23,
    isLiked: true,
    isSaved: false,
    isEdited: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    userId: '3',
    username: 'crypto_mike',
    displayName: 'Mike Crypto',
    content:
      '$BTC breaking through resistance at $65k! The bull run is just getting started. Next stop: $100k 🎯',
    postType: 'text',
    category: 'crypto',
    hashtags: ['bitcoin', 'crypto', 'bullrun'],
    mentionedUsers: [],
    tickers: ['BTC'],
    likesCount: 567,
    commentsCount: 123,
    sharesCount: 45,
    isLiked: false,
    isSaved: true,
    isEdited: false,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    userId: '4',
    username: 'dividend_dan',
    displayName: 'Dividend Dan',
    content:
      'Received $427 in dividends this month! $JNJ, $PG, $KO all paying out. Passive income is the best income 💰',
    postType: 'text',
    category: 'dividends',
    hashtags: ['dividends', 'passiveincome', 'financialfreedom'],
    mentionedUsers: [],
    tickers: ['JNJ', 'PG', 'KO'],
    likesCount: 1567,
    commentsCount: 234,
    sharesCount: 67,
    isLiked: true,
    isSaved: true,
    isEdited: false,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    userId: '5',
    username: 'real_estate_rachel',
    displayName: 'Rachel Properties',
    content:
      'Just closed on my 4th rental property! $VNQ has been great, but nothing beats owning physical real estate. Cash flow positive from day one! 🏡',
    postType: 'text',
    category: 'realestate',
    hashtags: ['realestate', 'rentalproperty', 'investing'],
    mentionedUsers: [],
    tickers: ['VNQ'],
    likesCount: 743,
    commentsCount: 98,
    sharesCount: 29,
    isLiked: false,
    isSaved: false,
    isEdited: false,
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '6',
    userId: '1',
    username: 'warren_investor',
    displayName: 'Warren Buffett Jr.',
    content:
      'Market volatility is your friend, not your enemy. If you can\'t handle a 50% drawdown, you don\'t deserve the 100% gains. #investing101',
    postType: 'text',
    category: 'investing',
    hashtags: ['investing', 'marketvolatility', 'wisdom'],
    mentionedUsers: [],
    tickers: [],
    likesCount: 2134,
    commentsCount: 156,
    sharesCount: 89,
    isLiked: true,
    isSaved: false,
    isEdited: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '7',
    userId: '2',
    username: 'tech_trader',
    displayName: 'Sarah Tech',
    content:
      'My portfolio breakdown: 40% $GOOGL, 30% $AMZN, 20% $NVDA, 10% cash. Heavy on tech? Yes. Sleeping well at night? Also yes. 😴',
    postType: 'text',
    category: 'portfolio',
    hashtags: ['portfolio', 'techstocks', 'investing'],
    mentionedUsers: [],
    tickers: ['GOOGL', 'AMZN', 'NVDA'],
    likesCount: 645,
    commentsCount: 87,
    sharesCount: 34,
    isLiked: false,
    isSaved: false,
    isEdited: false,
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '8',
    userId: '3',
    username: 'crypto_mike',
    displayName: 'Mike Crypto',
    content:
      'DeFi update: Staking yields are looking juicy again. Getting 12% APY on $ETH. Traditional banks could never 🏦❌',
    postType: 'text',
    category: 'crypto',
    hashtags: ['defi', 'staking', 'ethereum'],
    mentionedUsers: [],
    tickers: ['ETH'],
    likesCount: 423,
    commentsCount: 67,
    sharesCount: 21,
    isLiked: false,
    isSaved: false,
    isEdited: false,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock Comments
export const mockComments: {[postId: string]: MockComment[]} = {
  '1': [
    {
      id: 'c1',
      postId: '1',
      userId: '2',
      username: 'tech_trader',
      displayName: 'Sarah Tech',
      content: 'Totally agree! AAPL is a steal at these levels.',
      likesCount: 45,
      isLiked: false,
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'c2',
      postId: '1',
      userId: '4',
      username: 'dividend_dan',
      displayName: 'Dividend Dan',
      content: 'Their dividend is solid too. Great for long-term holders!',
      likesCount: 23,
      isLiked: true,
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
  ],
  '2': [
    {
      id: 'c3',
      postId: '2',
      userId: '1',
      username: 'warren_investor',
      displayName: 'Warren Buffett Jr.',
      content: 'Cloud computing is the future. MSFT is well-positioned.',
      likesCount: 67,
      isLiked: true,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    },
  ],
};

// Mock Notifications
export const mockNotifications: MockNotification[] = [
  {
    id: 'n1',
    type: 'like',
    userId: '1',
    username: 'warren_investor',
    displayName: 'Warren Buffett Jr.',
    content: 'liked your post',
    postId: '1',
    isRead: false,
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: 'n2',
    type: 'comment',
    userId: '2',
    username: 'tech_trader',
    displayName: 'Sarah Tech',
    content: 'commented on your post: "Great analysis!"',
    postId: '2',
    isRead: false,
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    id: 'n3',
    type: 'follow',
    userId: '3',
    username: 'crypto_mike',
    displayName: 'Mike Crypto',
    content: 'started following you',
    isRead: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'n4',
    type: 'mention',
    userId: '4',
    username: 'dividend_dan',
    displayName: 'Dividend Dan',
    content: 'mentioned you in a post',
    postId: '4',
    isRead: true,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
];

// Service functions
export const getMockPosts = (filter: string = 'home'): MockPost[] => {
  // In a real app, filter would fetch different data
  // For mock, we'll return all posts
  return mockPosts;
};

export const getMockUser = (userId: string): MockUser | undefined => {
  return mockUsers.find(u => u.id === userId);
};

export const getMockPost = (postId: string): MockPost | undefined => {
  return mockPosts.find(p => p.id === postId);
};

export const getMockComments = (postId: string): MockComment[] => {
  return mockComments[postId] || [];
};

export const getMockNotifications = (): MockNotification[] => {
  return mockNotifications;
};

export const getCurrentUser = (): MockUser => {
  return {
    id: 'current-user',
    username: 'testuser',
    displayName: 'Test User',
    email: 'test@example.com',
    bio: 'Learning to invest wisely',
    verificationStatus: 'none',
    followersCount: 245,
    followingCount: 189,
    postsCount: 42,
  };
};
