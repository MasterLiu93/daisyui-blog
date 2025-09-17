import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { roleApi } from '../../api/system';
import type { Role } from '../../api/system';
import { useTranslation } from 'react-i18next';

const Roles = () => {
  const { t } = useTranslation();
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Role | null;
    direction: 'ascending' | 'descending' | null;
  }>({
    key: null,
    direction: null
  });

  // Simulate fetching roles from backend
  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        // In a real app, we would use the actual API
        // const response = await roleApi.getPage({
        //   pageNo: currentPage,
        //   pageSize: itemsPerPage,
        //   name: searchTerm || undefined,
        // });
        // setRoles(response.list);
        // setTotalItems(response.total);

        // Mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockRoles: Role[] = [
          { id: 1, name: '超级管理员', code: 'super_admin', sort: 1, status: 0, type: 1, createTime: '2023-01-01 00:00:00' },
          { id: 2, name: '管理员', code: 'admin', sort: 2, status: 0, type: 1, createTime: '2023-01-02 00:00:00' },
          { id: 3, name: '部门经理', code: 'manager', sort: 3, status: 0, type: 1, createTime: '2023-01-03 00:00:00' },
          { id: 4, name: '编辑', code: 'editor', sort: 4, status: 0, type: 1, createTime: '2023-01-04 00:00:00' },
          { id: 5, name: '普通用户', code: 'user', sort: 5, status: 0, type: 1, createTime: '2023-01-05 00:00:00' },
          { id: 6, name: '访客', code: 'guest', sort: 6, status: 1, type: 1, createTime: '2023-01-06 00:00:00' },
        ];
        
        setRoles(mockRoles);
        setTotalItems(mockRoles.length);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [currentPage, itemsPerPage, searchTerm]);

  // 处理排序
  const requestSort = (key: keyof Role) => {
    let direction: 'ascending' | 'descending' | null = 'ascending';
    
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = null;
    }
    
    setSortConfig({ key, direction });
  };
  
  // 排序函数
  const sortedRoles = () => {
    let sortableRoles = [...roles];
    
    if (sortConfig.key && sortConfig.direction) {
      sortableRoles.sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return sortableRoles;
  };

  // Filter roles based on search term and status
  const filteredRoles = () => {
    return sortedRoles().filter(role => {
      // 搜索条件
      const searchMatch = 
        role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.code.toLowerCase().includes(searchTerm.toLowerCase());
      
      // 状态筛选
      const statusMatch = statusFilter === 'all' || role.status.toString() === statusFilter;
      
      return searchMatch && statusMatch;
    });
  };

  // 分页函数
  const paginatedRoles = () => {
    const filtered = filteredRoles();
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filtered.slice(startIndex, startIndex + itemsPerPage);
  };

  // 计算总页数
  const totalPages = Math.ceil(filteredRoles().length / itemsPerPage);

  // 处理全选
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRoles(paginatedRoles().map(role => role.id));
    } else {
      setSelectedRoles([]);
    }
  };

  // 处理单选
  const handleSelectRole = (roleId: number) => {
    if (selectedRoles.includes(roleId)) {
      setSelectedRoles(selectedRoles.filter(id => id !== roleId));
    } else {
      setSelectedRoles([...selectedRoles, roleId]);
    }
  };

  // 处理批量删除
  const handleBatchDelete = () => {
    if (window.confirm(t('system.roles.confirmBatchDelete', { count: selectedRoles.length }))) {
      // 在实际应用中，这里会调用API进行批量删除
      setRoles(roles.filter(role => !selectedRoles.includes(role.id)));
      setSelectedRoles([]);
    }
  };

  // 处理查询
  const handleSearch = () => {
    setCurrentPage(1);
    // 在实际应用中，这里会调用API进行查询
    console.log('查询条件:', {
      searchTerm,
      statusFilter
    });
  };

  // 处理重置
  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setCurrentPage(1);
    setSortConfig({
      key: null,
      direction: null
    });
  };

  // 渲染排序图标
  const renderSortIcon = (key: keyof Role) => {
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

  // Handle delete role
  const handleDeleteRole = (roleId: number) => {
    if (window.confirm(t('system.roles.confirmDelete'))) {
      // In a real app, we would call the API to delete the role
      setRoles(roles.filter(role => role.id !== roleId));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/70">{t('system.messages.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{t('system.roles.title')}</h1>
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link to="/system/dashboard" className="text-base-content/70">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {t('system.layout.home')}
                </Link>
              </li>
              <li>
                <span className="text-base-content/90 font-medium">{t('system.roles.title')}</span>
              </li>
            </ul>
          </div>
        </div>
        <Link to="/system/roles/create" className="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          {t('system.roles.actions.add')}
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
                  <span className="label-text font-medium w-20">{t('system.roles.columns.search')}</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder={t('system.roles.placeholder.nameOrCode')}
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
                  <span className="label-text font-medium w-20">{t('system.roles.columns.status')}</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">{t('system.roles.allStatus')}</option>
                  <option value="0">{t('system.status.active')}</option>
                  <option value="1">{t('system.status.inactive')}</option>
                </select>
              </div>
              
              <div className="form-control">
                <label className="label justify-start pb-1">
                  <span className="label-text font-medium w-20">{t('system.actions.title')}</span>
                </label>
                <div className="flex gap-2">
                  <button 
                    className="btn btn-primary flex-1"
                    onClick={handleSearch}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {t('system.actions.search')}
                  </button>
                  <button 
                    className="btn btn-outline flex-1"
                    onClick={handleReset}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {t('system.actions.reset')}
                  </button>
                </div>
              </div>
            </div>
            
            {/* 操作按钮 */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {selectedRoles.length > 0 && (
                  <button
                    className="btn btn-sm btn-error"
                    onClick={handleBatchDelete}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    {t('system.actions.batchDelete')} ({selectedRoles.length})
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* 表格 */}
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr className="bg-base-200">
                <th className="w-16">
                  <label>
                    <input 
                      type="checkbox" 
                      className="checkbox checkbox-sm" 
                      checked={selectedRoles.length > 0 && selectedRoles.length === paginatedRoles().length}
                      onChange={handleSelectAll}
                    />
                  </label>
                </th>
                <th className="cursor-pointer" onClick={() => requestSort('name')}>
                  <div className="flex items-center gap-1">
                    {t('system.roles.columns.name')}
                    {renderSortIcon('name')}
                  </div>
                </th>
                <th className="cursor-pointer" onClick={() => requestSort('code')}>
                  <div className="flex items-center gap-1">
                    {t('system.roles.columns.code')}
                    {renderSortIcon('code')}
                  </div>
                </th>
                <th className="cursor-pointer" onClick={() => requestSort('sort')}>
                  <div className="flex items-center gap-1">
                    {t('system.roles.columns.order')}
                    {renderSortIcon('sort')}
                  </div>
                </th>
                <th className="cursor-pointer" onClick={() => requestSort('status')}>
                  <div className="flex items-center gap-1">
                    {t('system.roles.columns.status')}
                    {renderSortIcon('status')}
                  </div>
                </th>
                <th className="cursor-pointer" onClick={() => requestSort('createTime')}>
                  <div className="flex items-center gap-1">
                    {t('system.roles.columns.createdTime')}
                    {renderSortIcon('createTime')}
                  </div>
                </th>
                <th>{t('system.roles.columns.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRoles().length > 0 ? (
                paginatedRoles().map(role => (
                  <tr key={role.id}>
                    <td>
                      <label>
                        <input 
                          type="checkbox" 
                          className="checkbox checkbox-sm" 
                          checked={selectedRoles.includes(role.id)}
                          onChange={() => handleSelectRole(role.id)}
                        />
                      </label>
                    </td>
                    <td className="font-medium">{role.name}</td>
                    <td>{role.code}</td>
                    <td>{role.sort}</td>
                    <td>
                      <div className={`badge badge-sm badge-outline py-2 px-3 font-medium border-2 whitespace-nowrap 
                        ${role.status === 0 ? 'badge-success text-success' : 'badge-error text-error'}`}>
                        {role.status === 0 ? t('system.status.active') : t('system.status.inactive')}
                      </div>
                    </td>
                    <td>{role.createTime}</td>
                    <td>
                      <div className="flex gap-2">
                        <Link to={`/system/roles/${role.id}/edit`} className="btn btn-circle btn-sm btn-ghost btn-info tooltip" data-tip={t('system.actions.edit')}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </Link>
                        <button 
                          className="btn btn-circle btn-sm btn-ghost btn-error tooltip" 
                          data-tip={t('system.actions.delete')}
                          onClick={() => handleDeleteRole(role.id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-10">
                    <div className="flex flex-col items-center justify-center text-base-content/70">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-lg font-medium">{t('system.roles.noRolesFound')}</p>
                      <button 
                        className="btn btn-sm btn-outline mt-4"
                        onClick={handleReset}
                      >
                        {t('system.actions.reset')}
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* 分页 */}
        {paginatedRoles().length > 0 && (
          <div className="flex flex-wrap items-center justify-between p-4 border-t border-base-200">
            <div className="text-sm text-base-content/70">
              显示第 {((currentPage - 1) * itemsPerPage) + 1} 至 {Math.min(currentPage * itemsPerPage, filteredRoles().length)} 条，共 {filteredRoles().length} 条
            </div>
            <div className="flex items-center space-x-2 mt-3 sm:mt-0">
              <button
                className="btn btn-sm btn-outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
              >
                {t('system.pagination.firstPage')}
              </button>
              <button
                className="btn btn-sm btn-outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                {t('system.pagination.prevPage')}
              </button>
              <div className="join">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                      key={i}
                      className={`join-item btn btn-sm ${pageNum === currentPage ? 'btn-active' : ''}`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                className="btn btn-sm btn-outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                {t('system.pagination.nextPage')}
              </button>
              <button
                className="btn btn-sm btn-outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
              >
                {t('system.pagination.lastPage')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Roles; 