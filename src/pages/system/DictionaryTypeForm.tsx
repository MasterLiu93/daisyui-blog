import { useNavigate } from 'react-router-dom';
import DictionaryTypeFormComponent from '../../components/system/DictionaryTypeForm';

const DictionaryTypeForm = () => {
  const navigate = useNavigate();
  
  const handleSuccess = () => {
    navigate('/system/dictionaries');
  };
  
  const handleCancel = () => {
    navigate('/system/dictionaries');
  };
  
  return (
    <DictionaryTypeFormComponent 
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
};

export default DictionaryTypeForm; 