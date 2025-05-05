import { useState, useEffect } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LocalStorage from '../services/LocalStorage';

import LogOutButton from './LogOutButton';

const Header = () => {
  const [authToken, setAuthToken] = useState('');
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const token = LocalStorage.getItem('token');
    setAuthToken(token || '');
  }, [location]);

  return (
    <Navbar bg='white' expand='lg' className='shadow-sm'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          {t('Logo')}
        </Navbar.Brand>
        {authToken ? <LogOutButton /> : null}
      </Container>
    </Navbar>
  );
};

export default Header;
