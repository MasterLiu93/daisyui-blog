import { request, mockResponse } from './request';
import { API_ENDPOINTS, API_CONFIG } from './config';

// 菜单查询参数
export interface MenuQueryParams {
  name?: string;
  status?: number;
}

// 菜单类型常量
export const MenuType = {
  DIRECTORY: 'M', // 目录
  MENU: 'C',      // 菜单
  BUTTON: 'F'     // 按钮
} as const;

export type MenuTypeValue = typeof MenuType[keyof typeof MenuType];

// 菜单信息
export interface MenuInfo {
  id: number;
  name: string;
  parentId: number;
  path: string;
  component: string;
  perms: string;
  icon: string;
  visible: boolean;
  status: number;
  sort: number;
  type: MenuTypeValue;
  createTime: string;
  children?: MenuInfo[];
}

// 菜单创建请求
export interface MenuCreateReq {
  name: string;
  parentId: number;
  path: string;
  component?: string;
  perms?: string;
  icon?: string;
  visible: boolean;
  status: number;
  sort: number;
  type: MenuTypeValue;
}

// 菜单更新请求
export interface MenuUpdateReq extends MenuCreateReq {
  id: number;
}

// 菜单简单信息
export interface MenuSimpleInfo {
  id: number;
  name: string;
  parentId: number;
  type: MenuTypeValue;
}

// 模拟数据
const mockMenus: MenuInfo[] = [
  {
    id: 1,
    name: '系统管理',
    parentId: 0,
    path: '/system',
    component: '',
    perms: '',
    icon: 'system',
    visible: true,
    status: 0,
    sort: 1,
    type: MenuType.DIRECTORY,
    createTime: '2023-01-01 00:00:00'
  },
  {
    id: 2,
    name: '用户管理',
    parentId: 1,
    path: 'user',
    component: 'system/user/index',
    perms: 'system:user:list',
    icon: 'user',
    visible: true,
    status: 0,
    sort: 1,
    type: MenuType.MENU,
    createTime: '2023-01-01 00:00:00'
  },
  {
    id: 3,
    name: '角色管理',
    parentId: 1,
    path: 'role',
    component: 'system/role/index',
    perms: 'system:role:list',
    icon: 'peoples',
    visible: true,
    status: 0,
    sort: 2,
    type: MenuType.MENU,
    createTime: '2023-01-01 00:00:00'
  },
  {
    id: 4,
    name: '菜单管理',
    parentId: 1,
    path: 'menu',
    component: 'system/menu/index',
    perms: 'system:menu:list',
    icon: 'tree-table',
    visible: true,
    status: 0,
    sort: 3,
    type: MenuType.MENU,
    createTime: '2023-01-01 00:00:00'
  },
  {
    id: 5,
    name: '部门管理',
    parentId: 1,
    path: 'dept',
    component: 'system/dept/index',
    perms: 'system:dept:list',
    icon: 'tree',
    visible: true,
    status: 0,
    sort: 4,
    type: MenuType.MENU,
    createTime: '2023-01-01 00:00:00'
  },
  {
    id: 6,
    name: '用户查询',
    parentId: 2,
    path: '',
    component: '',
    perms: 'system:user:query',
    icon: '',
    visible: true,
    status: 0,
    sort: 1,
    type: MenuType.BUTTON,
    createTime: '2023-01-01 00:00:00'
  },
  {
    id: 7,
    name: '用户新增',
    parentId: 2,
    path: '',
    component: '',
    perms: 'system:user:add',
    icon: '',
    visible: true,
    status: 0,
    sort: 2,
    type: MenuType.BUTTON,
    createTime: '2023-01-01 00:00:00'
  }
];

export const menuApi = {
  // 获取菜单列表
  getList: async (params: MenuQueryParams): Promise<MenuInfo[]> => {
    if (API_CONFIG.useMock) {
      let result = [...mockMenus];
      
      // 按名称筛选
      if (params.name) {
        result = result.filter(menu => menu.name.includes(params.name!));
      }
      
      // 按状态筛选
      if (params.status !== undefined) {
        result = result.filter(menu => menu.status === params.status);
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
    
    return request<MenuInfo[]>(`${API_ENDPOINTS.menu.list}?${queryParams.toString()}`, {
      method: 'GET'
    });
  },
  
  // 获取菜单详情
  getInfo: async (id: number): Promise<MenuInfo> => {
    if (API_CONFIG.useMock) {
      const menu = mockMenus.find(m => m.id === id);
      if (!menu) {
        throw new Error('Menu not found');
      }
      return mockResponse(menu);
    }
    
    return request<MenuInfo>(`${API_ENDPOINTS.menu.get}?id=${id}`, {
      method: 'GET'
    });
  },
  
  // 创建菜单
  createMenu: async (data: MenuCreateReq): Promise<number> => {
    if (API_CONFIG.useMock) {
      const newId = Math.max(...mockMenus.map(m => m.id)) + 1;
      const newMenu: MenuInfo = {
        ...data,
        id: newId,
        component: data.component || '',
        perms: data.perms || '',
        icon: data.icon || '',
        createTime: new Date().toISOString()
      };
      mockMenus.push(newMenu);
      return mockResponse(newId);
    }
    
    return request<number>(API_ENDPOINTS.menu.create, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
  
  // 更新菜单
  updateMenu: async (data: MenuUpdateReq): Promise<boolean> => {
    if (API_CONFIG.useMock) {
      const index = mockMenus.findIndex(m => m.id === data.id);
      if (index === -1) {
        throw new Error('Menu not found');
      }
      mockMenus[index] = {
        ...mockMenus[index],
        ...data,
        component: data.component || mockMenus[index].component,
        perms: data.perms || mockMenus[index].perms,
        icon: data.icon || mockMenus[index].icon
      };
      return mockResponse(true);
    }
    
    return request<boolean>(API_ENDPOINTS.menu.update, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },
  
  // 删除菜单
  deleteMenu: async (id: number): Promise<boolean> => {
    if (API_CONFIG.useMock) {
      // 检查是否有子菜单
      const hasChildren = mockMenus.some(m => m.parentId === id);
      if (hasChildren) {
        throw new Error('Cannot delete menu with children');
      }
      
      const index = mockMenus.findIndex(m => m.id === id);
      if (index === -1) {
        throw new Error('Menu not found');
      }
      mockMenus.splice(index, 1);
      return mockResponse(true);
    }
    
    return request<boolean>(`${API_ENDPOINTS.menu.delete}?id=${id}`, {
      method: 'DELETE'
    });
  },
  
  // 获取菜单简单列表(下拉选择用)
  getSimpleList: async (): Promise<MenuSimpleInfo[]> => {
    if (API_CONFIG.useMock) {
      return mockResponse(mockMenus.map(m => ({
        id: m.id,
        name: m.name,
        parentId: m.parentId,
        type: m.type
      })));
    }
    
    return request<MenuSimpleInfo[]>(API_ENDPOINTS.menu.listSimple, {
      method: 'GET'
    });
  },
  
  // 构建菜单树
  buildMenuTree: (menus: MenuInfo[]): MenuInfo[] => {
    const menuMap: Record<number, MenuInfo> = {};
    const result: MenuInfo[] = [];

    // 第一步：创建映射
    menus.forEach(menu => {
      menuMap[menu.id] = { ...menu, children: [] };
    });

    // 第二步：构建树
    menus.forEach(menu => {
      const node = menuMap[menu.id];
      if (menu.parentId === 0) {
        result.push(node);
      } else {
        const parent = menuMap[menu.parentId];
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(node);
        }
      }
    });

    return result;
  }
};

export default menuApi; 