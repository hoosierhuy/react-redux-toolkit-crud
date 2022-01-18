import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IContact } from '../models/contact.model'

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['Contact'],
  endpoints: (builder) => ({
    /* These endpoints/reducers will be automatically converted to actions/action-creators when we export them at the end of the file as: useContactsQuery,
    useContactQuery,
    useAddContactMutation,
    useUpdateContactMutation,
    useDeleteContactMutation, */
    contacts: builder.query<IContact[], void>({
      query: () => '/contacts',
      // providesTags is from the fetchBaseQuery module, https://redux-toolkit.js.org/rtk-query/api/createApi#providestags
      providesTags: ['Contact'],
    }),
    contact: builder.query<IContact, string>({
      query: (id) => `/contacts/${id}`,
      providesTags: ['Contact'],
    }),
    addContact: builder.mutation<void, IContact>({
      query: (contact) => ({
        url: '/contacts',
        method: 'POST',
        body: contact,
      }),
      // invalidatesTags is from the fetchBaseQuery module, https://redux-toolkit.js.org/rtk-query/api/createApi#invalidatestags
      invalidatesTags: ['Contact'],
    }),
    updateContact: builder.mutation<void, IContact>({
      query: ({ id, ...rest }) => ({
        url: `/contacts/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Contact'],
    }),
    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
})

export const {
  useContactsQuery,
  useContactQuery,
  useAddContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactsApi
