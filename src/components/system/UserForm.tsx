import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

// 模拟数据
interface Role {
  id: number;
  name: string;
  description: string;
}

interface Department {
  id: number;
  name: string;
  parentId?: number;
}

interface UserFormData {
  id?: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  avatar: string;
  roleIds: number[];
  departmentId: number;
  status: 'active' | 'inactive' | 'locked';
  remark: string;
}

interface FormError {
  [key: string]: string;
}

// 添加组件 props 类型定义
interface UserFormProps {
  userId?: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const UserForm = ({ userId, onSuccess, onCancel }: UserFormProps) => {
  const isEdit = !!userId;
  
  const [formData, setFormData] = useState<UserFormData>({
    username: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    avatar: '',
    roleIds: [],
    departmentId: 0,
    status: 'active',
    remark: ''
  });
  
  const [roles, setRoles] = useState<Role[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<FormError>({});
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  
  // 模拟获取数据
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        // 模拟API延迟
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // 模拟角色数据
        const mockRoles: Role[] = [
          { id: 1, name: 'Admin', description: '系统管理员' },
          { id: 2, name: 'Manager', description: '部门经理' },
          { id: 3, name: 'Editor', description: '内容编辑' },
          { id: 4, name: 'User', description: '普通用户' }
        ];
        
        // 模拟部门数据
        const mockDepartments: Department[] = [
          { id: 1, name: '总公司' },
          { id: 2, name: '技术部', parentId: 1 },
          { id: 3, name: '市场部', parentId: 1 },
          { id: 4, name: '销售部', parentId: 1 },
          { id: 5, name: '前端组', parentId: 2 },
          { id: 6, name: '后端组', parentId: 2 },
          { id: 7, name: '测试组', parentId: 2 },
          { id: 8, name: '运维组', parentId: 2 }
        ];
        
        setRoles(mockRoles);
        setDepartments(mockDepartments);
        
        // 如果是编辑模式，获取用户数据
        if (isEdit && userId) {
          // 模拟用户数据
          const mockUser: UserFormData = {
            id: userId,
            username: 'johndoe',
            name: '张三',
            email: 'john.doe@example.com',
            phone: '13800138000',
            password: '',
            confirmPassword: '',
            avatar: '/images/user/header.jpg',
            roleIds: [2, 3],
            departmentId: 5,
            status: 'active',
            remark: '前端开发工程师'
          };
          
          setFormData(mockUser);
          setAvatarPreview(mockUser.avatar);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [userId, isEdit]);
  
  // 处理表单输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 清除该字段的错误
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // 处理角色多选
  const handleRoleChange = (roleId: number) => {
    setFormData(prev => {
      const newRoleIds = prev.roleIds.includes(roleId)
        ? prev.roleIds.filter(id => id !== roleId)
        : [...prev.roleIds, roleId];
      
      return {
        ...prev,
        roleIds: newRoleIds
      };
    });
    
    // 清除角色错误
    if (errors.roleIds) {
      setErrors(prev => ({
        ...prev,
        roleIds: ''
      }));
    }
  };
  
  // 处理状态变更
  const handleStatusChange = (status: UserFormData['status']) => {
    setFormData(prev => ({
      ...prev,
      status
    }));
  };
  
  // 处理头像上传
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // 在实际应用中，这里会上传文件到服务器
      // 这里只是模拟预览
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setAvatarPreview(result);
        setFormData(prev => ({
          ...prev,
          avatar: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  // 验证表单
  const validateForm = (): boolean => {
    const newErrors: FormError = {};
    
    // 用户名验证
    if (!formData.username.trim()) {
      newErrors.username = '请输入用户名';
    } else if (formData.username.length < 3) {
      newErrors.username = '用户名至少需要3个字符';
    }
    
    // 姓名验证
    if (!formData.name.trim()) {
      newErrors.name = '请输入姓名';
    }
    
    // 邮箱验证
    if (!formData.email.trim()) {
      newErrors.email = '请输入邮箱';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }
    
    // 手机号验证
    if (formData.phone && !/^1[3-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = '请输入有效的手机号码';
    }
    
    // 密码验证（仅在新建时必填）
    if (!isEdit) {
      if (!formData.password) {
        newErrors.password = '请输入密码';
      } else if (formData.password.length < 6) {
        newErrors.password = '密码至少需要6个字符';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = '请确认密码';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = '两次输入的密码不一致';
      }
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = '密码至少需要6个字符';
    } else if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致';
    }
    
    // 角色验证
    if (formData.roleIds.length === 0) {
      newErrors.roleIds = '请至少选择一个角色';
    }
    
    // 部门验证
    if (!formData.departmentId) {
      newErrors.departmentId = '请选择部门';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSaving(true);
    
    try {
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 在实际应用中，这里会调用API保存数据
      console.log('保存的用户数据:', formData);
      
      // 提交成功后调用成功回调
      onSuccess();
    } catch (error) {
      console.error('保存用户失败:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  // 递归构建部门选项
  const renderDepartmentOptions = (departments: Department[], parentId?: number, level = 0) => {
    return departments
      .filter(dept => dept.parentId === parentId)
      .map(dept => (
        <Fragment key={dept.id}>
          <option value={dept.id} className={level === 0 ? 'font-bold' : ''}>
            {'\u00A0'.repeat(level * 4)}{level > 0 ? '└ ' : ''}{dept.name}
          </option>
          {renderDepartmentOptions(departments, dept.id, level + 1)}
        </Fragment>
      ));
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/70">加载中...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{isEdit ? '编辑用户' : '新建用户'}</h1>
          <div className="text-sm breadcrumbs">
            <ul>
              <li><Link to="/system/dashboard">首页</Link></li>
              <li><Link to="/system/users">用户管理</Link></li>
              <li>{isEdit ? '编辑用户' : '新建用户'}</li>
            </ul>
          </div>
        </div>
        <button onClick={onCancel} className="btn btn-outline">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回列表
        </button>
      </div>
      
      <div className="bg-base-100 rounded-lg shadow-md">
        <div className="p-4 border-b border-base-200">
          <h2 className="text-lg font-medium">用户信息</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">用户名 <span className="text-error">*</span></span>
              </label>
              <input
                type="text"
                name="username"
                className={`input input-bordered w-full ${errors.username ? 'input-error' : ''}`}
                value={formData.username}
                onChange={handleInputChange}
                placeholder="请输入用户名"
                disabled={isEdit} // 编辑模式下不允许修改用户名
              />
              {errors.username && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.username}</span>
                </label>
              )}
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">姓名 <span className="text-error">*</span></span>
              </label>
              <input
                type="text"
                name="name"
                className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                value={formData.name}
                onChange={handleInputChange}
                placeholder="请输入姓名"
              />
              {errors.name && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.name}</span>
                </label>
              )}
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">邮箱 <span className="text-error">*</span></span>
              </label>
              <input
                type="email"
                name="email"
                className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                value={formData.email}
                onChange={handleInputChange}
                placeholder="请输入邮箱"
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.email}</span>
                </label>
              )}
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">手机号</span>
              </label>
              <input
                type="text"
                name="phone"
                className={`input input-bordered w-full ${errors.phone ? 'input-error' : ''}`}
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="请输入手机号"
              />
              {errors.phone && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.phone}</span>
                </label>
              )}
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">{isEdit ? '新密码' : '密码'} {!isEdit && <span className="text-error">*</span>}</span>
              </label>
              <input
                type="password"
                name="password"
                className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                value={formData.password}
                onChange={handleInputChange}
                placeholder={isEdit ? '不填则不修改密码' : '请输入密码'}
              />
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.password}</span>
                </label>
              )}
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">确认密码 {!isEdit && <span className="text-error">*</span>}</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                className={`input input-bordered w-full ${errors.confirmPassword ? 'input-error' : ''}`}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="请确认密码"
              />
              {errors.confirmPassword && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.confirmPassword}</span>
                </label>
              )}
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">部门 <span className="text-error">*</span></span>
              </label>
              <select
                name="departmentId"
                className={`select select-bordered w-full ${errors.departmentId ? 'select-error' : ''}`}
                value={formData.departmentId}
                onChange={handleInputChange}
              >
                <option value="0">请选择部门</option>
                {renderDepartmentOptions(departments)}
              </select>
              {errors.departmentId && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.departmentId}</span>
                </label>
              )}
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">状态</span>
              </label>
              <div className="flex space-x-4 pt-2">
                <label className="flex items-center cursor-pointer space-x-2">
                  <input
                    type="radio"
                    className="radio radio-sm radio-success"
                    checked={formData.status === 'active'}
                    onChange={() => handleStatusChange('active')}
                  />
                  <span>活跃</span>
                </label>
                <label className="flex items-center cursor-pointer space-x-2">
                  <input
                    type="radio"
                    className="radio radio-sm radio-warning"
                    checked={formData.status === 'inactive'}
                    onChange={() => handleStatusChange('inactive')}
                  />
                  <span>未激活</span>
                </label>
                <label className="flex items-center cursor-pointer space-x-2">
                  <input
                    type="radio"
                    className="radio radio-sm radio-error"
                    checked={formData.status === 'locked'}
                    onChange={() => handleStatusChange('locked')}
                  />
                  <span>已锁定</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="divider"></div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">角色 <span className="text-error">*</span></span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map(role => (
                  <label key={role.id} className="flex items-center p-3 rounded-lg border border-base-300 cursor-pointer hover:bg-base-200 transition-colors">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm mr-3"
                      checked={formData.roleIds.includes(role.id)}
                      onChange={() => handleRoleChange(role.id)}
                    />
                    <div>
                      <div className="font-medium">{role.name}</div>
                      <div className="text-xs text-base-content/70">{role.description}</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.roleIds && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.roleIds}</span>
                </label>
              )}
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">头像</span>
              </label>
              <div className="flex items-center space-x-4">
                <div className="avatar">
                  <div className="w-20 h-20 rounded-lg">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar Preview" className="object-cover" />
                    ) : (
                      <div className="bg-base-300 flex items-center justify-center text-2xl font-bold text-base-content/30">
                        {formData.name?.[0] || '?'}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <input
                    type="file"
                    className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                  <p className="text-xs text-base-content/70 mt-2">
                    支持 JPG, PNG, GIF 格式，最大 2MB
                  </p>
                </div>
              </div>
            </div>
            
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text font-medium">备注</span>
              </label>
              <textarea
                name="remark"
                className="textarea textarea-bordered h-24"
                value={formData.remark}
                onChange={handleInputChange}
                placeholder="请输入备注信息（选填）"
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-8 pt-4 border-t border-base-200">
            <button type="button" onClick={onCancel} className="btn btn-outline">取消</button>
            <button
              type="submit"
              className={`btn btn-primary ${isSaving ? 'loading' : ''}`}
              disabled={isSaving}
            >
              {isSaving ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm; 