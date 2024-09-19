import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getListFromDataProps } from '../interfaces/types';

export const usersApi = createApi({
  reducerPath: 'usersList',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.skilla.ru/mango/',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${process.env.REACT_APP_API_TOKEN}`);
    },
  }),
  endpoints: (builder) => ({
    getUserList: builder.mutation<any, getListFromDataProps>({
      query({ dateStart, dateEnd, in_out, sort_by }) {
        const type = in_out !== undefined ? `&in_out=${in_out}` : ''
        const sort = sort_by ? `&sort_by=${sort_by}` : ''
        return {
          url: `getList?date_start=${dateStart}&date_end=${dateEnd}${type}${sort}`,
          method: 'POST',
        };
      },
      transformResponse: (response: any) => {
        return response.results;
      },
    }),
  }),
});

export const { useGetUserListMutation } = usersApi;
