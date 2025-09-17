import { useNavigate, useParams } from 'react-router-dom';
import DictionaryDataFormComponent from '../../components/system/DictionaryDataForm';

const DictionaryDataForm = () => {
  const navigate = useNavigate();
  const { dictType = 'sys_status' } = useParams<{ dictType: string }>();
  
  const handleSuccess = () => {
    navigate('/system/dictionaries');
  };
  
  const handleCancel = () => {
    navigate('/system/dictionaries');
  };
  
  return (
    <DictionaryDataFormComponent 
      dictType={dictType}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
};

export default DictionaryDataForm; 