import { request, mockResponse } from './request';
import { API_ENDPOINTS, API_CONFIG } from './config';

// 部门查询参数
export interface DeptQueryParams {
  name?: string;
  status?: number;
}

// 部门信息
export interface DeptInfo {
  id: number;
  name: string;
  parentId: number;
  sort: number;
  leaderUserId: number;
  phone: string;
  email: string;
  status: number;
  createTime: string;
}

// 部门创建请求
export interface DeptCreateReq {
  name: string;
  parentId: number;
  sort: number;
  leaderUserId?: number;
  phone?: string;
  email?: string;
  status: number;
}

// 部门更新请求
export interface DeptUpdateReq extends DeptCreateReq {
  id: number;
}

// 部门简单信息
export interface DeptSimpleInfo {
  id: number;
  name: string;
  parentId: number;
}

// 模拟数据
const mockDepts: DeptInfo[] = [
  {
    id: 1,
    name: '总公司',
    parentId: 0,
    sort: 1,
    leaderUserId: 1,
    phone: '13800138000',
    email: 'company@example.com',
    status: 0,
    createTime: '2023-01-01 00:00:00'
  },
  {
    id: 2,
    name: '技术部',
    parentId: 1,
    sort: 1,
    leaderUserId: 2,
    phone: '13900139000',
    email: 'tech@example.com',
    status: 0,
    createTime: '2023-01-02 00:00:00'
  },
  {
    id: 3,
    name: '市场部',
    parentId: 1,
    sort: 2,
    leaderUserId: 3,
    phone: '13700137000',
    email: 'market@example.com',
    status: 0,
    createTime: '2023-01-03 00:00:00'
  }
];

export const deptApi = {
  // 获取部门列表
  getList: async (params: DeptQueryParams): Promise<DeptInfo[]> => {
    if (API_CONFIG.useMock) {
      let result = [...mockDepts];
      
      // 按名称筛选
      if (params.name) {
        result = result.filter(dept => dept.name.includes(params.name!));
      }
      
      // 按状态筛选
      if (params.status !== undefined) {
        result = result.filter(dept => dept.status === params.status);
      }
      
      return mockResponse(result);
    }
    
    // 构建URL查询参数
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value));
      }
    });
    
    return request<DeptInfo[]>(`${API_ENDPOINTS.dept.list}?${queryParams.toString()}`, {
      method: 'GET'
    });
  },
  
  // 获取部门详情
  getInfo: async (id: number): Promise<DeptInfo> => {
    if (API_CONFIG.useMock) {
      const dept = mockDepts.find(d => d.id === id);
      if (!dept) {
        throw new Error('Department not found');
      }
      return mockResponse(dept);
    }
    
    return request<DeptInfo>(`${API_ENDPOINTS.dept.get}?id=${id}`, {
      method: 'GET'
    });
  },
  
  // 创建部门
  createDept: async (data: DeptCreateReq): Promise<number> => {
    if (API_CONFIG.useMock) {
      const newId = Math.max(...mockDepts.map(d => d.id)) + 1;
      const newDept: DeptInfo = {
        ...data,
        id: newId,
        leaderUserId: data.leaderUserId || 0,
        phone: data.phone || '',
        email: data.email || '',
        createTime: new Date().toISOString()
      };
      mockDepts.push(newDept);
      return mockResponse(newId);
    }
    
    return request<number>(API_ENDPOINTS.dept.create, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
  
  // 更新部门
  updateDept: async (data: DeptUpdateReq): Promise<boolean> => {
    if (API_CONFIG.useMock) {
      const index = mockDepts.findIndex(d => d.id === data.id);
      if (index === -1) {
        throw new Error('Department not found');
      }
      mockDepts[index] = {
        ...mockDepts[index],
        ...data,
        leaderUserId: data.leaderUserId || mockDepts[index].leaderUserId,
        phone: data.phone || mockDepts[index].phone,
        email: data.email || mockDepts[index].email
      };
      return mockResponse(true);
    }
    
    return request<boolean>(API_ENDPOINTS.dept.update, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },
  
  // 删除部门
  deleteDept: async (id: number): Promise<boolean> => {
    if (API_CONFIG.useMock) {
      // 检查是否有子部门
      const hasChildren = mockDepts.some(d => d.parentId === id);
      if (hasChildren) {
        throw new Error('Cannot delete department with children');
      }
      
      const index = mockDepts.findIndex(d => d.id === id);
      if (index === -1) {
        throw new Error('Department not found');
      }
      mockDepts.splice(index, 1);
      return mockResponse(true);
    }
    
    return request<boolean>(`${API_ENDPOINTS.dept.delete}?id=${id}`, {
      method: 'DELETE'
    });
  },
  
  // 获取部门简单列表(下拉选择用)
  getSimpleList: async (): Promise<DeptSimpleInfo[]> => {
    if (API_CONFIG.useMock) {
      return mockResponse(mockDepts.map(d => ({
        id: d.id,
        name: d.name,
        parentId: d.parentId
      })));
    }
    
    return request<DeptSimpleInfo[]>(API_ENDPOINTS.dept.listSimple, {
      method: 'GET'
    });
  }
};

export default deptApi; 