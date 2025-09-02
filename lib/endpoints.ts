// API 엔드포인트 정의
export const API_ENDPOINTS = {
  // 인증 관련
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  
  // 사용자 관련
  USER: {
    GET_ALL: '/users',
    GET_BY_ID: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },
  
  // 게시물 관련
  POSTS: {
    GET_ALL: '/posts',
    GET_BY_ID: (id: string) => `/posts/${id}`,
    CREATE: '/posts',
    UPDATE: (id: string) => `/posts/${id}`,
    DELETE: (id: string) => `/posts/${id}`,
    LIKE: (id: string) => `/posts/${id}/like`,
    UNLIKE: (id: string) => `/posts/${id}/unlike`,
  },
  
  // 댓글 관련
  COMMENTS: {
    GET_BY_POST: (postId: string) => `/posts/${postId}/comments`,
    CREATE: (postId: string) => `/posts/${postId}/comments`,
    UPDATE: (postId: string, commentId: string) => `/posts/${postId}/comments/${commentId}`,
    DELETE: (postId: string, commentId: string) => `/posts/${postId}/comments/${commentId}`,
  },
  
  // 파일 업로드
  UPLOAD: {
    IMAGE: '/upload/image',
    FILE: '/upload/file',
  },
  
  // 검색
  SEARCH: {
    USERS: '/search/users',
    POSTS: '/search/posts',
    GLOBAL: '/search',
  },
} as const;

// API 응답 타입들
export interface User {
  id: string;
  username: string;
  email: string;
  profileImage?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: User;
  images?: string[];
  likes: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author: User;
  postId: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  images?: File[];
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  images?: File[];
}
