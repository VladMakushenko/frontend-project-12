import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import LocalStorage from '../services/LocalStorage';

const LogOutButton = () => {
  const navigate = useNavigate();

  const exitHandle = () => {
    LocalStorage.removeItem('token');
    navigate('/login');
  };

  return <Button onClick={exitHandle}>{'Выйти'}</Button>;
};

export default LogOutButton;
