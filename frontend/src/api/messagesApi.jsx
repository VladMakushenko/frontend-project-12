import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import LocalStorage from '../services/LocalStorage'

import socket from '../socket'

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',
    prepareHeaders: (headers) => {
      const token = LocalStorage.getItem('token')

      headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: builder => ({
    getMessages: builder.query({
      query: () => '',
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        await cacheDataLoaded

        socket.on('newMessage', (newMessage) => {
          updateCachedData((draft) => {
            draft.push(newMessage)
          })
        })

        await cacheEntryRemoved
        socket.removeAllListeners()
      },
    }),
    getMessageById: builder.query({
      query: id => id,
    }),
    addMessage: builder.mutation({
      query: message => ({
        method: 'POST',
        body: message,
      }),
    }),
    editMessage: builder.mutation({
      query: ({ id, ...body }) => ({
        url: id,
        method: 'PATCH',
        body,
      }),
    }),
    removeMessage: builder.mutation({
      query: id => ({
        url: id,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useGetMessagesQuery, useGetMessageByIdQuery, useAddMessageMutation, useEditMessageMutation, useRemoveMessageMutation } = messagesApi
