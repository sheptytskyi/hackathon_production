import { FC, useState } from 'react';
import { Section } from '@ui';
import { useDeleteMyAdMutation, useGetMyAdsQuery } from '@app/services/ads';
import useLoader from '@hooks/useLoader.ts';
import { Button, Stack, Typography } from '@mui/material';
import AdCard from '@modules/my-profile/components/AdCard.tsx';
import { useSnackbar } from 'notistack';
import CreateAdModal from '@modules/my-profile/components/CreateAdModal/CreateAdModal.tsx';
import { IMyAd } from '@app/services/ads/types.ts';

const MyAds: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isCreateAdModalOpen, setIsCreateAdModalOpen] = useState(false);

  const { data, isLoading, isFetching } = useGetMyAdsQuery();
  const ads = (data ?? []) as IMyAd[];
  const isLoadingOrFetching = isLoading || isFetching;

  const [deleteAd, deleteState] = useDeleteMyAdMutation();

  useLoader(
    isLoadingOrFetching || deleteState.isLoading,
    'get-my-ads-or-delete-ad',
  );

  const handleDelete = async () => {
    try {
      await deleteAd().unwrap();
      enqueueSnackbar('Оголошення видалено', { variant: 'success' });
    } catch (e) {
      enqueueSnackbar('Помилка видалення оголошення. Спробуйте ще раз', {
        variant: 'error',
      });
    }
  };

  return (
    <>
      <CreateAdModal
        open={isCreateAdModalOpen}
        onClose={() => setIsCreateAdModalOpen(false)}
      />

      <Section title="Мої оголошення">
        {!!ads.length &&
          !isLoadingOrFetching &&
          ads.map((ad) => (
            <AdCard
              key={ad.id}
              title={ad.title}
              description={ad.description}
              onDelete={handleDelete}
            />
          ))}

        <Stack gap={4} maxWidth={300}>
          {!ads.length && <Typography>У вас ще немає оголошень</Typography>}

          <Button variant="filled" onClick={() => setIsCreateAdModalOpen(true)}>
            Створити оголошення
          </Button>
        </Stack>
      </Section>
    </>
  );
};

export default MyAds;
