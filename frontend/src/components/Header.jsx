import { useState, useEffect } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import LocalStorage from '../services/LocalStorage';

import LogOutButton from './LogOutButton';

const Header = () => {
  const [authToken, setAuthToken] = useState('');
  const location = useLocation();

  useEffect(() => {
    const token = LocalStorage.getItem('token');
    setAuthToken(token || '');
  }, [location]);

  return (
    <Navbar bg='white' expand='lg' className='shadow-sm'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          {'Hexlet Chat'}
        </Navbar.Brand>
        {authToken ? <LogOutButton /> : null}
      </Container>
    </Navbar>
  );
};

export default Header;
