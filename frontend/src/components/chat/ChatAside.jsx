import { Col } from 'react-bootstrap';

import ChannelsHeader from './ChannelsHeader';
import ChannelsBox from './ChannelsBox';

const ChatAside = () => {
  return (
    <Col xs={4} md={2} className='border-end px-0 bg-light flex-column h-100 d-flex'>
      <ChannelsHeader />
      <ChannelsBox />
    </Col>
  );
};

export default ChatAside;
