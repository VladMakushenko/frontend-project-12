import { configureStore } from '@reduxjs/toolkit';

import { channelsApi } from '../api/channelsApi';
import { messagesApi } from '../api/messagesApi';

import ui from './uiSlice';
import auth from './authSlice';

const store = configureStore({
  reducer: {
    ui,
    auth,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(channelsApi.middleware, messagesApi.middleware),
});

export default store;
