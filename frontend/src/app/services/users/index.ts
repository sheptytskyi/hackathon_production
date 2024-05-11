import {
  ICreateUserRequest,
  ILoginRequest,
  ILoginResponse,
  IProfile,
} from '@app/services/users/types';
import baseApi from '@app/services/baseApi';
import { QueryTags } from '@app';
import authorizedApi from '@app/services/authorizedApi.ts';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (body) => ({
        url: '/users/login/',
        method: 'POST',
        body,
      }),

      invalidatesTags: [QueryTags.User],
    }),

    createUser: builder.mutation<void, ICreateUserRequest>({
      query: (body) => ({
        url: '/users/register/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const usersApi = authorizedApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<IProfile, void>({
      query: () => '/users/profile/',
      providesTags: [QueryTags.User],
    }),
  }),
});

export const { useSignInMutation, useCreateUserMutation } = authApi;
export const { useGetProfileQuery } = usersApi;
