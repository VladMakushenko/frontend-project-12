import { Nav } from 'react-bootstrap'

import Channel from './Channel'

import { useGetChannelsQuery } from '../../api/channelsApi'

const ChannelsBox = () => {
  const { data } = useGetChannelsQuery()

  return (
    <Nav as="ul" className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {data?.map(item => (
        <Channel key={item.id} channel={item} />
      ))}
    </Nav>
  )
}

export default ChannelsBox
