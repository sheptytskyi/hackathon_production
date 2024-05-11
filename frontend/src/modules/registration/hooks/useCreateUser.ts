import { useCreateUserMutation } from '@app/services/users';
import useLoader from '@hooks/useLoader';
import { useSnackbar } from 'notistack';
import { ICreateUserRequest } from '@app/services/users/types.ts';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@router';

const useCreateUser = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [createUser, { isLoading }] = useCreateUserMutation();
  useLoader(isLoading, 'sign-up');

  const handleCreateUser = async (values: ICreateUserRequest) => {
    try {
      await createUser(values).unwrap();
      enqueueSnackbar('Ви успішно зареєструвалися!', { variant: 'success' });
      navigate(Routes.Login);
    } catch (e) {
      enqueueSnackbar(
        'Не вдалось створити користувача. Перевірте введені дані.',
        { variant: 'error' },
      );
    }
  };

  return { handleCreateUser, isLoading };
};

export default useCreateUser;
