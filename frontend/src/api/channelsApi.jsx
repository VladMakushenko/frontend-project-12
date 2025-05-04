import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import LocalStorage from '../services/LocalStorage';

import socket from '../socket';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/channels',
    prepareHeaders: (headers) => {
      const token = LocalStorage.getItem('token');

      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        await cacheDataLoaded;

        socket.on('newChannel', (newChannel) => {
          updateCachedData((draft) => {
            draft.push(newChannel);
          });
        });

        socket.on('removeChannel', ({ id }) => {
          updateCachedData((draft) => {
            return draft.filter((channel) => channel.id !== id);
          });
        });

        socket.on('renameChannel', ({ id, name }) => {
          updateCachedData((draft) => {
            const channel = draft.find((channel) => channel.id === id);
            if (channel) {
              channel.name = name;
            }
          });
        });

        await cacheEntryRemoved;
        socket.removeAllListeners();
      },
    }),
    getChannelById: builder.query({
      query: (id) => id,
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
      }),
    }),
    editChannel: builder.mutation({
      query: ({ id, ...body }) => ({
        url: id,
        method: 'PATCH',
        body,
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetChannelsQuery, useGetChannelByIdQuery, useAddChannelMutation, useEditChannelMutation, useRemoveChannelMutation } = channelsApi;
