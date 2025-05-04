import { Link } from 'react-router-dom';
import { Row, Col, Card, Image } from 'react-bootstrap';

import LoginForm from './forms/LoginForm';
import LoginImg from '../assets/login.jpg';

const LoginCard = () => {
  return (
    <Card className='shadow-sm'>
      <Card.Body>
        <Row className='p-2 p-md-5'>
          <Col md={6} className='d-flex align-items-center justify-content-center'>
            <Image src={LoginImg} alt='Войти' roundedCircle />
          </Col>
          <Col md={6} className='mt-3 mt-md-0'>
            <LoginForm />
          </Col>
        </Row>
      </Card.Body>

      <Card.Footer className='p-4'>
        <Card.Text className='text-center'>
          <span>Нет аккаунта?&nbsp;</span>
          <Link to='/signup'>Регистрация</Link>
        </Card.Text>
      </Card.Footer>
    </Card>
  );
};

export default LoginCard;
