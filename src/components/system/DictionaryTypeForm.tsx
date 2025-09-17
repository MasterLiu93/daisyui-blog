import { useState, useEffect } from 'react';
import { dictApi } from '../../api/system';
import type { Dict } from '../../api/system';
import Breadcrumb from './Breadcrumb';

interface DictionaryTypeFormProps {
  dictId?: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const DictionaryTypeForm = ({ dictId, onSuccess, onCancel }: DictionaryTypeFormProps) => {
  const [formData, setFormData] = useState<Partial<Dict>>({
    name: '',
    type: '',
    status: 0,
    remark: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const isEdit = !!dictId;

  // Fetch dictionary type details if editing
  useEffect(() => {
    const fetchDictData = async () => {
      if (!dictId) return;
      
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // const dict = await dictApi.getTypeDetail(dictId);
        // setFormData(dict);
        
        // Mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockDict: Dict = {
          id: dictId,
          name: '系统状态',
          type: 'sys_status',
          status: 0,
          remark: '系统状态选项',
          createTime: '2023-01-01 00:00:00',
        };
        
        setFormData(mockDict);
      } catch (error) {
        console.error('Failed to fetch dictionary type details:', error);
        setError('获取字典类型详情失败');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDictData();
  }, [dictId]);

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
        // await dictApi.updateType(formData as Dict);
      } else {
        // await dictApi.createType(formData);
      }
      
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSuccess();
    } catch (error) {
      console.error('Failed to save dictionary type:', error);
      setError('保存字典类型失败');
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
    { path: '/system/dictionaries', name: '字典管理', icon: 'i-tabler-book' },
    { path: isEdit ? `/system/dictionaries/edit-type/${dictId}` : '/system/dictionaries/create-type', name: isEdit ? '编辑字典类型' : '创建字典类型' }
  ];

  return (
    <div>
      <Breadcrumb title={isEdit ? '编辑字典类型' : '创建字典类型'} items={breadcrumbItems} />
      
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
              {/* Dictionary Name */}
              <div className="form-control">
                <div className="flex items-center mb-2">
                  <label className="label w-24 justify-end mr-2 p-0">
                    <span className="label-text font-medium">字典名称</span>
                  </label>
                  <span className="text-error">*</span>
                </div>
                <div className="ml-[6.5rem]">
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="请输入字典名称" 
                    className="input input-bordered w-full" 
                    value={formData.name || ''} 
                    onChange={handleChange}
                    disabled={submitting}
                    required
                  />
                </div>
              </div>
              
              {/* Dictionary Type */}
              <div className="form-control">
                <div className="flex items-center mb-2">
                  <label className="label w-24 justify-end mr-2 p-0">
                    <span className="label-text font-medium">字典类型</span>
                  </label>
                  <span className="text-error">*</span>
                </div>
                <div className="ml-[6.5rem]">
                  <input 
                    type="text" 
                    name="type" 
                    placeholder="请输入字典类型" 
                    className="input input-bordered w-full" 
                    value={formData.type || ''} 
                    onChange={handleChange}
                    disabled={isEdit || submitting}
                    required
                  />
                  <label className="label p-0 mt-1">
                    <span className="label-text-alt text-base-content/60">字典类型的唯一标识，例如: 'sys_status', 'user_type'</span>
                  </label>
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
            
            {/* Remark */}
            <div className="form-control mt-6">
              <div className="flex items-start mb-2">
                <label className="label w-24 justify-end mr-2 p-0 mt-2">
                  <span className="label-text font-medium">备注</span>
                </label>
              </div>
              <div className="ml-[6.5rem]">
                <textarea 
                  name="remark" 
                  placeholder="请输入备注信息" 
                  className="textarea textarea-bordered w-full h-24" 
                  value={formData.remark || ''} 
                  onChange={handleChange}
                  disabled={submitting}
                ></textarea>
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

export default DictionaryTypeForm; 