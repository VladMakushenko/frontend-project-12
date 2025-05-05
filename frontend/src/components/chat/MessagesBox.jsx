import { useSelector } from 'react-redux'

import { messagesApi, useGetMessagesQuery } from '../../api/messagesApi'

import Message from './Message'

const MessagesBox = () => {
  useGetMessagesQuery()

  const { currentChannelId } = useSelector(state => state.ui)

  const selectEntities = messagesApi.endpoints.getMessages.select()
  const { data: messages } = useSelector(selectEntities)

  const currentChannelMessages = messages?.filter(message => message.channelId == currentChannelId)

  return (
    <div className="overflow-auto px-5">
      {currentChannelMessages?.map(item => (
        <Message key={item.id} message={item} />
      ))}
    </div>
  )
}

export default MessagesBox
