import { RouterProvider } from 'react-router-dom';
import { RouterSettings } from '@router';
import { Loader } from '@/ui';
import { useAppSelector } from '@hooks/store.ts';
import { selectLoadingIds } from '@app/slices/ui.ts';

const App = () => {
  const loadingsId = useAppSelector(selectLoadingIds);

  return (
    <>
      <RouterProvider
        router={RouterSettings}
        fallbackElement={<Loader open />}
      />

      <Loader open={Boolean(loadingsId.length)} />
    </>
  );
};

export default App;
