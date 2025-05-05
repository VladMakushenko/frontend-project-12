import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';

import { setModalType, setModalVisibility } from '../../slices/uiSlice';

const ChannelsHeader = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleAddChannel = () => {
    dispatch(setModalVisibility(true));
    dispatch(setModalType('addChannel'));
  };

  return (
    <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
      <b>{t('channels.Channels')}</b>

      <Button type='button' variant='group-vertical' className='p-0 text-primary' onClick={handleAddChannel}>
        <PlusSquare size={20} />
        <span className='visually-hidden'>+</span>
      </Button>
    </div>
  );
};

export default ChannelsHeader;
