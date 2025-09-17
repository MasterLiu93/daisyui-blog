import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { menuApi, MenuType, type MenuInfo, type MenuCreateReq, type MenuUpdateReq, type MenuTypeValue } from '../../api/system/menu';
import { useTranslation } from 'react-i18next';

interface MenuFormProps {
  menuId?: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const MenuForm = ({ menuId, onSuccess, onCancel }: MenuFormProps) => {
  const { t } = useTranslation('system');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [parentMenus, setParentMenus] = useState<MenuInfo[]>([]);
  const [formData, setFormData] = useState<MenuCreateReq>({
    name: '',
    parentId: 0,
    path: '',
    component: '',
    perms: '',
    icon: '',
    visible: true,
    status: 0,
    sort: 0,
    type: MenuType.MENU
  });

  // 获取菜单详情
  useEffect(() => {
    const fetchMenuInfo = async () => {
      if (menuId) {
        setLoading(true);
        try {
          const menuInfo = await menuApi.getInfo(menuId);
          setFormData({
            id: menuInfo.id,
            name: menuInfo.name,
            parentId: menuInfo.parentId,
            path: menuInfo.path,
            component: menuInfo.component,
            perms: menuInfo.perms,
            icon: menuInfo.icon,
            visible: menuInfo.visible,
            status: menuInfo.status,
            sort: menuInfo.sort,
            type: menuInfo.type
          } as MenuUpdateReq);
        } catch (error) {
          console.error('Failed to fetch menu info:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMenuInfo();
  }, [menuId]);

  // 获取父菜单列表
  useEffect(() => {
    const fetchParentMenus = async () => {
      setLoading(true);
      try {
        const menuList = await menuApi.getList({});
        // 过滤掉按钮类型的菜单，只保留目录和菜单类型
        const filteredMenus = menuList.filter(menu => 
          menu.type === MenuType.DIRECTORY || menu.type === MenuType.MENU
        );
        // 如果是编辑模式，还需要过滤掉当前菜单及其子菜单
        const result = menuId 
          ? filteredMenus.filter(menu => !isChildOf(menu.id, menuId, menuList))
          : filteredMenus;
        
        setParentMenus(result);
      } catch (error) {
        console.error('Failed to fetch parent menus:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchParentMenus();
  }, [menuId]);

  // 判断是否是子菜单
  const isChildOf = (menuId: number, parentId: number, menuList: MenuInfo[]): boolean => {
    if (menuId === parentId) return true;
    
    const childIds = menuList
      .filter(menu => menu.parentId === parentId)
      .map(menu => menu.id);
    
    return childIds.length > 0 && childIds.some(id => isChildOf(menuId, id, menuList));
  };

  // 处理表单变更
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : (type === 'number' ? Number(value) : value)
    }));
  };

  // 处理复选框变更
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (menuId) {
        // 更新菜单
        await menuApi.updateMenu(formData as MenuUpdateReq);
      } else {
        // 创建菜单
        await menuApi.createMenu(formData);
      }

      // 提交成功后的处理
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/system/menus');
      }
    } catch (error) {
      console.error('Failed to save menu:', error);
    } finally {
      setLoading(false);
    }
  };

  // 处理取消
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate('/system/menus');
    }
  };

  // 获取菜单类型选项
  const getMenuTypeOptions = () => {
    return [
      { value: MenuType.DIRECTORY, label: t('menus.directory') },
      { value: MenuType.MENU, label: t('menus.menu') },
      { value: MenuType.BUTTON, label: t('menus.button') }
    ];
  };

  // 获取状态选项
  const getStatusOptions = () => {
    return [
      { value: 0, label: t('menus.enabled') },
      { value: 1, label: t('menus.disabled') }
    ];
  };

  // 检查是否是按钮类型
  const isButtonType = (type: MenuTypeValue) => type === MenuType.BUTTON;

  // 检查是否是菜单类型
  const isMenuType = (type: MenuTypeValue) => type === MenuType.MENU;

  if (loading) {
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
          <h1 className="text-2xl font-bold">{menuId ? t('menus.editMenu') : t('menus.addMenu')}</h1>
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link to="/system/dashboard" className="text-base-content/70">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {t('layout.home')}
                </Link>
              </li>
              <li>
                <Link to="/system/menus" className="text-base-content/70">{t('menus.title')}</Link>
              </li>
              <li>
                <span className="text-base-content/90 font-medium">{menuId ? t('menus.editMenu') : t('menus.addMenu')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-base-100 rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 菜单类型 */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">{t('menus.menuType')}</span>
                <span className="label-text-alt text-error">*</span>
              </label>
              <select 
                name="type"
                className="select select-bordered w-full"
                value={formData.type}
                onChange={handleChange}
                required
              >
                {getMenuTypeOptions().map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 菜单名称 */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">{t('menus.menuName')}</span>
                <span className="label-text-alt text-error">*</span>
              </label>
              <input 
                type="text"
                name="name"
                className="input input-bordered w-full"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('common.inputPlaceholder')}
                required
              />
            </div>

            {/* 上级菜单 */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">{t('menus.parentMenu')}</span>
              </label>
              <select 
                name="parentId"
                className="select select-bordered w-full"
                value={formData.parentId}
                onChange={handleChange}
              >
                <option value={0}>{t('menus.topMenu')}</option>
                {parentMenus.map(menu => (
                  <option key={menu.id} value={menu.id}>
                    {menu.name}
                  </option>
                ))}
              </select>
              <label className="label">
                <span className="label-text-alt">{t('common.optional')}</span>
              </label>
            </div>

            {/* 排序 */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">{t('menus.sort')}</span>
                <span className="label-text-alt text-error">*</span>
              </label>
              <input 
                type="number"
                name="sort"
                className="input input-bordered w-full"
                value={formData.sort}
                onChange={handleChange}
                placeholder={t('common.inputPlaceholder')}
                required
              />
            </div>

            {/* 路由地址 - 仅目录和菜单类型显示 */}
            {!isButtonType(formData.type) && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">{t('menus.path')}</span>
                  <span className="label-text-alt text-error">*</span>
                </label>
                <input 
                  type="text"
                  name="path"
                  className="input input-bordered w-full"
                  value={formData.path}
                  onChange={handleChange}
                  placeholder={t('common.inputPlaceholder')}
                  required={!isButtonType(formData.type)}
                />
              </div>
            )}

            {/* 组件路径 - 仅菜单类型显示 */}
            {isMenuType(formData.type) && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">{t('menus.component')}</span>
                </label>
                <input 
                  type="text"
                  name="component"
                  className="input input-bordered w-full"
                  value={formData.component || ''}
                  onChange={handleChange}
                  placeholder={t('common.inputPlaceholder')}
                />
              </div>
            )}

            {/* 权限标识 */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">{t('menus.perms')}</span>
              </label>
              <input 
                type="text"
                name="perms"
                className="input input-bordered w-full"
                value={formData.perms || ''}
                onChange={handleChange}
                placeholder={t('common.inputPlaceholder')}
              />
            </div>

            {/* 菜单图标 - 仅目录和菜单类型显示 */}
            {!isButtonType(formData.type) && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">{t('menus.icon')}</span>
                </label>
                <input 
                  type="text"
                  name="icon"
                  className="input input-bordered w-full"
                  value={formData.icon || ''}
                  onChange={handleChange}
                  placeholder={t('common.inputPlaceholder')}
                />
              </div>
            )}

            {/* 菜单状态 */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">{t('menus.status')}</span>
              </label>
              <select 
                name="status"
                className="select select-bordered w-full"
                value={formData.status}
                onChange={handleChange}
              >
                {getStatusOptions().map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 显示状态 */}
            <div className="form-control">
              <label className="label cursor-pointer justify-start">
                <input 
                  type="checkbox"
                  name="visible"
                  className="checkbox checkbox-primary mr-2"
                  checked={formData.visible}
                  onChange={handleCheckboxChange}
                />
                <span className="label-text">{t('menus.visible')}</span>
              </label>
            </div>
          </div>

          {/* 表单操作 */}
          <div className="flex justify-center mt-8 gap-4">
            <button 
              type="submit"
              className="btn btn-primary min-w-[120px]"
              disabled={loading}
            >
              {loading && <span className="loading loading-spinner loading-xs"></span>}
              {t('common.save')}
            </button>
            <button 
              type="button"
              className="btn btn-outline min-w-[120px]"
              onClick={handleCancel}
              disabled={loading}
            >
              {t('common.cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuForm; 