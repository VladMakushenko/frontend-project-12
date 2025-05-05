import { Row } from 'react-bootstrap'

import ChatAside from './ChatAside'
import ChatMain from './ChatMain'
import CustomModal from '../modals/Modal'

const Chat = () => {
  return (
    <>
      <Row className="h-100 bg-white flex-md-row">
        <ChatAside />
        <ChatMain />
      </Row>

      <CustomModal />
    </>
  )
}

export default Chat
