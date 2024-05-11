import { useGetProfileQuery } from '@app/services/users';
import useLoader from '@hooks/useLoader.ts';
import { IProfile } from '@app/services/users/types.ts';
import { useAppSelector } from '@hooks/store.ts';
import { selectAccessToken } from '@app/slices/auth.ts';
import { skipToken } from '@reduxjs/toolkit/query';

const useProfile = () => {
  const accessToken = useAppSelector(selectAccessToken);

  const { data, isLoading, isFetching, ...options } = useGetProfileQuery(
    accessToken ? undefined : skipToken,
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true },
  );

  useLoader(isLoading || isFetching, 'get-me');

  const user = {
    ...((data ?? {}) as IProfile),
    isLogged: !!accessToken,
  };

  return [user, { isLoading: isLoading || isFetching, ...options }] as const;
};

export default useProfile;
