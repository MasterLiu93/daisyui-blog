import { useState, useEffect } from 'react';
import { roleApi } from '../../api/system';
import type { Role } from '../../api/system';
import Breadcrumb from './Breadcrumb';

interface RoleFormProps {
  roleId?: number;
  onSuccess: () => void;
  onCancel: () => void;
}

interface Permission {
  id: string;
  name: string;
  checked: boolean;
  children?: Permission[];
}

const RoleForm = ({ roleId, onSuccess, onCancel }: RoleFormProps) => {
  const [formData, setFormData] = useState<Partial<Role>>({
    name: '',
    code: '',
    sort: 0,
    status: 0,
    type: 1,
  });
  
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: 'system',
      name: '系统管理',
      checked: false,
      children: [
        { id: 'system:user', name: '用户管理', checked: false },
        { id: 'system:role', name: '角色管理', checked: false },
        { id: 'system:dept', name: '部门管理', checked: false },
        { id: 'system:dict', name: '字典管理', checked: false },
      ]
    },
    {
      id: 'blog',
      name: '博客管理',
      checked: false,
      children: [
        { id: 'blog:article', name: '文章管理', checked: false },
        { id: 'blog:category', name: '分类管理', checked: false },
        { id: 'blog:tag', name: '标签管理', checked: false },
      ]
    }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const isEdit = !!roleId;

  // Fetch role details if editing
  useEffect(() => {
    const fetchRoleData = async () => {
      if (!roleId) return;
      
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // const role = await roleApi.getDetail(roleId);
        // setFormData(role);
        
        // Mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockRole: Role = {
          id: roleId,
          name: '编辑',
          code: 'editor',
          sort: 4,
          status: 0,
          type: 1,
          createTime: '2023-01-04 00:00:00',
        };
        
        setFormData(mockRole);
        
        // Mock permissions
        const updatedPermissions = [...permissions];
        updatedPermissions[0].children![1].checked = true; // system:role
        updatedPermissions[1].children![0].checked = true; // blog:article
        updatedPermissions[1].children![2].checked = true; // blog:tag
        
        // Update parent checked status
        updateParentCheckedStatus(updatedPermissions);
        
        setPermissions(updatedPermissions);
      } catch (error) {
        console.error('Failed to fetch role details:', error);
        setError('Failed to fetch role details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRoleData();
  }, [roleId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, status: e.target.checked ? 0 : 1 }));
  };
  
  const handlePermissionChange = (id: string, checked: boolean) => {
    const updatePermissionChecked = (perms: Permission[]): Permission[] => {
      return perms.map(perm => {
        if (perm.id === id) {
          // Update this permission and all its children
          const updatedPerm = { ...perm, checked };
          if (perm.children) {
            updatedPerm.children = perm.children.map(child => ({
              ...child,
              checked
            }));
          }
          return updatedPerm;
        } else if (perm.children) {
          // Check if any child matches the id
          const updatedChildren = updatePermissionChecked(perm.children);
          const allChildrenChecked = updatedChildren.every(child => child.checked);
          const anyChildChecked = updatedChildren.some(child => child.checked);
          
          return {
            ...perm,
            children: updatedChildren,
            checked: allChildrenChecked
          };
        }
        return perm;
      });
    };
    
    const updatedPermissions = updatePermissionChecked(permissions);
    setPermissions(updatedPermissions);
  };
  
  const updateParentCheckedStatus = (perms: Permission[]) => {
    perms.forEach(perm => {
      if (perm.children) {
        const allChildrenChecked = perm.children.every(child => child.checked);
        perm.checked = allChildrenChecked;
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setSubmitting(true);
    setError('');
    
    try {
      // In a real app, this would be an API call
      if (isEdit) {
        // await roleApi.update(formData as Role);
      } else {
        // await roleApi.create(formData);
      }
      
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSuccess();
    } catch (error) {
      console.error('Failed to save role:', error);
      setError('Failed to save role');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  
  const breadcrumbItems = [
    { path: '/system/roles', name: '角色管理', icon: 'i-tabler-shield' },
    { path: isEdit ? `/system/roles/edit/${roleId}` : '/system/roles/create', name: isEdit ? '编辑角色' : '创建角色' }
  ];

  return (
    <div>
      <Breadcrumb title={isEdit ? '编辑角色' : '创建角色'} items={breadcrumbItems} />
      
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {error && (
            <div className="alert alert-error mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="divider text-lg font-bold">基本信息</div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Role Name */}
              <div className="form-control">
                <div className="flex items-center mb-2">
                  <label className="label w-24 justify-end mr-2 p-0">
                    <span className="label-text font-medium">角色名称</span>
                  </label>
                  <span className="text-error">*</span>
                </div>
                <div className="ml-[6.5rem]">
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="请输入角色名称" 
                    className="input input-bordered w-full" 
                    value={formData.name || ''} 
                    onChange={handleChange}
                    disabled={submitting}
                    required
                  />
                </div>
              </div>
              
              {/* Role Code */}
              <div className="form-control">
                <div className="flex items-center mb-2">
                  <label className="label w-24 justify-end mr-2 p-0">
                    <span className="label-text font-medium">角色编码</span>
                  </label>
                  <span className="text-error">*</span>
                </div>
                <div className="ml-[6.5rem]">
                  <input 
                    type="text" 
                    name="code" 
                    placeholder="请输入角色编码" 
                    className="input input-bordered w-full" 
                    value={formData.code || ''} 
                    onChange={handleChange}
                    disabled={isEdit || submitting}
                    required
                  />
                  <label className="label p-0 mt-1">
                    <span className="label-text-alt text-base-content/60">唯一标识符，例如: 'admin', 'editor'</span>
                  </label>
                </div>
              </div>
              
              {/* Sort Order */}
              <div className="form-control">
                <div className="flex items-center mb-2">
                  <label className="label w-24 justify-end mr-2 p-0">
                    <span className="label-text font-medium">排序</span>
                  </label>
                  <span className="text-error">*</span>
                </div>
                <div className="ml-[6.5rem]">
                  <input 
                    type="number" 
                    name="sort" 
                    placeholder="请输入排序" 
                    className="input input-bordered w-full" 
                    value={formData.sort || 0} 
                    onChange={handleChange}
                    disabled={submitting}
                    required
                  />
                </div>
              </div>
              
              {/* Role Type */}
              <div className="form-control">
                <div className="flex items-center mb-2">
                  <label className="label w-24 justify-end mr-2 p-0">
                    <span className="label-text font-medium">角色类型</span>
                  </label>
                  <span className="text-error">*</span>
                </div>
                <div className="ml-[6.5rem]">
                  <select 
                    name="type" 
                    className="select select-bordered w-full" 
                    value={formData.type || 1} 
                    onChange={handleChange}
                    disabled={submitting}
                    required
                  >
                    <option value={1}>系统角色</option>
                    <option value={2}>自定义角色</option>
                  </select>
                </div>
              </div>
              
              {/* Status */}
              <div className="form-control">
                <div className="flex items-center mb-2">
                  <label className="label w-24 justify-end mr-2 p-0">
                    <span className="label-text font-medium">状态</span>
                  </label>
                </div>
                <div className="ml-[6.5rem]">
                  <div className="bg-base-200 p-3 rounded-lg flex items-center">
                    <label className="label cursor-pointer justify-start gap-4">
                      <input 
                        type="checkbox" 
                        className="toggle toggle-primary" 
                        checked={formData.status === 0} 
                        onChange={handleStatusChange}
                        disabled={submitting}
                      />
                      <span className="label-text">
                        {formData.status === 0 ? (
                          <span className="text-success font-medium">启用</span>
                        ) : (
                          <span className="text-error font-medium">禁用</span>
                        )}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Permissions */}
            <div className="divider text-lg font-bold mt-8">权限分配</div>
            
            <div className="bg-base-200 p-6 rounded-lg">
              <div className="space-y-6">
                {permissions.map((module) => (
                  <div key={module.id} className="card bg-base-100 shadow-md hover:shadow-lg transition-all">
                    <div className="card-body p-4">
                      <div className="flex items-center mb-3">
                        <label className="label cursor-pointer justify-start gap-3">
                          <input 
                            type="checkbox" 
                            className="checkbox checkbox-primary" 
                            checked={module.checked} 
                            onChange={(e) => handlePermissionChange(module.id, e.target.checked)}
                            disabled={submitting}
                          />
                          <span className="text-lg font-bold">{module.name}</span>
                        </label>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-8">
                        {module.children?.map((perm) => (
                          <label 
                            key={perm.id} 
                            className={`label cursor-pointer justify-start gap-3 p-3 rounded-lg transition-all ${
                              perm.checked 
                                ? 'bg-primary/10 border border-primary/30' 
                                : 'bg-base-200 hover:bg-base-300'
                            }`}
                          >
                            <input 
                              type="checkbox" 
                              className="checkbox checkbox-sm checkbox-primary" 
                              checked={perm.checked}
                              onChange={(e) => handlePermissionChange(perm.id, e.target.checked)}
                              disabled={submitting}
                            />
                            <span className="label-text font-medium">{perm.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-base-300">
              <button 
                type="button" 
                className="btn btn-outline" 
                onClick={onCancel}
                disabled={submitting}
              >
                取消
              </button>
              <button 
                type="submit" 
                className="btn btn-primary min-w-[100px]"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    保存中...
                  </>
                ) : '保存'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoleForm; 