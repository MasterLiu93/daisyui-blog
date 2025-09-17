import { useParams } from 'react-router-dom';
import MenuFormComponent from '../../components/system/MenuForm';

const MenuForm = () => {
  const { id } = useParams<{ id: string }>();
  const menuId = id ? parseInt(id) : undefined;

  return <MenuFormComponent menuId={menuId} />;
};

export default MenuForm; 