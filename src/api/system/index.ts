import { request } from './request';
import authApi from './auth';

// User API
export interface User {
  id: number;
  username: string;
  email: string;
  nickname: string;
  deptId: number;
  postIds: number[];
  remark: string;
  status: number;
  loginIp: string;
  loginDate: string;
  createTime: string;
}

export interface UserPageReq {
  pageNo: number;
  pageSize: number;
  username?: string;
  nickname?: string;
  status?: number;
  deptId?: number;
  createTime?: [string, string];
}

export interface UserPageRes {
  list: User[];
  total: number;
}

export const userApi = {
  getPage: (params: UserPageReq) => request<UserPageRes>('/system/user/page', {
    method: 'GET',
    headers: { params: JSON.stringify(params) },
  }),
  
  getDetail: (id: number) => request<User>(`/system/user/get?id=${id}`),
  
  create: (data: Omit<User, 'id'>) => request<void>('/system/user/create', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  update: (data: User) => request<void>('/system/user/update', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (id: number) => request<void>(`/system/user/delete?id=${id}`, {
    method: 'DELETE',
  }),
};

// Role API
export interface Role {
  id: number;
  name: string;
  code: string;
  sort: number;
  status: number;
  type: number;
  createTime: string;
}

export interface RolePageReq {
  pageNo: number;
  pageSize: number;
  name?: string;
  code?: string;
  status?: number;
  createTime?: [string, string];
}

export interface RolePageRes {
  list: Role[];
  total: number;
}

export const roleApi = {
  getPage: (params: RolePageReq) => request<RolePageRes>('/system/role/page', {
    method: 'GET',
    headers: { params: JSON.stringify(params) },
  }),
  
  getDetail: (id: number) => request<Role>(`/system/role/get?id=${id}`),
  
  create: (data: Omit<Role, 'id'>) => request<void>('/system/role/create', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  update: (data: Role) => request<void>('/system/role/update', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (id: number) => request<void>(`/system/role/delete?id=${id}`, {
    method: 'DELETE',
  }),
};

// Department API
export interface Dept {
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

export const deptApi = {
  getList: (params: { name?: string; status?: number }) => 
    request<Dept[]>('/system/dept/list', {
      method: 'GET',
      headers: { params: JSON.stringify(params) },
    }),
  
  getDetail: (id: number) => request<Dept>(`/system/dept/get?id=${id}`),
  
  create: (data: Omit<Dept, 'id'>) => request<void>('/system/dept/create', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  update: (data: Dept) => request<void>('/system/dept/update', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (id: number) => request<void>(`/system/dept/delete?id=${id}`, {
    method: 'DELETE',
  }),
};

// Dictionary API
export interface Dict {
  id: number;
  name: string;
  type: string;
  status: number;
  remark: string;
  createTime: string;
}

export interface DictData {
  id: number;
  dictType: string;
  sort: number;
  label: string;
  value: string;
  status: number;
  colorType: string;
  cssClass: string;
  remark: string;
  createTime: string;
}

export const dictApi = {
  getTypeList: (params: { name?: string; type?: string; status?: number }) => 
    request<Dict[]>('/system/dict-type/list', {
      method: 'GET',
      headers: { params: JSON.stringify(params) },
    }),
  
  getDataList: (dictType: string) => 
    request<DictData[]>(`/system/dict-data/list?dictType=${dictType}`),
  
  createType: (data: Omit<Dict, 'id'>) => request<void>('/system/dict-type/create', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  updateType: (data: Dict) => request<void>('/system/dict-type/update', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  deleteType: (id: number) => request<void>(`/system/dict-type/delete?id=${id}`, {
    method: 'DELETE',
  }),
  
  createData: (data: Omit<DictData, 'id'>) => request<void>('/system/dict-data/create', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  updateData: (data: DictData) => request<void>('/system/dict-data/update', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  deleteData: (id: number) => request<void>(`/system/dict-data/delete?id=${id}`, {
    method: 'DELETE',
  }),
};

export { authApi };

export default {
  auth: authApi,
  user: userApi,
  role: roleApi,
  dept: deptApi,
  dict: dictApi,
}; 