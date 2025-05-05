import { Col } from 'react-bootstrap'

import MessagesHeader from './MessagesHeader'
import MessagesBox from './MessagesBox'
import MessagesForm from './MessagesForm'

const ChatMain = () => {
  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesHeader />
        <MessagesBox />
        <div className="mt-auto px-5 py-3">
          <MessagesForm />
        </div>
      </div>
    </Col>
  )
}

export default ChatMain
