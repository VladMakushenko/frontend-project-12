import { useDispatch, useSelector } from 'react-redux'
import { Button, ButtonGroup, Nav, Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { setCurrentChannel, setModalType, setModalVisibility, setModalExtraParams } from '../../slices/uiSlice'

const Channel = ({ channel }) => {
  const { id, name, removable } = channel

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { currentChannelId } = useSelector(state => state.ui)

  const handleClick = (id) => {
    dispatch(setCurrentChannel(id))
  }

  const handleRemoveChannel = () => {
    dispatch(setModalVisibility(true))
    dispatch(setModalType('removeChannel'))
    dispatch(setModalExtraParams({ channelId: id }))
  }

  const handleRenameChannel = () => {
    dispatch(setModalVisibility(true))
    dispatch(setModalType('renameChannel'))
    dispatch(setModalExtraParams({ channelId: id }))
  }

  const ButtonTemplate = () => {
    return (
      <Button
        variant={id == currentChannelId ? 'secondary' : ''}
        className="w-100 rounded-0 text-start text-truncate"
        onClick={() => handleClick(id)}
      >
        <span className="me-1">#</span>
        <span>{name}</span>
      </Button>
    )
  }

  const DropdownTemplate = () => {
    return (
      <Dropdown as={ButtonGroup} className="d-flex">
        <ButtonTemplate />
        <Dropdown.Toggle variant={id == currentChannelId ? 'secondary' : ''} className="flex-grow-0 dropdown-toggle-split">
          <span className="visually-hidden">{t('channels.ManageChannel')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleRemoveChannel}>{t('channels.RemoveChannel')}</Dropdown.Item>
          <Dropdown.Item onClick={handleRenameChannel}>{t('channels.RenameChannel')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  return (
    <Nav.Item as="li" className="w-100">
      {removable ? <DropdownTemplate /> : <ButtonTemplate />}
    </Nav.Item>
  )
}

export default Channel
