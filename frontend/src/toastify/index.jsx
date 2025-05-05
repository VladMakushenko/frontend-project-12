import { toast } from 'react-toastify'

const defaultOptions = {
  position: 'top-right',
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
}

export const toastSuccess = body => toast.success(body, defaultOptions)

export const toastError = body => toast.error(body, defaultOptions)
