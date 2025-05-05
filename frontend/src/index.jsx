import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css'

import app from './app'

const init = async () => {
  const mountNode = document.getElementById('chat')
  const root = createRoot(mountNode)

  root.render(await app())
}

init()
