import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { messagesApi, useGetMessagesQuery } from '../../api/messagesApi'

import Message from './Message'

const MessagesBox = () => {
  const messagesRef = useRef()

  useGetMessagesQuery()

  const { currentChannelId } = useSelector(state => state.ui)

  const selectEntities = messagesApi.endpoints.getMessages.select()
  const { data: messages } = useSelector(selectEntities)

  const currentChannelMessages = messages?.filter(message => message.channelId == currentChannelId)

  useEffect(() => {
    messagesRef.current?.lastElementChild?.scrollIntoView({ behavior: 'auto' })
  }, [currentChannelId])

  return (
    <div ref={messagesRef} className="overflow-auto px-5">
      {currentChannelMessages?.map(item => (
        <Message key={item.id} message={item} />
      ))}
    </div>
  )
}

export default MessagesBox
