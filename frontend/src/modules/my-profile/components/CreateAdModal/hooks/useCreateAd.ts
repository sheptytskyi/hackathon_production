import { useCreateAdMutation } from '@app/services/ads';
import useLoader from '@hooks/useLoader.ts';
import { useSnackbar } from 'notistack';
import { ICreateAdRequest } from '@app/services/ads/types.ts';

const useCreateAd = (onClose: () => void) => {
  const { enqueueSnackbar } = useSnackbar();
  const [create, { isLoading }] = useCreateAdMutation();
  useLoader(isLoading, 'create-ad');

  const handleCreateAd = async (values: ICreateAdRequest) => {
    try {
      await create(values).unwrap();
      onClose();

      enqueueSnackbar('Оголошення успішно створено', { variant: 'success' });
    } catch (e) {
      console.log(e);
      enqueueSnackbar('Помилка створення оголошення. Спробуйте ще раз', {
        variant: 'error',
      });
    }
  };

  return { handleCreateAd, isLoading };
};

export default useCreateAd;
