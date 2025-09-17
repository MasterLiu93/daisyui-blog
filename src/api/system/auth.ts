import { request, mockResponse } from './request';
import { API_ENDPOINTS, API_CONFIG } from './config';

// 登录请求参数
export interface LoginParams {
  username: string;
  password: string;
  captchaVerification?: string;
}

// 用户信息接口
export interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
  roles: string[];
  permissions: string[];
}

// 登录结果接口
export interface LoginResult {
  userId: number;
  accessToken: string;
  refreshToken: string;
  expiresTime: number;
}

// 权限信息接口
export interface PermissionInfo {
  user: {
    id: number;
    nickname: string;
    avatar: string;
    username: string;
    deptId: number;
    email: string;
    mobile: string;
    sex: number;
    status: number;
  };
  roles: string[];
  permissions: string[];
  menus: any[];
}

// Mock data for development
const mockUserInfo: UserInfo = {
  id: 1,
  username: 'admin',
  nickname: 'Administrator',
  avatar: '/images/user/header.jpg',
  roles: ['admin'],
  permissions: ['*:*:*'],
};

const mockLoginResult: LoginResult = {
  userId: 1,
  accessToken: 'mock-jwt-token',
  refreshToken: 'mock-refresh-token',
  expiresTime: Date.now() + 7200000, // 2小时后过期
};

const mockPermissionInfo: PermissionInfo = {
  user: {
    id: 1,
    nickname: 'Administrator',
    avatar: '/images/user/header.jpg',
    username: 'admin',
    deptId: 1,
    email: 'admin@example.com',
    mobile: '13800138000',
    sex: 1,
    status: 0,
  },
  roles: ['admin'],
  permissions: ['*:*:*'],
  menus: []
};

export const authApi = {
  login: async (data: LoginParams): Promise<LoginResult> => {
    // Use mock data in development if configured
    if (API_CONFIG.useMock) {
      // Simulate login logic
      if (data.username === 'admin' && data.password === 'admin123') {
        return mockResponse(mockLoginResult);
      } else {
        throw new Error('Invalid credentials');
      }
    }
    
    return request<LoginResult>(API_ENDPOINTS.auth.login, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  getUserInfo: async (): Promise<PermissionInfo> => {
    // Use mock data in development if configured
    if (API_CONFIG.useMock) {
      return mockResponse(mockPermissionInfo);
    }
    
    return request<PermissionInfo>(API_ENDPOINTS.auth.getUserInfo);
  },
  
  logout: async (): Promise<void> => {
    // Use mock data in development if configured
    if (API_CONFIG.useMock) {
      return mockResponse<void>(undefined);
    }
    
    return request<void>(API_ENDPOINTS.auth.logout, {
      method: 'POST',
    });
  },

  refreshToken: async (refreshToken: string): Promise<LoginResult> => {
    // Use mock data in development if configured
    if (API_CONFIG.useMock) {
      return mockResponse(mockLoginResult);
    }
    
    return request<LoginResult>(API_ENDPOINTS.auth.refreshToken, {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  },
};

// Token management helpers
export const getToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

export const setToken = (token: LoginResult): void => {
  localStorage.setItem('accessToken', token.accessToken);
  localStorage.setItem('refreshToken', token.refreshToken);
  localStorage.setItem('expiresTime', token.expiresTime.toString());
  localStorage.setItem('userId', token.userId.toString());
};

export const removeToken = (): void => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('expiresTime');
  localStorage.removeItem('userId');
};

// User info management helpers
export const getUserInfo = (): PermissionInfo | null => {
  const userStr = localStorage.getItem('userInfo');
  return userStr ? JSON.parse(userStr) : null;
};

export const setUserInfo = (userInfo: PermissionInfo): void => {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
};

export const removeUserInfo = (): void => {
  localStorage.removeItem('userInfo');
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getToken();
  const expiresTime = localStorage.getItem('expiresTime');
  
  if (!token || !expiresTime) {
    return false;
  }
  
  // 检查令牌是否过期
  return parseInt(expiresTime) > Date.now();
};

// Check if user has permission
export const hasPermission = (permission: string): boolean => {
  const userInfo = getUserInfo();
  if (!userInfo || !userInfo.permissions) return false;
  
  // Admin has all permissions
  if (userInfo.permissions.includes('*:*:*')) return true;
  
  return userInfo.permissions.includes(permission);
};

// Check if user has role
export const hasRole = (role: string): boolean => {
  const userInfo = getUserInfo();
  if (!userInfo || !userInfo.roles) return false;
  
  // Admin has all roles
  if (userInfo.roles.includes('admin')) return true;
  
  return userInfo.roles.includes(role);
};

export default authApi; 