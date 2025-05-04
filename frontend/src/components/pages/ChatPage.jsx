import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import LocalStorage from '../../services/LocalStorage';

import Chat from '../chat/Chat';

const ChatPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = LocalStorage.getItem('token');
    if (!token) navigate('/login');
  });

  return (
    <Container className='h-100 my-4 overflow-hidden rounded shadow'>
      <Chat />
    </Container>
  );
};

export default ChatPage;
