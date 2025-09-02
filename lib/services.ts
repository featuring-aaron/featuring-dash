import { api } from './api';
import { API_ENDPOINTS } from './endpoints';
import type {
  User,
  Post,
  Comment,
  LoginRequest,
  RegisterRequest,
  CreatePostRequest,
  UpdatePostRequest,
  ApiResponse,
} from './endpoints';

// 인증 서비스
export const authService = {
  // 로그인
  login: async (credentials: LoginRequest): Promise<ApiResponse<{ token: string; user: User }>> => {
    return api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },

  // 회원가입
  register: async (userData: RegisterRequest): Promise<ApiResponse<{ token: string; user: User }>> => {
    return api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  },

  // 로그아웃
  logout: async (): Promise<ApiResponse<void>> => {
    return api.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  // 프로필 조회
  getProfile: async (): Promise<ApiResponse<User>> => {
    return api.get(API_ENDPOINTS.AUTH.PROFILE);
  },

  // 토큰 갱신
  refreshToken: async (): Promise<ApiResponse<{ token: string }>> => {
    return api.post(API_ENDPOINTS.AUTH.REFRESH);
  },
};

// 사용자 서비스
export const userService = {
  // 모든 사용자 조회
  getAllUsers: async (): Promise<ApiResponse<User[]>> => {
    return api.get(API_ENDPOINTS.USER.GET_ALL);
  },

  // 특정 사용자 조회
  getUserById: async (id: string): Promise<ApiResponse<User>> => {
    return api.get(API_ENDPOINTS.USER.GET_BY_ID(id));
  },

  // 사용자 정보 수정
  updateUser: async (id: string, userData: Partial<User>): Promise<ApiResponse<User>> => {
    return api.put(API_ENDPOINTS.USER.UPDATE(id), userData);
  },

  // 사용자 삭제
  deleteUser: async (id: string): Promise<ApiResponse<void>> => {
    return api.delete(API_ENDPOINTS.USER.DELETE(id));
  },
};

// 게시물 서비스
export const postService = {
  // 모든 게시물 조회
  getAllPosts: async (): Promise<ApiResponse<Post[]>> => {
    return api.get(API_ENDPOINTS.POSTS.GET_ALL);
  },

  // 특정 게시물 조회
  getPostById: async (id: string): Promise<ApiResponse<Post>> => {
    return api.get(API_ENDPOINTS.POSTS.GET_BY_ID(id));
  },

  // 게시물 생성
  createPost: async (postData: CreatePostRequest): Promise<ApiResponse<Post>> => {
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    
    if (postData.images) {
      postData.images.forEach((image) => {
        formData.append('images', image);
      });
    }

    return api.post(API_ENDPOINTS.POSTS.CREATE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // 게시물 수정
  updatePost: async (id: string, postData: UpdatePostRequest): Promise<ApiResponse<Post>> => {
    const formData = new FormData();
    
    if (postData.title) formData.append('title', postData.title);
    if (postData.content) formData.append('content', postData.content);
    
    if (postData.images) {
      postData.images.forEach((image) => {
        formData.append('images', image);
      });
    }

    return api.put(API_ENDPOINTS.POSTS.UPDATE(id), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // 게시물 삭제
  deletePost: async (id: string): Promise<ApiResponse<void>> => {
    return api.delete(API_ENDPOINTS.POSTS.DELETE(id));
  },

  // 게시물 좋아요
  likePost: async (id: string): Promise<ApiResponse<void>> => {
    return api.post(API_ENDPOINTS.POSTS.LIKE(id));
  },

  // 게시물 좋아요 취소
  unlikePost: async (id: string): Promise<ApiResponse<void>> => {
    return api.post(API_ENDPOINTS.POSTS.UNLIKE(id));
  },
};

// 댓글 서비스
export const commentService = {
  // 게시물의 댓글 조회
  getCommentsByPost: async (postId: string): Promise<ApiResponse<Comment[]>> => {
    return api.get(API_ENDPOINTS.COMMENTS.GET_BY_POST(postId));
  },

  // 댓글 생성
  createComment: async (postId: string, content: string): Promise<ApiResponse<Comment>> => {
    return api.post(API_ENDPOINTS.COMMENTS.CREATE(postId), { content });
  },

  // 댓글 수정
  updateComment: async (
    postId: string,
    commentId: string,
    content: string
  ): Promise<ApiResponse<Comment>> => {
    return api.put(API_ENDPOINTS.COMMENTS.UPDATE(postId, commentId), { content });
  },

  // 댓글 삭제
  deleteComment: async (postId: string, commentId: string): Promise<ApiResponse<void>> => {
    return api.delete(API_ENDPOINTS.COMMENTS.DELETE(postId, commentId));
  },
};

// 파일 업로드 서비스
export const uploadService = {
  // 이미지 업로드
  uploadImage: async (file: File): Promise<ApiResponse<{ url: string }>> => {
    const formData = new FormData();
    formData.append('image', file);

    return api.post(API_ENDPOINTS.UPLOAD.IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // 파일 업로드
  uploadFile: async (file: File): Promise<ApiResponse<{ url: string }>> => {
    const formData = new FormData();
    formData.append('file', file);

    return api.post(API_ENDPOINTS.UPLOAD.FILE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// 검색 서비스
export const searchService = {
  // 사용자 검색
  searchUsers: async (query: string): Promise<ApiResponse<User[]>> => {
    return api.get(API_ENDPOINTS.SEARCH.USERS, { params: { q: query } });
  },

  // 게시물 검색
  searchPosts: async (query: string): Promise<ApiResponse<Post[]>> => {
    return api.get(API_ENDPOINTS.SEARCH.POSTS, { params: { q: query } });
  },

  // 전체 검색
  globalSearch: async (query: string): Promise<ApiResponse<{ users: User[]; posts: Post[] }>> => {
    return api.get(API_ENDPOINTS.SEARCH.GLOBAL, { params: { q: query } });
  },
};
