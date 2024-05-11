import { useDispatch } from 'react-redux';
import { loggedOut } from '@app/slices/auth.ts';

const useLogout = () => {
  const dispatch = useDispatch();

  return () => {
    dispatch(loggedOut());
  };
};

export default useLogout;
