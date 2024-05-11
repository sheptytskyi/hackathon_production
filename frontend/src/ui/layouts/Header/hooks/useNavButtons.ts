import useProfile from '@hooks/useProfile.ts';
import { Routes } from '@router';

const guestNavButtons = [{ title: 'Увійти', to: Routes.Login }];
const navButtons = [{ title: 'Мапа оголошень', to: Routes.Home }];

const useNavButtons = () => {
  const [{ isLogged }] = useProfile();

  if (!isLogged) {
    return navButtons.concat(guestNavButtons);
  }

  return navButtons;
};

export default useNavButtons;
