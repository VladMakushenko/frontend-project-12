import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { channelsApi } from '../../api/channelsApi'
import { messagesApi } from '../../api/messagesApi'

const MessagesHeader = () => {
  const { t } = useTranslation()

  const { currentChannelId } = useSelector(state => state.ui)

  const getChannels = channelsApi.endpoints.getChannels.select()
  const { data: channels } = useSelector(getChannels)

  const getMessages = messagesApi.endpoints.getMessages.select()
  const { data: messages } = useSelector(getMessages)

  const currentChannel = channels?.find(channel => channel.id == currentChannelId)
  const currentChannelMessages = messages?.filter(message => message.channelId == currentChannelId)

  const channel = currentChannel?.name || 'general'
  const messagesCount = currentChannelMessages?.length || 0

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #
          {' '}
          {channel}
        </b>
      </p>

      <span className="text-muted">{t('messages.Messages', { count: messagesCount })}</span>
    </div>
  )
}

export default MessagesHeader
