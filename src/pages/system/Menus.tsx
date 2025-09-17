import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { menuApi, MenuType } from '../../api/system/menu';
import type { MenuInfo } from '../../api/system/menu';
import MenuForm from '../../components/system/MenuForm';
import { useTranslation } from 'react-i18next';

interface MenuNode extends MenuInfo {
  expanded?: boolean;
}

const Menus = () => {
  const { t } = useTranslation(['system/menu', 'system/common']);
  const [menus, setMenus] = useState<MenuNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedMenus, setSelectedMenus] = useState<number[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editMenuId, setEditMenuId] = useState<number | undefined>(undefined);

  // 获取菜单列表
  useEffect(() => {
    const fetchMenus = async () => {
      setLoading(true);
      try {
        const response = await menuApi.getList({
          name: searchTerm || undefined,
          status: statusFilter !== 'all' ? Number(statusFilter) : undefined
        });
        
        // 构建菜单树
        const menuTree = menuApi.buildMenuTree(response);
        
        // 添加展开状态
        const addExpandedState = (nodes: MenuNode[]): MenuNode[] => {
          return nodes.map(node => ({
            ...node,
            expanded: true,
            children: node.children ? addExpandedState(node.children) : undefined
          }));
        };
        
        setMenus(addExpandedState(menuTree));
      } catch (error) {
        console.error('Failed to fetch menus:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, [searchTerm, statusFilter]);

  // 切换展开/折叠
  const toggleExpand = (menu: MenuNode) => {
    menu.expanded = !menu.expanded;
    setMenus([...menus]);
  };

  // 获取菜单类型文本
  const getMenuTypeText = (type: string) => {
    switch (type) {
      case MenuType.DIRECTORY:
        return t('directory');
      case MenuType.MENU:
        return t('menu');
      case MenuType.BUTTON:
        return t('button');
      default:
        return t('noData', { ns: 'system/common' });
    }
  };

  // 获取菜单类型标签样式
  const getMenuTypeBadgeClass = (type: string) => {
    switch (type) {
      case MenuType.DIRECTORY:
        return 'badge-primary';
      case MenuType.MENU:
        return 'badge-secondary';
      case MenuType.BUTTON:
        return 'badge-accent';
      default:
        return 'badge-ghost';
    }
  };

  // 获取状态文本
  const getStatusText = (status: number) => {
    return status === 0 ? t('enabled') : t('disabled');
  };

  // 获取状态样式
  const getStatusClass = (status: number) => {
    return status === 0 ? 'status-active' : 'status-inactive';
  };

  // 处理创建菜单
  const handleCreateMenu = () => {
    setEditMenuId(undefined);
    setShowForm(true);
  };

  // 处理编辑菜单
  const handleEditMenu = (menuId: number) => {
    setEditMenuId(menuId);
    setShowForm(true);
  };

  // 处理表单成功
  const handleFormSuccess = () => {
    setShowForm(false);
    setEditMenuId(undefined);
    // 重新加载菜单列表
    const fetchMenus = async () => {
      setLoading(true);
      try {
        const response = await menuApi.getList({});
        const menuTree = menuApi.buildMenuTree(response);
        
        // 添加展开状态
        const addExpandedState = (nodes: MenuNode[]): MenuNode[] => {
          return nodes.map(node => ({
            ...node,
            expanded: true,
            children: node.children ? addExpandedState(node.children) : undefined
          }));
        };
        
        setMenus(addExpandedState(menuTree));
      } catch (error) {
        console.error('Failed to fetch menus:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  };

  // 处理表单取消
  const handleFormCancel = () => {
    setShowForm(false);
    setEditMenuId(undefined);
  };

  // 处理删除菜单
  const handleDeleteMenu = async (menuId: number) => {
    if (window.confirm(t('deleteConfirm'))) {
      try {
        await menuApi.deleteMenu(menuId);
        // 重新加载菜单列表
        const response = await menuApi.getList({});
        const menuTree = menuApi.buildMenuTree(response);
        
        // 添加展开状态
        const addExpandedState = (nodes: MenuNode[]): MenuNode[] => {
          return nodes.map(node => ({
            ...node,
            expanded: true,
            children: node.children ? addExpandedState(node.children) : undefined
          }));
        };
        
        setMenus(addExpandedState(menuTree));
      } catch (error) {
        console.error('Failed to delete menu:', error);
        alert(t('deleteError'));
      }
    }
  };

  // 处理查询
  const handleSearch = () => {
    // 重新加载菜单列表
    const fetchMenus = async () => {
      setLoading(true);
      try {
        const response = await menuApi.getList({
          name: searchTerm || undefined,
          status: statusFilter !== 'all' ? Number(statusFilter) : undefined
        });
        const menuTree = menuApi.buildMenuTree(response);
        
        // 添加展开状态
        const addExpandedState = (nodes: MenuNode[]): MenuNode[] => {
          return nodes.map(node => ({
            ...node,
            expanded: true,
            children: node.children ? addExpandedState(node.children) : undefined
          }));
        };
        
        setMenus(addExpandedState(menuTree));
      } catch (error) {
        console.error('Failed to fetch menus:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  };

  // 处理重置
  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  // 如果表单正在显示，则渲染表单
  if (showForm) {
    return (
      <MenuForm 
        menuId={editMenuId} 
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
          <p className="mt-4 text-base-content/70">{t('loading', { ns: 'system/common' })}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{t('title')}</h1>
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link to="/system/dashboard" className="text-base-content/70">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {t('home', { ns: 'system/common' })}
                </Link>
              </li>
              <li>
                <span className="text-base-content/90 font-medium">{t('title')}</span>
              </li>
            </ul>
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleCreateMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          {t('actions.addMenu')}
        </button>
      </div>
      
      <div className="bg-base-100 rounded-lg shadow-md">
        {/* 表格工具栏 */}
        <div className="p-4 border-b border-base-200">
          <div className="grid grid-cols-1 gap-y-4">
            {/* 检索条件 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label justify-start pb-1">
                  <span className="label-text font-medium w-20">{t('columns.menuName')}</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder={t('placeholder.menuName')}
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
                  <span className="label-text font-medium w-20">{t('columns.status')}</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">{t('allStatus')}</option>
                  <option value="0">{t('enabled')}</option>
                  <option value="1">{t('disabled')}</option>
                </select>
              </div>
              
              <div className="form-control">
                <label className="label justify-start pb-1">
                  <span className="label-text font-medium w-20">{t('actions.title', { ns: 'system/common' })}</span>
                </label>
                <div className="flex gap-2">
                  <button 
                    className="btn btn-primary flex-1"
                    onClick={handleSearch}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {t('actions.search', { ns: 'system/common' })}
                  </button>
                  <button 
                    className="btn btn-outline flex-1"
                    onClick={handleReset}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {t('actions.reset', { ns: 'system/common' })}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 菜单树 */}
        <div className="overflow-x-auto">
          {menus.length > 0 ? (
            <div className="menu-tree">
              <div className="menu-header">
                <div className="menu-col menu-col-name">{t('columns.menuName')}</div>
                <div className="menu-col menu-col-icon">{t('columns.icon')}</div>
                <div className="menu-col menu-col-sort">{t('columns.sort')}</div>
                <div className="menu-col menu-col-perms">{t('columns.perms')}</div>
                <div className="menu-col menu-col-path">{t('columns.path')}</div>
                <div className="menu-col menu-col-component">{t('columns.component')}</div>
                <div className="menu-col menu-col-type">{t('columns.menuType')}</div>
                <div className="menu-col menu-col-visible">{t('columns.visible')}</div>
                <div className="menu-col menu-col-status">{t('columns.status')}</div>
                <div className="menu-col menu-col-action">{t('actions.title', { ns: 'system/common' })}</div>
              </div>
              
              {menus.map((menu) => {
                // 递归渲染菜单节点
                const renderMenuNode = (m: MenuNode, level = 0, isLast = true) => {
                  return (
                    <div key={m.id} className="menu-node">
                      <div className="menu-row">
                        {/* 菜单名称 */}
                        <div className="menu-col menu-col-name">
                          <div className="menu-name-container">
                            {/* 缩进和展开/折叠按钮 */}
                            <div className="menu-indent" style={{ width: `${level * 20}px` }}></div>
                            <div className="menu-toggle">
                              {m.children && m.children.length > 0 ? (
                                <button 
                                  className="btn btn-circle btn-xs btn-ghost" 
                                  onClick={() => toggleExpand(m)}
                                >
                                  {m.expanded ? (
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
                                <div className="menu-leaf"></div>
                              )}
                            </div>
                            <span className="menu-name">{m.name}</span>
                          </div>
                        </div>
                        
                        {/* 图标 */}
                        <div className="menu-col menu-col-icon">
                          {m.icon ? (
                            <div className="menu-icon">
                              <i className={m.icon}></i>
                              <span className="menu-icon-name">{m.icon}</span>
                            </div>
                          ) : (
                            <span className="text-base-content/30">-</span>
                          )}
                        </div>
                        
                        {/* 排序 */}
                        <div className="menu-col menu-col-sort">
                          {m.sort}
                        </div>
                        
                        {/* 权限标识 */}
                        <div className="menu-col menu-col-perms">
                          {m.perms || <span className="text-base-content/30">-</span>}
                        </div>
                        
                        {/* 路由地址 */}
                        <div className="menu-col menu-col-path">
                          {m.path || <span className="text-base-content/30">-</span>}
                        </div>
                        
                        {/* 组件路径 */}
                        <div className="menu-col menu-col-component">
                          {m.component || <span className="text-base-content/30">-</span>}
                        </div>
                        
                        {/* 类型 */}
                        <div className="menu-col menu-col-type">
                          <div className={`badge badge-sm ${getMenuTypeBadgeClass(m.type)}`}>
                            {getMenuTypeText(m.type)}
                          </div>
                        </div>
                        
                        {/* 可见 */}
                        <div className="menu-col menu-col-visible">
                          {m.visible ? (
                            <span className="text-success">{t('yes')}</span>
                          ) : (
                            <span className="text-error">{t('no')}</span>
                          )}
                        </div>
                        
                        {/* 状态 */}
                        <div className="menu-col menu-col-status">
                          <div className={`menu-status ${getStatusClass(m.status)}`}>
                            <span className="status-dot"></span>
                            <span className="status-text">{getStatusText(m.status)}</span>
                          </div>
                        </div>
                        
                        {/* 操作 */}
                        <div className="menu-col menu-col-action">
                          <div className="flex gap-2">
                            <button 
                              className="btn btn-circle btn-sm btn-ghost btn-info tooltip" 
                              data-tip={t('actions.edit', { ns: 'system/common' })}
                              onClick={() => handleEditMenu(m.id)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button 
                              className="btn btn-circle btn-sm btn-ghost btn-error tooltip" 
                              data-tip={t('actions.delete', { ns: 'system/common' })}
                              onClick={() => handleDeleteMenu(m.id)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* 子菜单 */}
                      {m.expanded && m.children && m.children.length > 0 && (
                        <div className="menu-children">
                          {m.children.map((child, index) => 
                            renderMenuNode(child, level + 1, index === m.children!.length - 1)
                          )}
                        </div>
                      )}
                    </div>
                  );
                };
                
                return renderMenuNode(menu);
              })}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="flex flex-col items-center justify-center text-base-content/70">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-medium">{t('noMenusFound')}</p>
                <button 
                  className="btn btn-sm btn-outline mt-4"
                  onClick={handleReset}
                >
                  {t('actions.reset', { ns: 'system/common' })}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menus; 