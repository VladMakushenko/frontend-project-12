import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { channelsApi } from '../../api/channelsApi';
import { messagesApi } from '../../api/messagesApi';

const MessagesHeader = () => {
  const [channel, setChannel] = useState('');
  const [messagesCount, setMessagesCount] = useState(0);

  const { currentChannelId } = useSelector((state) => state.ui);

  const getChannels = channelsApi.endpoints.getChannels.select();
  const { data: channels } = useSelector(getChannels);

  const getMessages = messagesApi.endpoints.getMessages.select();
  const { data: messages } = useSelector(getMessages);

  const currentChannel = channels?.find((channel) => channel.id == currentChannelId);
  const currentChannelMessages = messages?.filter((message) => message.channelId == currentChannelId);

  useEffect(() => {
    setChannel(currentChannel?.name ?? 'general');
    setMessagesCount(currentChannelMessages?.length || 0);
  }, [channels, messages, currentChannelId]);

  return (
    <div className='bg-light mb-4 p-3 shadow-sm small'>
      <p className='m-0'>
        <b># {channel}</b>
      </p>

      <span className='text-muted'>{messagesCount} сообщений</span>
    </div>
  );
};

export default MessagesHeader;
