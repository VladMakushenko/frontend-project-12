import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { setModalType, setModalVisibility } from '../../slices/uiSlice';

import ModalAddChannel from './ModalAddChannel';
import ModalRemoveChannel from './ModalRemoveChannel';
import ModalRenameChannel from './ModalRenameChannel';

const CustomModal = () => {
  const { isOpened, type } = useSelector((state) => state.ui.modal);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setModalType(null));
    dispatch(setModalVisibility(false));
  };

  return (
    <Modal show={isOpened} onHide={handleClose} centered>
      {type === 'addChannel' ? <ModalAddChannel /> : null}
      {type === 'removeChannel' ? <ModalRemoveChannel /> : null}
      {type === 'renameChannel' ? <ModalRenameChannel /> : null}
    </Modal>
  );
};

export default CustomModal;
