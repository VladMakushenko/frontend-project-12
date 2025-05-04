import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import LocalStorage from '../../services/LocalStorage';
import SignUpCard from '../SignUpCard';

const SignUpPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = LocalStorage.getItem('token');
    if (token) navigate('/');
  });

  return (
    <Container fluid className='h-100'>
      <Row className='justify-content-center align-content-center h-100'>
        <Col md={8} xxl={6}>
          <SignUpCard />
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
