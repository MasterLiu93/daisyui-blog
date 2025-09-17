import { useNavigate } from 'react-router-dom';
import RoleFormComponent from '../../components/system/RoleForm';

const RoleForm = () => {
  const navigate = useNavigate();
  
  const handleSuccess = () => {
    navigate('/system/roles');
  };
  
  const handleCancel = () => {
    navigate('/system/roles');
  };
  
  return (
    <RoleFormComponent 
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
};

export default RoleForm; 