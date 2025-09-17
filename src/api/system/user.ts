import { request, mockResponse } from './request';
import { API_ENDPOINTS, API_CONFIG } from './config';

// 用户查询参数
export interface UserQueryParams {
  pageNo?: number;
  pageSize?: number;
  username?: string;
  nickname?: string;
  status?: number;
  mobile?: string;
  deptId?: number;
  createTime?: string[];
}

// 用户信息
export interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  deptId: number;
  postIds: number[];
  email: string;
  mobile: string;
  sex: number;
  avatar: string;
  status: number;
  remark?: string; // 修改为可选字段
  loginIp: string;
  loginDate: string;
  createTime: string;
}

// 用户创建请求
export interface UserCreateReq {
  username: string;
  nickname: string;
  password: string;
  deptId: number;
  postIds: number[];
  email: string;
  mobile: string;
  sex: number;
  status: number;
  remark?: string;
}

// 用户更新请求
export interface UserUpdateReq extends Omit<UserCreateReq, 'password'> {
  id: number;
  password?: string;
}

// 分页结果
export interface PageResult<T> {
  list: T[];
  total: number;
}

// 模拟数据
const mockUsers: UserInfo[] = [
  {
    id: 1,
    username: 'admin',
    nickname: '管理员',
    deptId: 1,
    postIds: [1],
    email: 'admin@example.com',
    mobile: '13800138000',
    sex: 1,
    avatar: '/images/user/header.jpg',
    status: 0,
    remark: '系统管理员',
    loginIp: '127.0.0.1',
    loginDate: '2023-01-01 12:00:00',
    createTime: '2023-01-01 00:00:00'
  },
  {
    id: 2,
    username: 'test',
    nickname: '测试用户',
    deptId: 2,
    postIds: [2],
    email: 'test@example.com',
    mobile: '13900139000',
    sex: 2,
    avatar: '/images/user/default.jpg',
    status: 0,
    remark: '测试账号',
    loginIp: '127.0.0.1',
    loginDate: '2023-01-02 12:00:00',
    createTime: '2023-01-02 00:00:00'
  }
];

export const userApi = {
  // 获取用户分页列表
  getPage: async (params: UserQueryParams): Promise<PageResult<UserInfo>> => {
    if (API_CONFIG.useMock) {
      const { pageNo = 1, pageSize = 10 } = params;
      const start = (pageNo - 1) * pageSize;
      const end = start + pageSize;
      const list = mockUsers.slice(start, end);
      return mockResponse({
        list,
        total: mockUsers.length
      });
    }
    
    // 构建URL查询参数
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(item => queryParams.append(key, item));
        } else {
          queryParams.append(key, String(value));
        }
      }
    });
    
    return request<PageResult<UserInfo>>(`${API_ENDPOINTS.user.page}?${queryParams.toString()}`, {
      method: 'GET'
    });
  },
  
  // 获取用户详情
  getInfo: async (id: number): Promise<UserInfo> => {
    if (API_CONFIG.useMock) {
      const user = mockUsers.find(u => u.id === id);
      if (!user) {
        throw new Error('User not found');
      }
      return mockResponse(user);
    }
    
    return request<UserInfo>(`${API_ENDPOINTS.user.get}?id=${id}`, {
      method: 'GET'
    });
  },
  
  // 创建用户
  createUser: async (data: UserCreateReq): Promise<number> => {
    if (API_CONFIG.useMock) {
      const newId = Math.max(...mockUsers.map(u => u.id)) + 1;
      mockUsers.push({
        ...data,
        id: newId,
        avatar: '/images/user/default.jpg',
        loginIp: '',
        loginDate: '',
        createTime: new Date().toISOString()
      });
      return mockResponse(newId);
    }
    
    return request<number>(API_ENDPOINTS.user.create, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
  
  // 更新用户
  updateUser: async (data: UserUpdateReq): Promise<boolean> => {
    if (API_CONFIG.useMock) {
      const index = mockUsers.findIndex(u => u.id === data.id);
      if (index === -1) {
        throw new Error('User not found');
      }
      mockUsers[index] = {
        ...mockUsers[index],
        ...data
      };
      return mockResponse(true);
    }
    
    return request<boolean>(API_ENDPOINTS.user.update, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },
  
  // 删除用户
  deleteUser: async (id: number): Promise<boolean> => {
    if (API_CONFIG.useMock) {
      const index = mockUsers.findIndex(u => u.id === id);
      if (index === -1) {
        throw new Error('User not found');
      }
      mockUsers.splice(index, 1);
      return mockResponse(true);
    }
    
    return request<boolean>(`${API_ENDPOINTS.user.delete}?id=${id}`, {
      method: 'DELETE'
    });
  },
  
  // 批量删除用户
  batchDeleteUser: async (ids: number[]): Promise<boolean> => {
    if (API_CONFIG.useMock) {
      ids.forEach(id => {
        const index = mockUsers.findIndex(u => u.id === id);
        if (index !== -1) {
          mockUsers.splice(index, 1);
        }
      });
      return mockResponse(true);
    }
    
    return request<boolean>(API_ENDPOINTS.user.delete, {
      method: 'DELETE',
      body: JSON.stringify(ids)
    });
  },
  
  // 更新用户状态
  updateUserStatus: async (id: number, status: number): Promise<boolean> => {
    if (API_CONFIG.useMock) {
      const user = mockUsers.find(u => u.id === id);
      if (!user) {
        throw new Error('User not found');
      }
      user.status = status;
      return mockResponse(true);
    }
    
    return request<boolean>(API_ENDPOINTS.user.updateStatus, {
      method: 'PUT',
      body: JSON.stringify({ id, status })
    });
  },
  
  // 重置用户密码
  resetUserPassword: async (id: number, password: string): Promise<boolean> => {
    if (API_CONFIG.useMock) {
      return mockResponse(true);
    }
    
    return request<boolean>(API_ENDPOINTS.user.updatePassword, {
      method: 'PUT',
      body: JSON.stringify({ id, password })
    });
  }
};

export default userApi; 