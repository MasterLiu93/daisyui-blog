import { useNavigate } from 'react-router-dom';
import DepartmentFormComponent from '../../components/system/DepartmentForm';

const DepartmentForm = () => {
  const navigate = useNavigate();
  
  const handleSuccess = () => {
    navigate('/system/departments');
  };
  
  const handleCancel = () => {
    navigate('/system/departments');
  };
  
  return (
    <DepartmentFormComponent 
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
};

export default DepartmentForm; 