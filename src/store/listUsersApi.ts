import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface GetUserListParams {
  dateStart: string;
  dateEnd: string;
}

export const usersApi = createApi({
  reducerPath: 'usersList',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.skilla.ru/mango/',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${process.env.REACT_APP_API_TOKEN}`);
    },
  }),
  endpoints: (builder) => ({
    getUserList: builder.mutation<any, GetUserListParams>({
      query({ dateStart, dateEnd }) {
        return {
          url: `getList?date_start=${dateStart}&date_end=${dateEnd}`,
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
