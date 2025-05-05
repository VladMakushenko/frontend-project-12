import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Form, FloatingLabel } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import { toastError } from '../../toastify'

import LocalStorage from '../../services/LocalStorage'
import { setAuthData } from '../../slices/authSlice'

const SignUpForm = () => {
  const [authError, setAuthError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const inputRef = useRef()
  const { t } = useTranslation()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(t('forms.Required')).min(3, t('forms.MinMaxUsernameLength')).max(20, t('forms.MinMaxUsernameLength')),
    password: Yup.string().required(t('forms.Required')).min(6, t('forms.MinPasswordLength')),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], t('forms.PasswordsMustMatch')),
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async ({ username, password }) => {
      setAuthError('')

      try {
        const { data } = await axios.post('/api/v1/signup', { username, password })
        LocalStorage.setItem('token', data.token)
        LocalStorage.setItem('username', data.username)
        dispatch(setAuthData(data))
        navigate('/')
      }
      catch (e) {
        if (e.status === 409) {
          setAuthError(t('forms.UserAlreadyExists'))
          return
        }

        toastError(t('NetworkError'))
        throw e
      }
    },
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('SignUp')}</h1>

      <FloatingLabel className="mb-3">
        <Form.Control
          type="text"
          name="username"
          id="username"
          placeholder={t('forms.MinMaxUsernameLength')}
          required
          isInvalid={(formik.errors.username && formik.touched.username) || authError}
          value={formik.values.username}
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          ref={inputRef}
        />
        <Form.Label htmlFor="username">{t('forms.Username')}</Form.Label>

        {formik.errors.username ? <div className="invalid-tooltip">{formik.errors.username}</div> : null}
      </FloatingLabel>

      <FloatingLabel className="mb-3">
        <Form.Control
          type="password"
          name="password"
          id="password"
          placeholder={t('forms.MinPasswordLength')}
          required
          isInvalid={(formik.errors.password && formik.touched.password) || authError}
          value={formik.values.password}
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
        />
        <Form.Label htmlFor="password">{t('forms.Password')}</Form.Label>

        {formik.errors.password ? <div className="invalid-tooltip">{formik.errors.password}</div> : null}
      </FloatingLabel>

      <FloatingLabel className="mb-3">
        <Form.Control
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder={t('forms.PasswordsMustMatch')}
          required
          isInvalid={(formik.errors.confirmPassword && formik.touched.confirmPassword) || authError}
          value={formik.values.confirmPassword}
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
        />
        <Form.Label htmlFor="confirmPassword">{t('forms.ConfirmPassword')}</Form.Label>

        {formik.errors.confirmPassword ? <div className="invalid-tooltip">{formik.errors.confirmPassword}</div> : null}
        {authError ? <div className="invalid-tooltip">{authError}</div> : null}
      </FloatingLabel>

      <Button type="submit" variant="outline-primary" className="w-100" disabled={formik.isSubmitting}>
        {t('ToSignUp')}
      </Button>
    </Form>
  )
}

export default SignUpForm
