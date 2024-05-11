import { useSignInMutation } from '@app/services/users';
import useLoader from '@hooks/useLoader';
import { FormValues } from '@modules/login/hooks/useLoginForm.ts';
import { useDispatch } from 'react-redux';
import { setTokens } from '@app/slices/auth.ts';
import { useSnackbar } from 'notistack';

const useLogIn = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const [signIn, { isLoading }] = useSignInMutation();
  useLoader(isLoading, 'sign-in');

  const handleLogIn = async (values: FormValues) => {
    try {
      const tokens = await signIn(values).unwrap();
      dispatch(setTokens(tokens));

      enqueueSnackbar('Ви успішно увійшли!', { variant: 'success' });
    } catch (e) {
      enqueueSnackbar('Даного користувача не існує.', { variant: 'error' });
    }
  };

  return { handleLogIn, isLoading };
};

export default useLogIn;
