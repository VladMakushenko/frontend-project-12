import { useFormik } from 'formik';
import filter from 'leo-profanity';
import * as Yup from 'yup';

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';

import { setCurrentChannel, setModalType, setModalVisibility } from '../../slices/uiSlice';
import { channelsApi, useAddChannelMutation } from '../../api/channelsApi';

import { toastSuccess, toastError } from '../../toastify';

const ModalAddChannel = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const selectEntities = channelsApi.endpoints.getChannels.select();
  const { data } = useSelector(selectEntities);
  const channelsNames = data.map((channel) => channel.name);

  const [addChannel] = useAddChannelMutation();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channelsNames, 'Должно быть уникальным'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const newChannel = {
        name: filter.clean(values.name),
      };

      handleAddChannel(newChannel);
    },
  });

  const handleAddChannel = async (data) => {
    try {
      const channel = await addChannel(data).unwrap();
      dispatch(setCurrentChannel(channel.id));
      toastSuccess('Канал создан');
      handleClose();
    } catch (e) {
      toastError('Ошибка при попытке создать канал');
      throw e;
    }
  };

  const handleClose = () => {
    dispatch(setModalType(null));
    dispatch(setModalVisibility(false));
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              type='text'
              id='name'
              name='name'
              className='mb-2'
              required
              isInvalid={formik.touched.name && formik.errors.name}
              value={formik.values.name}
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
              ref={inputRef}
            />

            <Form.Label htmlFor='name' className='visually-hidden'>
              Имя канала
            </Form.Label>

            <div className='invalid-feedback'>{formik.errors.name}</div>

            <div className='d-flex justify-content-end'>
              <Button variant='secondary' type='button' className='me-2' disabled={formik.isSubmitting} onClick={handleClose}>
                Отменить
              </Button>
              <Button variant='primary' type='submit' disabled={formik.isSubmitting || !formik.values.name.length} onClick={formik.handleSubmit}>
                Отправить
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default ModalAddChannel;
