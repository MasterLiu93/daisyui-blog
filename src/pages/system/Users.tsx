import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// 模拟数据
interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'locked';
  lastLogin: string;
}

const Users = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User | null;
    direction: 'ascending' | 'descending' | null;
  }>({
    key: null,
    direction: null
  });
  
  const itemsPerPage = 10;
  
  // 模拟加载数据
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 模拟用户数据
      const mockUsers: User[] = [
        { id: 1, username: 'admin', name: '管理员', email: 'admin@example.com', role: 'Admin', status: 'active', lastLogin: '2023-10-15 08:30:45' },
        { id: 2, username: 'johndoe', name: '张三', email: 'john.doe@example.com', role: 'Manager', status: 'active', lastLogin: '2023-10-14 14:22:31' },
        { id: 3, username: 'janedoe', name: '李四', email: 'jane.doe@example.com', role: 'Editor', status: 'active', lastLogin: '2023-10-13 09:45:12' },
        { id: 4, username: 'bobsmith', name: '王五', email: 'bob.smith@example.com', role: 'User', status: 'inactive', lastLogin: '2023-09-28 16:08:55' },
        { id: 5, username: 'alicejones', name: '赵六', email: 'alice.jones@example.com', role: 'User', status: 'active', lastLogin: '2023-10-15 10:15:22' },
        { id: 6, username: 'mikebrown', name: '钱七', email: 'mike.brown@example.com', role: 'Editor', status: 'locked', lastLogin: '2023-10-10 11:30:40' },
        { id: 7, username: 'sarahlee', name: '孙八', email: 'sarah.lee@example.com', role: 'Manager', status: 'active', lastLogin: '2023-10-14 13:25:18' },
        { id: 8, username: 'tomwilson', name: '周九', email: 'tom.wilson@example.com', role: 'User', status: 'active', lastLogin: '2023-10-12 15:42:37' },
        { id: 9, username: 'emilyclark', name: '吴十', email: 'emily.clark@example.com', role: 'User', status: 'inactive', lastLogin: '2023-09-30 09:18:25' },
        { id: 10, username: 'davidmiller', name: '郑十一', email: 'david.miller@example.com', role: 'User', status: 'active', lastLogin: '2023-10-11 08:54:19' },
        { id: 11, username: 'oliviawhite', name: '刘十二', email: 'olivia.white@example.com', role: 'Editor', status: 'active', lastLogin: '2023-10-09 16:32:47' },
        { id: 12, username: 'jamesjohnson', name: '陈十三', email: 'james.johnson@example.com', role: 'User', status: 'locked', lastLogin: '2023-10-08 11:15:33' },
        { id: 13, username: 'sophiamartin', name: '杨十四', email: 'sophia.martin@example.com', role: 'Manager', status: 'active', lastLogin: '2023-10-07 14:20:55' },
        { id: 14, username: 'williamgarcia', name: '黄十五', email: 'william.garcia@example.com', role: 'User', status: 'inactive', lastLogin: '2023-10-06 10:05:12' },
        { id: 15, username: 'emmawilson', name: '赵十六', email: 'emma.wilson@example.com', role: 'User', status: 'active', lastLogin: '2023-10-05 09:48:36' }
      ];
      
      setUsers(mockUsers);
      setIsLoading(false);
    };
    
    fetchUsers();
  }, []);
  
  // 处理排序
  const requestSort = (key: keyof User) => {
    let direction: 'ascending' | 'descending' | null = 'ascending';
    
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = null;
    }
    
    setSortConfig({ key, direction });
  };
  
  // 排序函数
  const sortedUsers = () => {
    let sortableUsers = [...users];
    
    if (sortConfig.key && sortConfig.direction) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return sortableUsers;
  };
  
  // 筛选函数
  const filteredUsers = () => {
    return sortedUsers().filter(user => {
      // 搜索条件
      const searchMatch = 
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      // 状态筛选
      const statusMatch = statusFilter === 'all' || user.status === statusFilter;
      
      // 角色筛选
      const roleMatch = roleFilter === 'all' || user.role === roleFilter;

      // 部门筛选
      const departmentMatch = departmentFilter === 'all' || user.id.toString() === departmentFilter;

      // 创建时间筛选
      const userDate = new Date(user.lastLogin);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      const dateMatch = (!start || userDate >= start) && (!end || userDate <= end);
      
      return searchMatch && statusMatch && roleMatch && departmentMatch && dateMatch;
    });
  };
  
  // 分页函数
  const paginatedUsers = () => {
    const filtered = filteredUsers();
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filtered.slice(startIndex, startIndex + itemsPerPage);
  };
  
  // 计算总页数
  const totalPages = Math.ceil(filteredUsers().length / itemsPerPage);
  
  // 处理全选
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedUsers(paginatedUsers().map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };
  
  // 处理单选
  const handleSelectUser = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };
  
  // 处理批量删除
  const handleBatchDelete = () => {
    if (window.confirm(t('system.users.batchDeleteConfirm', { count: selectedUsers.length }))) {
      // 在实际应用中，这里会调用API进行批量删除
      setUsers(users.filter(user => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
    }
  };

  // 处理查询
  const handleSearch = () => {
    setCurrentPage(1);
    // 在实际应用中，这里会调用API进行查询
    console.log('查询条件:', {
      searchTerm,
      statusFilter,
      roleFilter,
      departmentFilter,
      startDate,
      endDate
    });
  };
  
  // 处理重置
  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setRoleFilter('all');
    setDepartmentFilter('all');
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
    setSortConfig({
      key: null,
      direction: null
    });
  };
  
  // 渲染排序图标
  const renderSortIcon = (key: keyof User) => {
    if (sortConfig.key !== key) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    if (sortConfig.direction === 'ascending') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
        </svg>
      );
    }
    
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    );
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/70">{t('common.loading')}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{t('system.users.title')}</h1>
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link to="/system/dashboard" className="text-base-content/70">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {t('common.home')}
                </Link>
              </li>
              <li>
                <span className="text-base-content/90 font-medium">{t('system.users.title')}</span>
              </li>
            </ul>
          </div>
        </div>
        <Link to="/system/users/create" className="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          {t('system.users.addUser')}
        </Link>
      </div>
      
      <div className="bg-base-100 rounded-lg shadow-md">
        {/* 表格工具栏 */}
        <div className="p-4 border-b border-base-200">
          <div className="grid grid-cols-1 gap-y-4">
            {/* 检索条件 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label justify-start pb-1">
                  <span className="label-text font-medium w-20">{t('system.users.search')}</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={`${t('system.users.username')}/${t('system.users.name')}/${t('system.users.email')}`}
                    className="input input-bordered w-full pr-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="absolute inset-y-0 right-0 flex items-center px-3 bg-transparent">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="form-control">
                <label className="label justify-start pb-1">
                  <span className="label-text font-medium w-20">{t('system.users.status')}</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">{t('system.users.allStatus')}</option>
                  <option value="active">{t('system.users.active')}</option>
                  <option value="inactive">{t('system.users.inactive')}</option>
                  <option value="locked">{t('system.users.locked')}</option>
                </select>
              </div>
              
              <div className="form-control">
                <label className="label justify-start pb-1">
                  <span className="label-text font-medium w-20">{t('system.users.role')}</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="all">{t('system.users.allRoles')}</option>
                  <option value="Admin">{t('system.roles.admin')}</option>
                  <option value="Manager">{t('system.roles.manager')}</option>
                  <option value="Editor">{t('system.roles.editor')}</option>
                  <option value="User">{t('system.roles.user')}</option>
                </select>
              </div>
              
              <div className="form-control">
                <label className="label justify-start pb-1">
                  <span className="label-text font-medium w-20">{t('system.users.department')}</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                >
                  <option value="all">{t('system.users.allDepartments')}</option>
                  <option value="1">{t('system.departments.headquarters')}</option>
                  <option value="2">{t('system.departments.technology')}</option>
                  <option value="3">{t('system.departments.marketing')}</option>
                  <option value="4">{t('system.departments.sales')}</option>
                </select>
              </div>
              
              <div className="form-control">
                <label className="label justify-start pb-1">
                  <span className="label-text font-medium w-20">{t('system.users.createTime')}</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <span className="flex items-center">{t('common.to')}</span>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-control">
                <label className="label justify-start pb-1">
                  <span className="label-text font-medium w-20">{t('system.users.actions')}</span>
                </label>
                <div className="flex gap-2">
                  <button 
                    className="btn btn-primary flex-1"
                    onClick={handleSearch}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {t('system.users.searchBtn')}
                  </button>
                  <button 
                    className="btn btn-outline flex-1"
                    onClick={handleReset}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {t('system.users.resetBtn')}
                  </button>
                </div>
              </div>
            </div>
            
            {/* 操作按钮 */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {selectedUsers.length > 0 && (
                  <button
                    className="btn btn-sm btn-error"
                    onClick={handleBatchDelete}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    {t('common.batchDelete')} ({selectedUsers.length})
                  </button>
                )}
                
                <button className="btn btn-sm btn-outline">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {t('common.import')}
                </button>
                
                <button className="btn btn-sm btn-outline">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {t('common.export')}
                </button>
                
                <button className="btn btn-sm btn-outline" onClick={() => window.location.reload()}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {t('common.refresh')}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* 用户表格 */}
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-base-200/50 text-base-content">
                <th className="w-10">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={selectedUsers.length === paginatedUsers().length && paginatedUsers().length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="cursor-pointer" onClick={() => requestSort('id')}>
                  <div className="flex items-center">
                    <span>ID</span>
                    <span className="ml-1">{renderSortIcon('id')}</span>
                  </div>
                </th>
                <th className="cursor-pointer" onClick={() => requestSort('username')}>
                  <div className="flex items-center">
                    <span>{t('system.users.username')}</span>
                    <span className="ml-1">{renderSortIcon('username')}</span>
                  </div>
                </th>
                <th className="cursor-pointer" onClick={() => requestSort('name')}>
                  <div className="flex items-center">
                    <span>{t('system.users.name')}</span>
                    <span className="ml-1">{renderSortIcon('name')}</span>
                  </div>
                </th>
                <th className="cursor-pointer" onClick={() => requestSort('email')}>
                  <div className="flex items-center">
                    <span>{t('system.users.email')}</span>
                    <span className="ml-1">{renderSortIcon('email')}</span>
                  </div>
                </th>
                <th className="cursor-pointer" onClick={() => requestSort('role')}>
                  <div className="flex items-center">
                    <span>{t('system.users.role')}</span>
                    <span className="ml-1">{renderSortIcon('role')}</span>
                  </div>
                </th>
                <th className="cursor-pointer" onClick={() => requestSort('status')}>
                  <div className="flex items-center">
                    <span>{t('system.users.status')}</span>
                    <span className="ml-1">{renderSortIcon('status')}</span>
                  </div>
                </th>
                <th className="cursor-pointer" onClick={() => requestSort('lastLogin')}>
                  <div className="flex items-center">
                    <span>{t('system.users.lastLogin')}</span>
                    <span className="ml-1">{renderSortIcon('lastLogin')}</span>
                  </div>
                </th>
                <th className="text-center">{t('system.users.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers().length > 0 ? (
                paginatedUsers().map(user => (
                  <tr key={user.id} className="hover">
                    <td>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                      />
                    </td>
                    <td>{user.id}</td>
                    <td className="font-medium">{user.username}</td>
                    <td>{user.name}</td>
                    <td className="text-sm">{user.email}</td>
                    <td>
                      <span className={`
                        px-2 py-1 text-xs font-medium rounded-full
                        ${user.role === 'Admin' ? 'bg-primary/10 text-primary' : ''}
                        ${user.role === 'Manager' ? 'bg-secondary/10 text-secondary' : ''}
                        ${user.role === 'Editor' ? 'bg-accent/10 text-accent' : ''}
                        ${user.role === 'User' ? 'bg-base-content/10' : ''}
                      `}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      {user.status === 'active' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/20 text-success">
                          <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-success"></span>
                          {t('system.users.active')}
                        </span>
                      )}
                      {user.status === 'inactive' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning/20 text-warning">
                          <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-warning"></span>
                          {t('system.users.inactive')}
                        </span>
                      )}
                      {user.status === 'locked' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error/20 text-error">
                          <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-error"></span>
                          {t('system.users.locked')}
                        </span>
                      )}
                    </td>
                    <td className="text-sm">{user.lastLogin}</td>
                    <td>
                      <div className="flex items-center justify-center space-x-1">
                        <Link to={`/system/users/${user.id}`} className="btn btn-xs btn-ghost btn-circle" title={t('common.view')}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>
                        <Link to={`/system/users/${user.id}/edit`} className="btn btn-xs btn-ghost btn-circle" title={t('common.edit')}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <button
                          className="btn btn-xs btn-ghost btn-circle"
                          title={t('common.delete')}
                          onClick={() => {
                            if (window.confirm(t('system.users.deleteConfirm', { name: user.name }))) {
                              setUsers(users.filter(u => u.id !== user.id));
                            }
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-8">
                    <div className="flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-base-content/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="mt-4 text-base-content/60 font-medium">{t('system.users.noUsersFound')}</p>
                      <button 
                        className="btn btn-sm btn-outline mt-4"
                        onClick={handleReset}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        {t('common.resetFilters')}
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* 分页 */}
        <div className="p-4 border-t border-base-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-base-content/70">
              {filteredUsers().length > 0 ? (
                `显示 ${(currentPage - 1) * itemsPerPage + 1} 至 ${Math.min(currentPage * itemsPerPage, filteredUsers().length)} 条，共 ${filteredUsers().length} 条`
              ) : (
                `显示 0 至 0 条，共 0 条`
              )}
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
              <button
                  className="btn btn-sm btn-ghost"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
              >
                  首页
              </button>
              <button
                  className="btn btn-sm btn-ghost"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                  上一页
              </button>
                
                <div className="join mx-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // 显示当前页附近的页码
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                        className={`btn btn-sm ${currentPage === pageNum ? 'btn-primary' : 'btn-ghost'}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
                </div>
                
              <button
                  className="btn btn-sm btn-ghost"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                  下一页
              </button>
              <button
                  className="btn btn-sm btn-ghost"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
              >
                  末页
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users; 