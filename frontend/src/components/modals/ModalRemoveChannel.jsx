import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { setCurrentChannel, setModalType, setModalVisibility } from '../../slices/uiSlice';
import { useRemoveChannelMutation } from '../../api/channelsApi';

import { toastSuccess, toastError } from '../../toastify';

const ModalRemoveChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { channelId } = useSelector((state) => state.ui.modal.extra);

  const [removeChannel] = useRemoveChannelMutation();

  const handleRemoveChannel = async () => {
    try {
      await removeChannel(channelId).unwrap();
      dispatch(setCurrentChannel(1));
      toastSuccess(t('toastify.ChannelHasBeenRemoved'));
      handleClose();
    } catch (e) {
      toastError(t('NetworkError'));
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
        <Modal.Title>{t('modals.RemoveChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className='lead'>{t('modals.AreYouSure')}</p>

        <div className='d-flex justify-content-end'>
          <Button variant='secondary' className='me-2' type='button' onClick={handleClose}>
            {t('modals.Cancel')}
          </Button>
          <Button variant='danger' type='submit' onClick={handleRemoveChannel}>
            {t('modals.Remove')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default ModalRemoveChannel;
