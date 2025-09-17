import { useState, useEffect } from 'react';
import { deptApi, userApi } from '../../api/system';
import type { Dept, User } from '../../api/system';
import Breadcrumb from './Breadcrumb';

interface DepartmentFormProps {
  deptId?: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const DepartmentForm = ({ deptId, onSuccess, onCancel }: DepartmentFormProps) => {
  const [formData, setFormData] = useState<Partial<Dept>>({
    name: '',
    parentId: 0,
    sort: 0,
    leaderUserId: undefined,
    phone: '',
    email: '',
    status: 0,
  });
  
  const [departments, setDepartments] = useState<Dept[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const isEdit = !!deptId;

  // Fetch department details if editing
  useEffect(() => {
    const fetchDeptData = async () => {
      if (!deptId) return;
      
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // const dept = await deptApi.getDetail(deptId);
        // setFormData(dept);
        
        // Mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockDept: Dept = {
          id: deptId,
          name: 'IT部门',
          parentId: 1,
          sort: 1,
          leaderUserId: 2,
          phone: '123-456-7891',
          email: 'it@example.com',
          status: 0,
          createTime: '2023-01-02 00:00:00',
        };
        
        setFormData(mockDept);
      } catch (error) {
        console.error('Failed to fetch department details:', error);
        setError('获取部门详情失败');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDeptData();
  }, [deptId]);

  // Fetch departments and users
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, these would be API calls
        // const [deptResponse, userResponse] = await Promise.all([
        //   deptApi.getList({}),
        //   userApi.getPage({ pageNo: 1, pageSize: 100 }),
        // ]);
        // setDepartments(deptResponse);
        // setUsers(userResponse.list);
        
        // Mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockDepts: Dept[] = [
          { id: 1, name: '公司总部', parentId: 0, sort: 1, leaderUserId: 1, phone: '123-456-7890', email: 'hq@example.com', status: 0, createTime: '2023-01-01 00:00:00' },
          { id: 2, name: 'IT部门', parentId: 1, sort: 1, leaderUserId: 2, phone: '123-456-7891', email: 'it@example.com', status: 0, createTime: '2023-01-02 00:00:00' },
          { id: 3, name: '人力资源部', parentId: 1, sort: 2, leaderUserId: 3, phone: '123-456-7892', email: 'hr@example.com', status: 0, createTime: '2023-01-03 00:00:00' },
          { id: 4, name: '财务部', parentId: 1, sort: 3, leaderUserId: 4, phone: '123-456-7893', email: 'finance@example.com', status: 0, createTime: '2023-01-04 00:00:00' },
        ];
        
        const mockUsers: User[] = [
          { id: 1, username: 'admin', email: 'admin@example.com', nickname: '管理员', deptId: 1, postIds: [1], remark: '', status: 0, loginIp: '', loginDate: '', createTime: '' },
          { id: 2, username: 'johndoe', email: 'john.doe@example.com', nickname: '张三', deptId: 2, postIds: [2], remark: '', status: 0, loginIp: '', loginDate: '', createTime: '' },
          { id: 3, username: 'janedoe', email: 'jane.doe@example.com', nickname: '李四', deptId: 3, postIds: [3], remark: '', status: 0, loginIp: '', loginDate: '', createTime: '' },
          { id: 4, username: 'bobsmith', email: 'bob.smith@example.com', nickname: '王五', deptId: 4, postIds: [4], remark: '', status: 0, loginIp: '', loginDate: '', createTime: '' },
        ];
        
        setDepartments(mockDepts);
        setUsers(mockUsers);
      } catch (error) {
        console.error('Failed to fetch form data:', error);
        setError('获取表单数据失败');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, status: e.target.checked ? 0 : 1 }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setSubmitting(true);
    setError('');
    
    try {
      // In a real app, this would be an API call
      if (isEdit) {
        // await deptApi.update(formData as Dept);
      } else {
        // await deptApi.create(formData);
      }
      
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSuccess();
    } catch (error) {
      console.error('Failed to save department:', error);
      setError('保存部门失败');
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

  // Filter out current department from parent options to prevent circular references
  const parentOptions = departments.filter(dept => dept.id !== deptId);
  
  const breadcrumbItems = [
    { path: '/system/departments', name: '部门管理', icon: 'i-tabler-building' },
    { path: isEdit ? `/system/departments/edit/${deptId}` : '/system/departments/create', name: isEdit ? '编辑部门' : '创建部门' }
  ];

  return (
    <div>
      <Breadcrumb title={isEdit ? '编辑部门' : '创建部门'} items={breadcrumbItems} />
      
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
              {/* Department Name */}
              <div className="form-control">
                <div className="flex items-center mb-2">
                  <label className="label w-24 justify-end mr-2 p-0">
                    <span className="label-text font-medium">部门名称</span>
                  </label>
                  <span className="text-error">*</span>
                </div>
                <div className="ml-[6.5rem]">
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="请输入部门名称" 
                    className="input input-bordered w-full" 
                    value={formData.name || ''} 
                    onChange={handleChange}
                    disabled={submitting}
                    required
                  />
                </div>
              </div>
              
              {/* Parent Department */}
              <div className="form-control">
                <div className="flex items-center mb-2">
                  <label className="label w-24 justify-end mr-2 p-0">
                    <span className="label-text font-medium">上级部门</span>
                  </label>
                  <span className="text-error">*</span>
                </div>
                <div className="ml-[6.5rem]">
                  <select 
                    name="parentId" 
                    className="select select-bordered w-full" 
                    value={formData.parentId || 0} 
                    onChange={handleChange}
                    disabled={submitting}
                    required
                  >
                    <option value={0}>无 (根部门)</option>
                    {parentOptions.map(dept => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Leader */}
              <div className="form-control">
                <div className="flex items-center mb-2">
                  <label className="label w-24 justify-end mr-2 p-0">
                    <span className="label-text font-medium">部门负责人</span>
                  </label>
                </div>
                <div className="ml-[6.5rem]">
                  <select 
                    name="leaderUserId" 
                    className="select select-bordered w-full" 
                    value={formData.leaderUserId || ''} 
                    onChange={handleChange}
                    disabled={submitting}
                  >
                    <option value="">选择负责人</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>{user.nickname}</option>
                    ))}
                  </select>
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
              
              {/* Phone */}
              <div className="form-control">
                <div className="flex items-center mb-2">
                  <label className="label w-24 justify-end mr-2 p-0">
                    <span className="label-text font-medium">联系电话</span>
                  </label>
                </div>
                <div className="ml-[6.5rem]">
                  <input 
                    type="text" 
                    name="phone" 
                    placeholder="请输入联系电话" 
                    className="input input-bordered w-full" 
                    value={formData.phone || ''} 
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div>
              </div>
              
              {/* Email */}
              <div className="form-control">
                <div className="flex items-center mb-2">
                  <label className="label w-24 justify-end mr-2 p-0">
                    <span className="label-text font-medium">邮箱</span>
                  </label>
                </div>
                <div className="ml-[6.5rem]">
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="请输入邮箱" 
                    className="input input-bordered w-full" 
                    value={formData.email || ''} 
                    onChange={handleChange}
                    disabled={submitting}
                  />
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

export default DepartmentForm; 