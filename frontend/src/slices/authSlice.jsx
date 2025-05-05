import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: '',
  token: '',
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, { payload }) => {
      Object.assign(state, payload)
    },
  },
})

export const { setAuthData } = slice.actions
export default slice.reducer
