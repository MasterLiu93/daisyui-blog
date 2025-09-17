import { request, mockResponse } from './request';
import { API_ENDPOINTS, API_CONFIG } from './config';

// 角色查询参数
export interface RoleQueryParams {
  pageNo?: number;
  pageSize?: number;
  name?: string;
  code?: string;
  status?: number;
  createTime?: string[];
}

// 角色信息
export interface RoleInfo {
  id: number;
  name: string;
  code: string;
  sort: number;
  status: number;
  type: number;
  remark?: string;
  dataScope: number;
  dataScopeDeptIds: number[];
  createTime: string;
}

// 角色创建请求
export interface RoleCreateReq {
  name: string;
  code: string;
  sort: number;
  status: number;
  remark?: string;
  dataScope: number;
  dataScopeDeptIds: number[];
  menuIds: number[];
}

// 角色更新请求
export interface RoleUpdateReq extends RoleCreateReq {
  id: number;
}

// 分页结果
export interface PageResult<T> {
  list: T[];
  total: number;
}

// 模拟数据
const mockRoles: RoleInfo[] = [
  {
    id: 1,
    name: '超级管理员',
    code: 'super_admin',
    sort: 1,
    status: 0,
    type: 1,
    dataScope: 1,
    dataScopeDeptIds: [],
    createTime: '2023-01-01 00:00:00'
  },
  {
    id: 2,
    name: '普通用户',
    code: 'common',
    sort: 2,
    status: 0,
    type: 2,
    dataScope: 2,
    dataScopeDeptIds: [1, 2],
    remark: '普通用户',
    createTime: '2023-01-02 00:00:00'
  }
];

export const roleApi = {
  // 获取角色分页列表
  getPage: async (params: RoleQueryParams): Promise<PageResult<RoleInfo>> => {
    if (API_CONFIG.useMock) {
      const { pageNo = 1, pageSize = 10 } = params;
      const start = (pageNo - 1) * pageSize;
      const end = start + pageSize;
      const list = mockRoles.slice(start, end);
      return mockResponse({
        list,
        total: mockRoles.length
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
    
    return request<PageResult<RoleInfo>>(`${API_ENDPOINTS.role.page}?${queryParams.toString()}`, {
      method: 'GET'
    });
  },
  
  // 获取角色列表(不分页)
  getList: async (): Promise<RoleInfo[]> => {
    if (API_CONFIG.useMock) {
      return mockResponse(mockRoles);
    }
    
    return request<RoleInfo[]>(API_ENDPOINTS.role.list, {
      method: 'GET'
    });
  },
  
  // 获取角色详情
  getInfo: async (id: number): Promise<RoleInfo> => {
    if (API_CONFIG.useMock) {
      const role = mockRoles.find(r => r.id === id);
      if (!role) {
        throw new Error('Role not found');
      }
      return mockResponse(role);
    }
    
    return request<RoleInfo>(`${API_ENDPOINTS.role.get}?id=${id}`, {
      method: 'GET'
    });
  },
  
  // 创建角色
  createRole: async (data: RoleCreateReq): Promise<number> => {
    if (API_CONFIG.useMock) {
      const newId = Math.max(...mockRoles.map(r => r.id)) + 1;
      mockRoles.push({
        ...data,
        id: newId,
        type: 2,
        createTime: new Date().toISOString()
      });
      return mockResponse(newId);
    }
    
    return request<number>(API_ENDPOINTS.role.create, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
  
  // 更新角色
  updateRole: async (data: RoleUpdateReq): Promise<boolean> => {
    if (API_CONFIG.useMock) {
      const index = mockRoles.findIndex(r => r.id === data.id);
      if (index === -1) {
        throw new Error('Role not found');
      }
      mockRoles[index] = {
        ...mockRoles[index],
        ...data
      };
      return mockResponse(true);
    }
    
    return request<boolean>(API_ENDPOINTS.role.update, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },
  
  // 删除角色
  deleteRole: async (id: number): Promise<boolean> => {
    if (API_CONFIG.useMock) {
      const index = mockRoles.findIndex(r => r.id === id);
      if (index === -1) {
        throw new Error('Role not found');
      }
      mockRoles.splice(index, 1);
      return mockResponse(true);
    }
    
    return request<boolean>(`${API_ENDPOINTS.role.delete}?id=${id}`, {
      method: 'DELETE'
    });
  },
  
  // 更新角色状态
  updateRoleStatus: async (id: number, status: number): Promise<boolean> => {
    if (API_CONFIG.useMock) {
      const role = mockRoles.find(r => r.id === id);
      if (!role) {
        throw new Error('Role not found');
      }
      role.status = status;
      return mockResponse(true);
    }
    
    return request<boolean>(API_ENDPOINTS.role.updateStatus, {
      method: 'PUT',
      body: JSON.stringify({ id, status })
    });
  }
};

export default roleApi; 