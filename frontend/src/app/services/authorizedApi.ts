import {
  ACCESS_TOKEN_HEADER_NAME,
  API_KEY,
  API_KEY_HEADER_NAME,
  BASE_URL,
} from '@constants/config';
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { loggedOut, setTokens } from '@app/slices/auth';
import { setLoadings } from '@app/slices/ui';
import { Mutex } from 'async-mutex';
import { RootState } from '@app/types';
import { QueryTags } from '@app/services/tags.ts';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL + '/api',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.access;

    if (token) {
      headers.set(ACCESS_TOKEN_HEADER_NAME, `Bearer ${token}`);
    }

    headers.set(API_KEY_HEADER_NAME, API_KEY);

    return headers;
  },
});

const mutex = new Mutex();

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const tokens = (api.getState() as RootState).auth;
        const refreshResult = await baseQuery(
          {
            url: '/users/token/refresh/',
            method: 'POST',
            body: {
              access: tokens?.access,
              refresh: tokens?.refresh,
            },
          },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          const { access, refresh } = refreshResult.data as {
            access: string;
            refresh: string;
          };

          api.dispatch(setTokens({ access, refresh }));

          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(loggedOut());
          api.dispatch(setLoadings([]));
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

const authorizedApi = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'authApi',
  tagTypes: Object.values(QueryTags).map(
    (value) => QueryTags[value as unknown as keyof typeof QueryTags],
  ),
  endpoints: () => ({}),
});

export default authorizedApi;
