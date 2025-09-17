import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dictApi } from '../../api/system';
import type { Dict, DictData } from '../../api/system';
import DictionaryTypeForm from '../../components/system/DictionaryTypeForm';
import DictionaryDataForm from '../../components/system/DictionaryDataForm';
import { useTranslation } from 'react-i18next';

const Dictionaries = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'types' | 'data'>('types');
  const [dictTypes, setDictTypes] = useState<Dict[]>([]);
  const [dictData, setDictData] = useState<DictData[]>([]);
  const [selectedDictType, setSelectedDictType] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showTypeForm, setShowTypeForm] = useState(false);
  const [editTypeId, setEditTypeId] = useState<number | undefined>(undefined);
  const [showDataForm, setShowDataForm] = useState(false);
  const [editDataId, setEditDataId] = useState<number | undefined>(undefined);

  // 处理字典类型搜索
  const handleSearch = () => {
    console.log('搜索字典类型:', {
      searchTerm
    });
    // 在实际应用中，这里会调用API进行查询
  };

  // 处理字典类型重置
  const handleReset = () => {
    setSearchTerm('');
  };

  // 处理字典数据搜索
  const handleSearchData = () => {
    console.log('搜索字典数据:', {
      dictType: selectedDictType,
      searchTerm
    });
    // 在实际应用中，这里会调用API进行查询
  };

  // 处理字典数据重置
  const handleResetData = () => {
    setSearchTerm('');
  };

  // Fetch dictionary types
  useEffect(() => {
    const fetchDictTypes = async () => {
      setLoading(true);
      try {
        // In a real app, we would use the actual API
        // const response = await dictApi.getTypeList({
        //   name: searchTerm || undefined,
        // });
        // setDictTypes(response);

        // Mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockDictTypes: Dict[] = [
          { id: 1, name: 'System Status', type: 'sys_status', status: 0, remark: 'System status options', createTime: '2023-01-01 00:00:00' },
          { id: 2, name: 'User Status', type: 'user_status', status: 0, remark: 'User status options', createTime: '2023-01-02 00:00:00' },
          { id: 3, name: 'Gender', type: 'gender', status: 0, remark: 'Gender options', createTime: '2023-01-03 00:00:00' },
          { id: 4, name: 'Permission Type', type: 'perm_type', status: 0, remark: 'Permission type options', createTime: '2023-01-04 00:00:00' },
          { id: 5, name: 'Menu Type', type: 'menu_type', status: 0, remark: 'Menu type options', createTime: '2023-01-05 00:00:00' },
          { id: 6, name: 'Data Scope', type: 'data_scope', status: 0, remark: 'Data scope options', createTime: '2023-01-06 00:00:00' },
        ];
        
        setDictTypes(mockDictTypes);
      } catch (error) {
        console.error('Failed to fetch dictionary types:', error);
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 'types') {
      fetchDictTypes();
    }
  }, [activeTab, searchTerm]);

  // Fetch dictionary data when a type is selected
  useEffect(() => {
    const fetchDictData = async () => {
      if (!selectedDictType) return;
      
      setLoading(true);
      try {
        // In a real app, we would use the actual API
        // const response = await dictApi.getDataList(selectedDictType);
        // setDictData(response);

        // Mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Generate different mock data based on selected type
        let mockData: DictData[] = [];
        
        if (selectedDictType === 'sys_status') {
          mockData = [
            { id: 1, dictType: 'sys_status', sort: 1, label: 'Active', value: '0', status: 0, colorType: 'success', cssClass: '', remark: 'System is active', createTime: '2023-01-01 00:00:00' },
            { id: 2, dictType: 'sys_status', sort: 2, label: 'Inactive', value: '1', status: 0, colorType: 'danger', cssClass: '', remark: 'System is inactive', createTime: '2023-01-01 00:00:00' },
          ];
        } else if (selectedDictType === 'user_status') {
          mockData = [
            { id: 3, dictType: 'user_status', sort: 1, label: 'Active', value: '0', status: 0, colorType: 'success', cssClass: '', remark: 'User is active', createTime: '2023-01-02 00:00:00' },
            { id: 4, dictType: 'user_status', sort: 2, label: 'Inactive', value: '1', status: 0, colorType: 'warning', cssClass: '', remark: 'User is inactive', createTime: '2023-01-02 00:00:00' },
            { id: 5, dictType: 'user_status', sort: 3, label: 'Locked', value: '2', status: 0, colorType: 'danger', cssClass: '', remark: 'User is locked', createTime: '2023-01-02 00:00:00' },
          ];
        } else if (selectedDictType === 'gender') {
          mockData = [
            { id: 6, dictType: 'gender', sort: 1, label: 'Male', value: '1', status: 0, colorType: 'info', cssClass: '', remark: '', createTime: '2023-01-03 00:00:00' },
            { id: 7, dictType: 'gender', sort: 2, label: 'Female', value: '2', status: 0, colorType: 'info', cssClass: '', remark: '', createTime: '2023-01-03 00:00:00' },
            { id: 8, dictType: 'gender', sort: 3, label: 'Other', value: '3', status: 0, colorType: 'info', cssClass: '', remark: '', createTime: '2023-01-03 00:00:00' },
          ];
        } else {
          mockData = [
            { id: 9, dictType: selectedDictType, sort: 1, label: 'Option 1', value: '1', status: 0, colorType: 'info', cssClass: '', remark: '', createTime: '2023-01-04 00:00:00' },
            { id: 10, dictType: selectedDictType, sort: 2, label: 'Option 2', value: '2', status: 0, colorType: 'info', cssClass: '', remark: '', createTime: '2023-01-04 00:00:00' },
          ];
        }
        
        setDictData(mockData);
      } catch (error) {
        console.error('Failed to fetch dictionary data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 'data') {
      fetchDictData();
    }
  }, [activeTab, selectedDictType]);

  // Filter dictionary types based on search term
  const filteredDictTypes = dictTypes.filter(dict => 
    dict.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dict.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get status text
  const getStatusText = (status: number) => {
    return status === 0 ? t('system.dict.status.active') : t('system.dict.status.inactive');
  };

  // Get status badge class
  const getStatusBadgeClass = (status: number) => {
    return status === 0 ? 'badge-success' : 'badge-error';
  };

  // Get color type badge class
  const getColorBadgeClass = (colorType: string) => {
    switch (colorType) {
      case 'success':
        return 'badge-success';
      case 'warning':
        return 'badge-warning';
      case 'danger':
        return 'badge-error';
      case 'info':
        return 'badge-info';
      default:
        return 'badge-ghost';
    }
  };

  // Handle create dictionary type
  const handleCreateDictType = () => {
    setEditTypeId(undefined);
    setShowTypeForm(true);
  };

  // Handle edit dictionary type
  const handleEditDictType = (typeId: number) => {
    setEditTypeId(typeId);
    setShowTypeForm(true);
  };

  // Handle type form success
  const handleTypeFormSuccess = () => {
    setShowTypeForm(false);
    setEditTypeId(undefined);
    // In a real app, we would refresh the dictionary type list here
  };

  // Handle type form cancel
  const handleTypeFormCancel = () => {
    setShowTypeForm(false);
    setEditTypeId(undefined);
  };

  // Handle delete dictionary type
  const handleDeleteDictType = (typeId: number) => {
    if (window.confirm(t('system.dict.messages.confirmDelete'))) {
      // In a real app, we would call the API to delete the dictionary type
      // For now, just filter the dictionary type out of the list
      setDictTypes(dictTypes.filter(dict => dict.id !== typeId));
    }
  };

  // Handle create dictionary data
  const handleCreateDictData = () => {
    setEditDataId(undefined);
    setShowDataForm(true);
  };

  // Handle edit dictionary data
  const handleEditDictData = (dataId: number) => {
    setEditDataId(dataId);
    setShowDataForm(true);
  };

  // Handle data form success
  const handleDataFormSuccess = () => {
    setShowDataForm(false);
    setEditDataId(undefined);
    // In a real app, we would refresh the dictionary data list here
  };

  // Handle data form cancel
  const handleDataFormCancel = () => {
    setShowDataForm(false);
    setEditDataId(undefined);
  };

  // Handle delete dictionary data
  const handleDeleteDictData = (dataId: number) => {
    if (window.confirm(t('system.dict.messages.confirmDeleteData'))) {
      // In a real app, we would call the API to delete the dictionary data
      // For now, just filter the dictionary data out of the list
      setDictData(dictData.filter(data => data.id !== dataId));
    }
  };

  // If type form is showing, render the form
  if (showTypeForm) {
    return (
      <DictionaryTypeForm 
        dictId={editTypeId} 
        onSuccess={handleTypeFormSuccess} 
        onCancel={handleTypeFormCancel} 
      />
    );
  }

  // If data form is showing, render the form
  if (showDataForm && selectedDictType) {
    return (
      <DictionaryDataForm 
        dictType={selectedDictType}
        dataId={editDataId} 
        onSuccess={handleDataFormSuccess} 
        onCancel={handleDataFormCancel} 
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
          <h1 className="text-2xl font-bold">{t('system.dict.title')}</h1>
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
                <span className="text-base-content/90 font-medium">{t('system.dict.title')}</span>
              </li>
            </ul>
          </div>
        </div>
        {activeTab === 'types' ? (
          <Link to="/system/dictionaries/types/create" className="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            {t('system.dict.actions.add')}
          </Link>
        ) : (
          <Link 
            to={selectedDictType ? `/system/dictionaries/data/create?dictType=${selectedDictType}` : "#"}
            className={`btn btn-primary ${!selectedDictType ? 'btn-disabled' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            {t('system.dict.actions.addData')}
          </Link>
        )}
      </div>
      
      <div className="bg-base-100 rounded-lg shadow-md mb-4">
        <div className="tabs tabs-boxed bg-base-200 rounded-t-lg p-2">
          <button 
            className={`tab tab-lg ${activeTab === 'types' ? 'tab-active' : ''}`} 
            onClick={() => setActiveTab('types')}
          >
            {t('system.dict.tabs.types')}
          </button>
          <button 
            className={`tab tab-lg ${activeTab === 'data' ? 'tab-active' : ''}`} 
            onClick={() => setActiveTab('data')}
          >
            {t('system.dict.tabs.data')}
          </button>
        </div>
        
        {/* 表格工具栏 */}
        <div className="p-4 border-b border-base-200">
          <div className="grid grid-cols-1 gap-y-4">
            {/* 检索条件 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeTab === 'types' ? (
                <>
                  <div className="form-control">
                    <label className="label justify-start pb-1">
                      <span className="label-text font-medium w-20">{t('system.dict.columns.name')}</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={t('system.dict.placeholder.nameOrType')}
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
                </>
              ) : (
                <>
                  <div className="form-control">
                    <label className="label justify-start pb-1">
                      <span className="label-text font-medium w-20">{t('system.dict.columns.type')}</span>
                    </label>
                    <select
                      className="select select-bordered w-full"
                      value={selectedDictType}
                      onChange={(e) => setSelectedDictType(e.target.value)}
                    >
                      <option value="">{t('system.dict.placeholder.selectType')}</option>
                      {dictTypes.map(dict => (
                        <option key={dict.id} value={dict.type}>{dict.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-control">
                    <label className="label justify-start pb-1">
                      <span className="label-text font-medium w-20">{t('system.dict.columns.label')}</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={t('system.dict.placeholder.labelOrValue')}
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
                </>
              )}
              
              <div className="form-control">
                <label className="label justify-start pb-1">
                  <span className="label-text font-medium w-20">{t('system.actions.title')}</span>
                </label>
                <div className="flex gap-2">
                  <button 
                    className="btn btn-primary flex-1"
                    onClick={activeTab === 'types' ? handleSearch : handleSearchData}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {t('system.actions.search')}
                  </button>
                  <button 
                    className="btn btn-outline flex-1"
                    onClick={activeTab === 'types' ? handleReset : handleResetData}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {t('system.actions.reset')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 表格内容 */}
        {activeTab === 'types' ? (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr className="bg-base-200">
                  <th>{t('system.dict.columns.name')}</th>
                  <th>{t('system.dict.columns.type')}</th>
                  <th>{t('system.dict.columns.status')}</th>
                  <th>{t('system.dict.columns.remark')}</th>
                  <th>{t('system.dict.columns.createdTime')}</th>
                  <th>{t('system.dict.columns.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {dictTypes.length > 0 ? (
                  dictTypes.map(dict => (
                    <tr key={dict.id}>
                      <td className="font-medium">{dict.name}</td>
                      <td>{dict.type}</td>
                      <td>
                        <div className={`badge badge-sm badge-outline py-2 px-3 font-medium border-2 whitespace-nowrap 
                          ${dict.status === 0 ? 'badge-success text-success' : 'badge-error text-error'}`}>
                          {dict.status === 0 ? t('system.dict.status.active') : t('system.dict.status.inactive')}
                        </div>
                      </td>
                      <td className="max-w-xs truncate">{dict.remark}</td>
                      <td>{dict.createTime}</td>
                      <td>
                        <div className="flex gap-2">
                          <button 
                            className="btn btn-circle btn-sm btn-ghost btn-info tooltip" 
                            data-tip={t('system.dict.actions.viewData')}
                            onClick={() => {
                              setSelectedDictType(dict.type);
                              setActiveTab('data');
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <Link to={`/system/dictionaries/types/${dict.id}/edit`} className="btn btn-circle btn-sm btn-ghost btn-info tooltip" data-tip={t('system.actions.edit')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </Link>
                          <button 
                            className="btn btn-circle btn-sm btn-ghost btn-error tooltip" 
                            data-tip={t('system.actions.delete')}
                            onClick={() => handleDeleteDictType(dict.id)}
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
                    <td colSpan={6} className="text-center py-10">
                      <div className="flex flex-col items-center justify-center text-base-content/70">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-lg font-medium">{t('system.dict.noTypesFound')}</p>
                        <button 
                          className="btn btn-sm btn-outline mt-4"
                          onClick={handleReset}
                        >
                          {t('system.dict.resetFilter')}
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {selectedDictType ? (
              <table className="table table-zebra">
                <thead>
                  <tr className="bg-base-200">
                    <th>{t('system.dict.data.columns.label')}</th>
                    <th>{t('system.dict.data.columns.value')}</th>
                    <th>{t('system.dict.data.columns.sort')}</th>
                    <th>{t('system.dict.data.columns.status')}</th>
                    <th>{t('system.dict.data.columns.colorType')}</th>
                    <th>{t('system.dict.data.columns.remark')}</th>
                    <th>{t('system.dict.data.columns.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {dictData.length > 0 ? (
                    dictData.map(data => (
                      <tr key={data.id}>
                        <td className="font-medium">{data.label}</td>
                        <td>{data.value}</td>
                        <td>{data.sort}</td>
                        <td>
                          <div className={`badge badge-sm badge-outline py-2 px-3 font-medium border-2 whitespace-nowrap 
                            ${data.status === 0 ? 'badge-success text-success' : 'badge-error text-error'}`}>
                            {data.status === 0 ? t('system.dict.status.active') : t('system.dict.status.inactive')}
                          </div>
                        </td>
                        <td>
                          <div className={`badge badge-sm badge-${data.colorType} py-2 px-3`}>
                            {data.colorType}
                          </div>
                        </td>
                        <td className="max-w-xs truncate">{data.remark}</td>
                        <td>
                          <div className="flex gap-2">
                            <Link to={`/system/dictionaries/data/${data.id}/edit?dictType=${data.dictType}`} className="btn btn-circle btn-sm btn-ghost btn-info tooltip" data-tip={t('system.actions.edit')}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </Link>
                            <button 
                              className="btn btn-circle btn-sm btn-ghost btn-error tooltip" 
                              data-tip={t('system.actions.delete')}
                              onClick={() => handleDeleteDictData(data.id)}
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
                          <p className="text-lg font-medium">{t('system.dict.noDataFound')}</p>
                          <button 
                            className="btn btn-sm btn-outline mt-4"
                            onClick={handleResetData}
                          >
                            {t('system.dict.resetFilter')}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-10">
                <div className="flex flex-col items-center justify-center text-base-content/70">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-lg font-medium">{t('system.dict.selectTypeFirst')}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dictionaries; 