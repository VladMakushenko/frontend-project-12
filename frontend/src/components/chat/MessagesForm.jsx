import { useFormik } from 'formik';
import filter from 'leo-profanity';
import * as Yup from 'yup';

import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';

import { useAddMessageMutation } from '../../api/messagesApi';

import { toastError } from '../../toastify';

import LocalStorage from '../../services/LocalStorage';

const MessagesForm = () => {
  const inputRef = useRef();

  const { currentChannelId } = useSelector((state) => state.ui);

  const [addMessage] = useAddMessageMutation();

  const validationSchema = Yup.object().shape({
    body: Yup.string().required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const newMessage = {
        body: filter.clean(values.body),
        channelId: currentChannelId,
        username: LocalStorage.getItem('username'),
      };

      handleAddMessage(newMessage);
    },
  });

  const handleAddMessage = async (data) => {
    try {
      await addMessage(data).unwrap();
      inputRef.current.focus();
      formik.values.body = '';
    } catch (e) {
      toastError('Ошибка при попытке отправить сообщение');
      throw e;
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Form noValidate className='py-1 border rounded-2'>
      <Form.Group className='input-group'>
        <Form.Control
          type='text'
          id='body'
          name='body'
          placeholder='Введите сообщение...'
          className='border-0 p-0 ps-2'
          required
          isInvalid={formik.touched.body && formik.errors.body}
          value={formik.values.body}
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          ref={inputRef}
        />

        <Button type='submit' variant='group-vertical' disabled={formik.isSubmitting || !formik.values.body.length} onClick={formik.handleSubmit}>
          <ArrowRightSquare size={20} />
          <span className='visually-hidden'>Отправить</span>
        </Button>
      </Form.Group>
    </Form>
  );
};

export default MessagesForm;
