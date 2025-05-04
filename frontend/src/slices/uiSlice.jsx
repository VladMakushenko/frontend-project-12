import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannelId: 1,
  defaultChannelId: 1,
  modal: {
    isOpened: false,
    type: null,
    extra: null,
  },
};

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentChannel(state, { payload }) {
      state.currentChannelId = payload;
    },
    setModalVisibility(state, { payload }) {
      state.modal.isOpened = payload;
    },
    setModalType(state, { payload }) {
      state.modal.type = payload;
    },
    setModalExtraParams(state, { payload }) {
      state.modal.extra = payload;
    },
  },
});

export const { setCurrentChannel, setModalVisibility, setModalType, setModalExtraParams } = slice.actions;
export default slice.reducer;
