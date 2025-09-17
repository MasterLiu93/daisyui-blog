// API configuration
export const API_CONFIG = {
  // Base URL for API requests
  baseUrl: process.env.NODE_ENV === 'production' 
    ? '/api' 
    : 'http://localhost:8080/api',
  
  // Request timeout in milliseconds
  timeout: 10000,
  
  // Whether to use mock data in development
  useMock: process.env.NODE_ENV === 'development',
  
  // Headers to include with all requests
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// API endpoints for udao-boot-mini
export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    getUserInfo: '/auth/get-permission-info',
    refreshToken: '/auth/refresh-token',
    register: '/auth/register',
    smsLogin: '/auth/sms-login',
    sendSmsCode: '/auth/send-sms-code',
    resetPassword: '/auth/reset-password',
    socialAuthRedirect: '/auth/social-auth-redirect',
    socialLogin: '/auth/social-login',
  },
  user: {
    page: '/system/user/page',
    get: '/system/user/get',
    create: '/system/user/create',
    update: '/system/user/update',
    delete: '/system/user/delete',
    export: '/system/user/export',
    import: '/system/user/import',
    importTemplate: '/system/user/import-template',
    updateStatus: '/system/user/update-status',
    updatePassword: '/system/user/update-password',
  },
  role: {
    page: '/system/role/page',
    get: '/system/role/get',
    create: '/system/role/create',
    update: '/system/role/update',
    delete: '/system/role/delete',
    export: '/system/role/export',
    list: '/system/role/list',
    updateStatus: '/system/role/update-status',
  },
  dept: {
    list: '/system/dept/list',
    get: '/system/dept/get',
    create: '/system/dept/create',
    update: '/system/dept/update',
    delete: '/system/dept/delete',
    listSimple: '/system/dept/list-all-simple',
  },
  dict: {
    typeList: '/system/dict-type/list',
    typeGet: '/system/dict-type/get',
    typeCreate: '/system/dict-type/create',
    typeUpdate: '/system/dict-type/update',
    typeDelete: '/system/dict-type/delete',
    typeExport: '/system/dict-type/export',
    dataList: '/system/dict-data/list',
    dataGet: '/system/dict-data/get',
    dataCreate: '/system/dict-data/create',
    dataUpdate: '/system/dict-data/update',
    dataDelete: '/system/dict-data/delete',
    dataExport: '/system/dict-data/export',
    dataSimple: '/system/dict-data/list-all-simple',
  },
  menu: {
    list: '/system/menu/list',
    get: '/system/menu/get',
    create: '/system/menu/create',
    update: '/system/menu/update',
    delete: '/system/menu/delete',
    listSimple: '/system/menu/list-all-simple',
  },
  post: {
    list: '/system/post/list',
    get: '/system/post/get',
    create: '/system/post/create',
    update: '/system/post/update',
    delete: '/system/post/delete',
    export: '/system/post/export',
    listSimple: '/system/post/list-all-simple',
  },
  tenant: {
    list: '/system/tenant/page',
    get: '/system/tenant/get',
    create: '/system/tenant/create',
    update: '/system/tenant/update',
    delete: '/system/tenant/delete',
    export: '/system/tenant/export',
  },
  profile: {
    getProfile: '/system/profile/get',
    updateProfile: '/system/profile/update',
    updatePassword: '/system/profile/update-password',
    updateAvatar: '/system/profile/update-avatar',
  },
}; 