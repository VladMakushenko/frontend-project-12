import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import LocalStorage from '../services/LocalStorage'

const LogOutButton = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const exitHandle = () => {
    LocalStorage.removeItem('token')
    navigate('/login')
  }

  return <Button onClick={exitHandle}>{t('ToLogOut')}</Button>
}

export default LogOutButton
