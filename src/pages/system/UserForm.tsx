import { useNavigate, useParams } from 'react-router-dom';
import UserFormComponent from '../../components/system/UserForm';

const UserForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const handleSuccess = () => {
    navigate('/system/users');
  };
  
  const handleCancel = () => {
    navigate('/system/users');
  };
  
  return (
    <UserFormComponent 
      userId={id ? parseInt(id) : undefined}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
};

export default UserForm; 