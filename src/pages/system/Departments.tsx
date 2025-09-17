import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deptApi } from '../../api/system';
import type { Dept } from '../../api/system';
import DepartmentForm from '../../components/system/DepartmentForm';
import { useTranslation } from 'react-i18next';

interface DeptNode extends Dept {
  children?: DeptNode[];
  expanded?: boolean;
}

const Departments = () => {
  const { t } = useTranslation();
  const [departments, setDepartments] = useState<DeptNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedDepts, setSelectedDepts] = useState<number[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editDeptId, setEditDeptId] = useState<number | undefined>(undefined);

  // Simulate fetching departments from backend
  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        // In a real app, we would use the actual API
        // const response = await deptApi.getList({
        //   name: searchTerm || undefined,
        // });
        // const deptTree = buildDeptTree(response);
        // setDepartments(deptTree);

        // Mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockDepts: Dept[] = [
          { id: 1, name: '总公司', parentId: 0, sort: 1, leaderUserId: 1, phone: '123-456-7890', email: 'hq@example.com', status: 0, createTime: '2023-01-01 00:00:00' },
          { id: 2, name: '技术部', parentId: 1, sort: 1, leaderUserId: 2, phone: '123-456-7891', email: 'it@example.com', status: 0, createTime: '2023-01-02 00:00:00' },
          { id: 3, name: '人力资源部', parentId: 1, sort: 2, leaderUserId: 3, phone: '123-456-7892', email: 'hr@example.com', status: 0, createTime: '2023-01-03 00:00:00' },
          { id: 4, name: '财务部', parentId: 1, sort: 3, leaderUserId: 4, phone: '123-456-7893', email: 'finance@example.com', status: 0, createTime: '2023-01-04 00:00:00' },
          { id: 5, name: '软件开发组', parentId: 2, sort: 1, leaderUserId: 5, phone: '123-456-7894', email: 'dev@example.com', status: 0, createTime: '2023-01-05 00:00:00' },
          { id: 6, name: 'IT支持组', parentId: 2, sort: 2, leaderUserId: 6, phone: '123-456-7895', email: 'support@example.com', status: 0, createTime: '2023-01-06 00:00:00' },
          { id: 7, name: '前端团队', parentId: 5, sort: 1, leaderUserId: 7, phone: '123-456-7896', email: 'frontend@example.com', status: 0, createTime: '2023-01-07 00:00:00' },
          { id: 8, name: '后端团队', parentId: 5, sort: 2, leaderUserId: 8, phone: '123-456-7897', email: 'backend@example.com', status: 0, createTime: '2023-01-08 00:00:00' },
        ];
        
        const deptTree = buildDeptTree(mockDepts);
        setDepartments(deptTree);
      } catch (error) {
        console.error('Failed to fetch departments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, [searchTerm]);

  // Build department tree from flat list
  const buildDeptTree = (depts: Dept[]): DeptNode[] => {
    const deptMap: Record<number, DeptNode> = {};
    const result: DeptNode[] = [];

    // First pass: create nodes
    depts.forEach(dept => {
      deptMap[dept.id] = { ...dept, children: [], expanded: true };
    });

    // Second pass: build tree
    depts.forEach(dept => {
      const node = deptMap[dept.id];
      if (dept.parentId === 0) {
        result.push(node);
      } else {
        const parent = deptMap[dept.parentId];
        if (parent) {
          parent.children?.push(node);
        }
      }
    });

    return result;
  };

  // Toggle expand/collapse
  const toggleExpand = (dept: DeptNode) => {
    dept.expanded = !dept.expanded;
    setDepartments([...departments]);
  };

  // Get status text
  const getStatusText = (status: number) => {
    return status === 0 ? t('system.dept.status.active') : t('system.dept.status.inactive');
  };

  // Get status badge class
  const getStatusBadgeClass = (status: number) => {
    return status === 0 ? 'badge-success text-success' : 'badge-error text-error';
  };

  // Handle create department
  const handleCreateDepartment = () => {
    setEditDeptId(undefined);
    setShowForm(true);
  };

  // Handle edit department
  const handleEditDepartment = (deptId: number) => {
    setEditDeptId(deptId);
    setShowForm(true);
  };

  // Handle form success
  const handleFormSuccess = () => {
    setShowForm(false);
    setEditDeptId(undefined);
    // In a real app, we would refresh the department list here
  };

  // Handle form cancel
  const handleFormCancel = () => {
    setShowForm(false);
    setEditDeptId(undefined);
  };

  // Handle delete department
  const handleDeleteDepartment = (deptId: number) => {
    if (window.confirm(t('system.dept.messages.confirmDelete'))) {
      // In a real app, we would call the API to delete the department
      // For now, just filter the department out of the list
      const filterDeptTree = (nodes: DeptNode[]): DeptNode[] => {
        return nodes
          .filter(node => node.id !== deptId)
          .map(node => ({
            ...node,
            children: node.children ? filterDeptTree(node.children) : []
          }));
      };
      
      setDepartments(filterDeptTree(departments));
    }
  };

  // Flatten department tree to array
  const flattenDeptTree = (depts: DeptNode[]): Dept[] => {
    const result: Dept[] = [];
    
    const flatten = (nodes: DeptNode[]) => {
      nodes.forEach(node => {
        // Extract Dept properties without the children and expanded
        const { children, expanded, ...deptProps } = node;
        result.push(deptProps);
        
        if (children && children.length > 0) {
          flatten(children);
        }
      });
    };
    
    flatten(depts);
    return result;
  };

  // 筛选部门
  const filteredDepartments = () => {
    const filterDeptNode = (node: DeptNode): DeptNode | null => {
      // 搜索条件
      const nameMatch = node.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // 状态筛选
      const statusMatch = statusFilter === 'all' || node.status.toString() === statusFilter;
      
      // 如果当前节点匹配，则返回当前节点（包括所有子节点）
      if (nameMatch && statusMatch) {
        return { ...node, expanded: true };
      }
      
      // 如果当前节点不匹配，检查子节点
      if (node.children && node.children.length > 0) {
        const filteredChildren = node.children
          .map(filterDeptNode)
          .filter((child): child is DeptNode => child !== null);
        
        // 如果有匹配的子节点，则返回当前节点和匹配的子节点
        if (filteredChildren.length > 0) {
          return { ...node, children: filteredChildren, expanded: true };
        }
      }
      
      // 如果当前节点和子节点都不匹配，则返回null
      return null;
    };
    
    return departments
      .map(filterDeptNode)
      .filter((dept): dept is DeptNode => dept !== null);
  };

  // 处理查询
  const handleSearch = () => {
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
  };

  // 处理批量删除
  const handleBatchDelete = () => {
    if (window.confirm(t('system.dept.messages.confirmBatchDelete', { count: selectedDepts.length }))) {
      // 在实际应用中，这里会调用API进行批量删除
      const deleteDeptIds = new Set(selectedDepts);
      
      // 过滤掉被删除的部门及其子部门
      const filterDeptTree = (nodes: DeptNode[]): DeptNode[] => {
        return nodes
          .filter(node => !deleteDeptIds.has(node.id))
          .map(node => ({
            ...node,
            children: node.children ? filterDeptTree(node.children) : []
          }));
      };
      
      setDepartments(filterDeptTree(departments));
      setSelectedDepts([]);
    }
  };

  // If form is showing, render the form
  if (showForm) {
    return (
      <DepartmentForm 
        deptId={editDeptId} 
        onSuccess={handleFormSuccess} 
        onCancel={handleFormCancel} 
      />
    );
  }

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
          <h1 className="text-2xl font-bold">{t('system.dept.title')}</h1>
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
                <span className="text-base-content/90 font-medium">{t('system.dept.title')}</span>
              </li>
            </ul>
          </div>
        </div>
        <Link to="/system/departments/create" className="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          {t('system.dept.actions.addDept')}
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
                  <span className="label-text font-medium w-20">{t('system.dept.columns.name')}</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t('system.dept.placeholder.name')}
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
                  <span className="label-text font-medium w-20">{t('system.dept.columns.status')}</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">{t('system.dept.allStatus')}</option>
                  <option value="0">{t('system.dept.status.active')}</option>
                  <option value="1">{t('system.dept.status.inactive')}</option>
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
                {selectedDepts.length > 0 && (
                  <button
                    className="btn btn-sm btn-error"
                    onClick={handleBatchDelete}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    {t('system.actions.batchDelete')} ({selectedDepts.length})
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* 部门树 */}
        <div className="p-4">
          {filteredDepartments().length > 0 ? (
            <div className="dept-tree">
              {filteredDepartments().map((dept) => {
                // 递归渲染部门节点
                const renderDeptNode = (d: DeptNode, level = 0, isLast = true) => {
                  return (
                    <div key={d.id} className="dept-node">
                      <div className={`dept-row ${level > 0 ? 'has-parent' : ''}`}>
                        {/* 缩进和连接线 */}
                        {level > 0 && (
                          <div className="dept-indent">
                            {Array(level).fill(0).map((_, i) => (
                              <div key={i} className="dept-indent-line"></div>
                            ))}
                            <div className={`dept-branch ${isLast ? 'is-last' : ''}`}></div>
                          </div>
                        )}
                        
                        {/* 部门内容 */}
                        <div className="dept-content">
                          {/* 展开/折叠按钮 */}
                          <div className="dept-toggle">
                            {d.children && d.children.length > 0 ? (
                              <button 
                                className="btn btn-circle btn-xs btn-ghost" 
                                onClick={() => toggleExpand(d)}
                              >
                                {d.expanded ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                  </svg>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                  </svg>
                                )}
                              </button>
                            ) : (
                              <div className="dept-leaf">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}
                          </div>
                          
                          {/* 部门图标 */}
                          <div className="dept-icon">
                            {d.parentId === 0 ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            )}
                          </div>
                          
                          {/* 部门信息 */}
                          <div className="dept-info">
                            <div className="dept-name">{d.name}</div>
                            <div className="dept-contact">
                              <span className="dept-phone">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                {d.phone}
                              </span>
                              <span className="dept-email">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {d.email}
                              </span>
                              <span className="dept-create-time">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {new Date(d.createTime).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* 状态和操作 */}
                        <div className="dept-actions">
                          <div className={`dept-status ${d.status === 0 ? 'status-active' : 'status-inactive'}`}>
                            <span className="status-dot"></span>
                            <span className="status-text">{getStatusText(d.status)}</span>
                          </div>
                          <div className="flex gap-2">
                            <Link to={`/system/departments/${d.id}/edit`} className="btn btn-circle btn-sm btn-ghost btn-info tooltip" data-tip={t('system.actions.edit')}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </Link>
                            <button 
                              className="btn btn-circle btn-sm btn-ghost btn-error tooltip" 
                              data-tip={t('system.actions.delete')}
                              onClick={() => handleDeleteDepartment(d.id)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* 子部门 */}
                      {d.expanded && d.children && d.children.length > 0 && (
                        <div className="dept-children">
                          {d.children.map((child, index) => 
                            renderDeptNode(child, level + 1, index === d.children!.length - 1)
                          )}
                        </div>
                      )}
                    </div>
                  );
                };
                
                return renderDeptNode(dept);
              })}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="flex flex-col items-center justify-center text-base-content/70">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-medium">{t('system.dept.noDeptFound')}</p>
                <button 
                  className="btn btn-sm btn-outline mt-4"
                  onClick={handleReset}
                >
                  {t('system.dept.resetFilter')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Departments; 