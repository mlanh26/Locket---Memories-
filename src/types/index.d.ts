// Base type cho timestamps
interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

// User interface
export interface User extends BaseEntity {
  email: string;
  username: string;
  avatar?: string;
  bio?: string;
  followersCount?: number;
  followingCount?: number;
}

// Post interface
export interface Post extends BaseEntity {
  userId: string;
  user?: User; // Reference to user object
  imageUrl: string;
  caption?: string;
  likes: number;
  likesCount?: number;
  commentsCount?: number;
  comments: Comment[];
  isLiked?: boolean; // Để track trạng thái like của user hiện tại
}

// Comment interface
export interface Comment extends BaseEntity {
  userId: string;
  user?: User; // Reference to user object
  postId: string;
  content: string;
  likes?: number;
}

// Auth related interfaces
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
