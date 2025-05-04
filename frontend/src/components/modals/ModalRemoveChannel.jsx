import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';

import { setCurrentChannel, setModalType, setModalVisibility } from '../../slices/uiSlice';
import { useRemoveChannelMutation } from '../../api/channelsApi';

import { toastSuccess, toastError } from '../../toastify';

const ModalRemoveChannel = () => {
  const dispatch = useDispatch();
  const { channelId } = useSelector((state) => state.ui.modal.extra);

  const [removeChannel] = useRemoveChannelMutation();

  const handleRemoveChannel = async () => {
    try {
      await removeChannel(channelId).unwrap();
      dispatch(setCurrentChannel(1));
      toastSuccess('Канал удалён');
      handleClose();
    } catch (e) {
      toastError('Ошибка при попытке удалить канал');
      throw e;
    }
  };

  const handleClose = () => {
    dispatch(setModalType(null));
    dispatch(setModalVisibility(false));
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className='lead'>Уверены?</p>

        <div className='d-flex justify-content-end'>
          <Button variant='secondary' className='me-2' type='button' onClick={handleClose}>
            Отменить
          </Button>
          <Button variant='danger' type='submit' onClick={handleRemoveChannel}>
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default ModalRemoveChannel;
