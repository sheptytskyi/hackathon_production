import { QueryTags } from '@app/services/tags';
import { API_KEY, API_KEY_HEADER_NAME, BASE_URL } from '@constants/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL + '/api',
  prepareHeaders: (headers) => {
    headers.set(API_KEY_HEADER_NAME, API_KEY);
    return headers;
  },
});

const baseApi = createApi({
  baseQuery,
  reducerPath: 'baseApi',
  endpoints: () => ({}),
  tagTypes: Object.values(QueryTags).map(
    (value) => QueryTags[value as unknown as keyof typeof QueryTags],
  ),
});

export default baseApi;
