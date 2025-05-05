import { Link } from 'react-router-dom'
import { Row, Col, Card, Image } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import SignUpForm from './forms/SignUpForm'
import SignUpImg from '../assets/signup.jpg'

const SignUpCard = () => {
  const { t } = useTranslation()

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Row className="p-2 p-md-5">
          <Col md={6} className="d-flex align-items-center justify-content-center">
            <Image src={SignUpImg} alt={t('SignUp')} roundedCircle />
          </Col>
          <Col md={6} className="mt-3 mt-md-0">
            <SignUpForm />
          </Col>
        </Row>
      </Card.Body>

      <Card.Footer className="p-4">
        <Card.Text className="text-center">
          <span>
            {t('AlreadyRegistered')}
          </span>
          {' '}
          <Link to="/login">{t('ToLogin')}</Link>
        </Card.Text>
      </Card.Footer>
    </Card>
  )
}

export default SignUpCard
