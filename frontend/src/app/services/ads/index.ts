import authorizedApi from '@app/services/authorizedApi';
import baseApi from '@app/services/baseApi';
import { QueryTags } from '@app';
import {
  IAllAdsResponse,
  ICreateAdRequest,
  IMyAd,
} from '@app/services/ads/types.ts';

const adsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAds: builder.query<IAllAdsResponse, void>({
      query: () => ({
        url: `/advertisements/all/`,
      }),
      providesTags: [QueryTags.Ads],
    }),
  }),
});

export const adsAuthApi = authorizedApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdContacts: builder.query<
      { contact_email: string; contact_phone: string },
      number
    >({
      query: (id) => `/advertisement/get_all_advert/${id}/contacts`,
      providesTags: [QueryTags.Ad],
    }),

    getMyAds: builder.query<IMyAd[], void>({
      query: () => '/advertisements/',
      providesTags: [QueryTags.Ads],
    }),

    createAd: builder.mutation<void, ICreateAdRequest>({
      query: (body) => {
        const formData = new FormData();
        formData.append('lost_person_first_name', body.lost_person_first_name);
        formData.append(
          'lost_person_second_name',
          body.lost_person_second_name,
        );

        formData.append('location_data', body.location_data);
        formData.append('description', body.description);
        formData.append('date_lost', body.date_lost.format('YYYY-MM-DD'));
        formData.append('latitude', body.latitude as unknown as string);
        formData.append('longitude', body.longitude as unknown as string);

        if (body.pictures) {
          Array.from(body.pictures).forEach((p) =>
            formData.append('pictures', p),
          );
        }

        return {
          url: '/advertisements/',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: [QueryTags.Ads],
    }),

    deleteMyAd: builder.mutation<void, void>({
      query: () => ({
        url: `/advertisements/`,
        method: 'DELETE',
      }),
      invalidatesTags: [QueryTags.Ads],
    }),
  }),
});

export const { useGetAdsQuery } = adsApi;
export const {
  useGetMyAdsQuery,
  useGetAdContactsQuery,
  useCreateAdMutation,
  useDeleteMyAdMutation,
} = adsAuthApi;
