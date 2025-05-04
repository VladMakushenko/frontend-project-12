import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { toastError } from '../../toastify';

import LocalStorage from '../../services/LocalStorage';
import { setAuthData } from '../../slices/authSlice';

const LoginForm = () => {
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setAuthError('');

      try {
        const { data } = await axios.post('/api/v1/login', values);
        LocalStorage.setItem('token', data.token);
        LocalStorage.setItem('username', data.username);
        dispatch(setAuthData(data));
        navigate('/');
      } catch (e) {
        if (e.status === 401) {
          setAuthError('Неверные имя пользователя или пароль');
          return;
        }

        toastError('Ошибка соединения');
        throw e;
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h1 className='text-center mb-4'>{t('Login')}</h1>

      <FloatingLabel className='mb-3'>
        <Form.Control
          type='text'
          name='username'
          id='username'
          placeholder='Ваш ник'
          required
          isInvalid={authError}
          value={formik.values.username}
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          ref={inputRef}
        />
        <Form.Label htmlFor='username'>Ваш ник</Form.Label>
      </FloatingLabel>

      <FloatingLabel className='mb-3'>
        <Form.Control
          type='password'
          name='password'
          id='password'
          placeholder='Пароль'
          required
          isInvalid={authError}
          value={formik.values.password}
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
        />
        <Form.Label htmlFor='password'>Пароль</Form.Label>

        {authError ? <div className='invalid-tooltip'>{authError}</div> : null}
      </FloatingLabel>

      <Button type='submit' variant='outline-primary' className='w-100' disabled={formik.isSubmitting}>
        Войти
      </Button>
    </Form>
  );
};

export default LoginForm;
